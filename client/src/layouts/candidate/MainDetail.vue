<template>
  <div class="container">
    <!-- Phần thông tin người dùng -->
    <div v-if="selectedCandidate" class="user-profile">
      <img :src="selectedCandidate.avatar" alt="Avatar" class="avatar" />
      <div class="user-info">
        <h2>{{ selectedCandidate.lastName }}</h2>
        <span class="age">{{ selectedCandidate.age }} tuổi</span>
        <span class="role">{{ selectedCandidate.skills }}</span>
        <div class="details">
          <p><strong>Trình độ:</strong> {{ selectedCandidate.level }}</p>
          <p><strong>Ngoại ngữ:</strong> 
          <ul class="detail-value">
                  <li
                    v-for="cert in getCertificatesByCandidate(selectedCandidate.id)"
                    :key="cert.id"
                  >
                    {{cert.type}} : {{ cert.certificateValue }}
                  </li>
                </ul>
                </p>
        </div>
      </div>
      <button v-if="partnerLogin" class="schedule-btn" @click="openInterviewForm">Hẹn lịch phỏng vấn</button>
    </div>
    <h2>Danh sách CV</h2>
    <div class="cv-list">
      <div v-for="(cv) in cvByUser" :key="cv.id" class="cv-card" 
     :style="{ backgroundImage: `url(${cv.pdfUrl})` }">
  <div class="cv-header">
    <h3>{{ cv.title }}</h3>
  </div>
  <p>Cập nhật lần cuối: {{cv.update_at}}</p>
  <div class="buttons">
    <button class="view-btn" @click="viewCv(cv.pdfUrl)">Xem CV</button>
    <button class="download-btn">Tải xuống</button>
  </div>
</div>
    </div>
    <!-- Form hẹn lịch phỏng vấn (Modal) -->
    <div v-if="isFormVisible" class="popup-form">
      <div class="popup-content">
        <h3>Đặt lịch phỏng vấn</h3>
        <form @submit.prevent="submitInterviewBooking">
          <label for="date">Ngày</label>
          <input type="date" id="date"   :min="minDate" v-model="interviewForm.date"  />

          <label for="time">Thời gian</label>
          <input type="time" id="time" v-model="interviewForm.time"  />

          <label for="enterprise">Chọn công ty</label>
          <select v-model="selectedEnterpriseId" >
            <option v-for="enterprise in filteredEnterprises" :key="enterprise.id" :value="enterprise.id">
              {{ enterprise.introduction }}
            </option>
          </select>

          <label for="job">Chọn công việc</label>
          <select v-model="interviewForm.jobId" >
            <option v-for="job in filteredJobs" :key="job.id" :value="job.id">
              {{ job.title }}
            </option>
          </select>

          <button type="submit">Lưu lịch phỏng vấn</button>
          <button type="button" @click="closeInterviewForm">Hủy</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

const store = useStore();
const route = useRoute();
const idFromUrl = route.params.id;
const partnerLogin = localStorage.getItem("PartnerLogin");
const userLogin =
  JSON.parse(localStorage.getItem("UserLogin")) ||
  JSON.parse(localStorage.getItem("PartnerLogin"));

const isUserLoggedIn = ref(userLogin !== null);
// Xác định vai trò của người dùng
const userRole = userLogin?.role || null;

onMounted(() => {
  store.dispatch("fetchCandidateById", idFromUrl);
  store.dispatch("fetchAllCvs");
  store.dispatch("fetchAllJobsNofilter");
  store.dispatch("fetchAllEnterprise");
});

const selectedCandidate = computed(
  () => store.state.candidate.selectedCandidate
);
const cvByUser = computed(() => {
  if (!selectedCandidate.value) {
    return [];
  }
  return store.state.cv.cvs.filter(
    (cv) => cv.userId === selectedCandidate.value.id
  );
});

const allJobs = computed(() => store.state.job.jobs);
const currentLogin = JSON.parse(localStorage.getItem("PartnerLogin"));

// Filter enterprises based on user login
const filteredEnterprises = computed(() =>
  store.state.enterprise.enterprises.filter(
    (enterprise) => enterprise.userId === currentLogin.id
  )
);
const selectedEnterpriseId = ref(null);
watch(selectedEnterpriseId, (newValue) => {
  interviewForm.value.enterpriseId = newValue;
});
const filteredJobs = computed(() => {
  return allJobs.value.filter(
    (job) => job.enterpriseId === selectedEnterpriseId.value
  );
});

const isFormVisible = ref(false);
const interviewForm = ref({
  date: "",
  time: "",
  jobId: null,
  enterpriseId: null,
  pendingAt: "",
  waitForResultAt: "",
  meetingEndTime: "",
  meetingStartTime: "",
  waitUntilInterviewDayAt: "",
  verifiedStudentAt: "",
  verifiedEnterpriseAt: "",
  cancelReason: null,
  meetingLink: "",
  doneAt: "",
  interviewingAt: "",
  cancelAt: "",
  createAt: "",
  enterpriseId: "",
  status: "scheduled",
});

const openInterviewForm = () => {
  isFormVisible.value = true;
};

const closeInterviewForm = () => {
  isFormVisible.value = false;
};

const submitInterviewBooking = async () => {
  const { date, time, jobId, enterpriseId } = interviewForm.value;

  // const enterpriseId = store.state.user.enterpriseId;
  const userId = selectedCandidate.value.id;

  const interviewData = {
    userId,
    enterpriseId,
    date,
    time,
    jobId,
    status: "scheduled",
    waitForResultAt: "",
    pendingAt: "",
    meetingEndTime: "",
    meetingStartTime: "",
    waitUntilInterviewDayAt: "",
    verifiedStudentAt: "",
    verifiedEnterpriseAt: "",
    cancelReason: null,
    meetingLink: "",
    doneAt: "",
    interviewingAt: "",
    cancelAt: "",
    createAt: new Date().toISOString(),
  };

  try {
    await store.dispatch("interviewBooking/addInterviewBooking", interviewData);
    closeInterviewForm();
  } catch (error) {
    console.error("Error booking interview:", error);
  }
};
import {
  getAllUserCertificates,
  getAllCertificateTypes,
} from "../../services/certifycateServices.js";

const userCertificates = ref([]);
const certificates = ref([]);

const fetchCertificatesData = async () => {
  try {
    userCertificates.value = await getAllUserCertificates();
    certificates.value = await getAllCertificateTypes();
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu chứng chỉ:", error);
  }
};

const combinedCertificates = computed(() => {
  return userCertificates.value.map((userCert) => {
    const cert = certificates.value.find(
      (c) => c.id === userCert.certifycateId
    );
    return {
      ...userCert,
      type: cert?.type || "Không xác định",
    };
  });
});
onMounted(() => {
  fetchCertificatesData();
});
const getCertificatesByCandidate = (candidateId) => {
  return combinedCertificates.value.filter(
    (cert) => cert.userId === candidateId
  );
};

const viewCv = (url) => {
  window.open(url, "_blank");
};
</script>


<style>
.popup-form {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
}

.popup-content h3 {
  margin-bottom: 10px;
}

.popup-content form {
  display: flex;
  flex-direction: column;
}

.popup-content label {
  margin-bottom: 5px;
}

.popup-content input,
.popup-content select {
  margin-bottom: 15px;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.popup-content button {
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
}

.popup-content button[type="button"] {
  background-color: #f44336;
}

.popup-content button:hover {
  background-color: #45a049;
}

.popup-content button[type="button"]:hover {
  background-color: #d32f2f;
}
.container {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
}

/* Phần thông tin người dùng */
.user-profile {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

.user-info {
  flex: 1;
  margin-left: 20px;
}

.age,
.role {
  display: inline-block;
  margin-right: 10px;
  color: #888;
}

.details p {
  margin: 5px 0;
}

.schedule-btn {
  background-color: #d32f2f;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.schedule-btn:hover {
  background-color: #b71c1c;
}

/* Phần danh sách CV */
.cv-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.cv-card {
  background-color: #949191;
  border-radius: 10px;
  padding: 15px;
  color: black;
  display: flex;
  flex-direction: column;
  background-size: cover;
  background-position: center;
  height: 200px;
  position: relative;
}

.cv-header {
  margin-bottom: 70px;
  z-index: 2; /* Đặt text lên trên ảnh nền */
}

.cv-card h3 {
  font-size: 26px;
  z-index: 2;
}

.cv-card p {
  font-size: 14px;
  color: black;
  margin-bottom: 6px;
  z-index: 2;
}

.buttons {
  display: flex;
  justify-content: space-between;
  z-index: 2;
}

.view-btn,
.download-btn {
  background-color: #1976d2;
  color: #fff;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
}

.view-btn:hover {
  background-color: #1565c0;
}

.download-btn:hover {
  background-color: #1565c0;
}
</style>
