<template>
  <div class="interview-management-container">
    <h1 class="title-main">Quản lý lịch phỏng vấn</h1>
    <p class="title">Hãy xem và theo dõi để không bỏ lỡ lịch phỏng vấn.</p>
    <br />
    <div class="interview-cards-grid">
      <div
        v-for="(item, index) in filteredInterviewBookings"
        :key="index"
        class="interview-card"
      >
        <div class="card-header">
          <img
            src="../../../images/rikkeijobs.png"
            alt="Company Logo"
            class="company-logo"
          />
          <div>
            <h2>{{ getEnterpriseDetails(item.enterpriseId).position }}</h2>
            <p class="company-name">{{ getEnterpriseDetails(item.enterpriseId).introduction }}</p>
          </div>
        </div>
        <div class="divider"></div>
        <div class="card-body">
          <div class="card-detail">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.9987 1.33334C6.25203 1.33334 4.83203 2.75334 4.83203 4.50001C4.83203 6.21334 6.17203 7.60001 7.9187 7.66001C7.97203 7.65334 8.02536 7.65334 8.06536 7.66001C8.0787 7.66001 8.08536 7.66001 8.0987 7.66001C8.10536 7.66001 8.10536 7.66001 8.11203 7.66001C9.8187 7.60001 11.1587 6.21334 11.1654 4.50001C11.1654 2.75334 9.74536 1.33334 7.9987 1.33334Z"
                fill="#BC2228"
              />
              <path
                d="M11.3886 9.43333C9.52859 8.19333 6.49526 8.19333 4.62193 9.43333C3.77526 9.99999 3.30859 10.7667 3.30859 11.5867C3.30859 12.4067 3.77526 13.1667 4.61526 13.7267C5.54859 14.3533 6.77526 14.6667 8.00193 14.6667C9.22859 14.6667 10.4553 14.3533 11.3886 13.7267C12.2286 13.16 12.6953 12.4 12.6953 11.5733C12.6886 10.7533 12.2286 9.99333 11.3886 9.43333Z"
                fill="#BC2228"
              />
            </svg>

            <strong>Tên ứng viên:&nbsp;&nbsp;</strong> {{ getUserName(item.userId) }}
          </div>
          <p class="card-detail">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.9987 1.33334C6.25203 1.33334 4.83203 2.75334 4.83203 4.50001C4.83203 6.21334 6.17203 7.60001 7.9187 7.66001C7.97203 7.65334 8.02536 7.65334 8.06536 7.66001C8.0787 7.66001 8.08536 7.66001 8.0987 7.66001C8.10536 7.66001 8.10536 7.66001 8.11203 7.66001C9.8187 7.60001 11.1587 6.21334 11.1654 4.50001C11.1654 2.75334 9.74536 1.33334 7.9987 1.33334Z"
                fill="#BC2228"
              />
              <path
                d="M11.3886 9.43333C9.52859 8.19333 6.49526 8.19333 4.62193 9.43333C3.77526 9.99999 3.30859 10.7667 3.30859 11.5867C3.30859 12.4067 3.77526 13.1667 4.61526 13.7267C5.54859 14.3533 6.77526 14.6667 8.00193 14.6667C9.22859 14.6667 10.4553 14.3533 11.3886 13.7267C12.2286 13.16 12.6953 12.4 12.6953 11.5733C12.6886 10.7533 12.2286 9.99333 11.3886 9.43333Z"
                fill="#BC2228"
              />
            </svg>

            <strong>CV:&nbsp;&nbsp;</strong>
            <a href="">{{ getCvUrl(item.userId) }}</a>
          </p>
          <p class="card-detail">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.1681 2.37334V1.33334C11.1681 1.06001 10.9415 0.833344 10.6681 0.833344C10.3948 0.833344 10.1681 1.06001 10.1681 1.33334V2.33334H5.83479V1.33334C5.83479 1.06001 5.60812 0.833344 5.33479 0.833344C5.06146 0.833344 4.83479 1.06001 4.83479 1.33334V2.37334C3.03479 2.54001 2.16145 3.61334 2.02812 5.20668C2.01479 5.40001 2.17479 5.56001 2.36145 5.56001H13.6415C13.8348 5.56001 13.9948 5.39334 13.9748 5.20668C13.8415 3.61334 12.9681 2.54001 11.1681 2.37334Z"
                fill="#BC2228"
              />
              <path
                d="M13.3333 6.56H2.66667C2.3 6.56 2 6.86 2 7.22666V11.3333C2 13.3333 3 14.6667 5.33333 14.6667H10.6667C13 14.6667 14 13.3333 14 11.3333V7.22666C14 6.86 13.7 6.56 13.3333 6.56ZM6.14 12.14C6.07333 12.2 6 12.2467 5.92 12.28C5.84 12.3133 5.75333 12.3333 5.66667 12.3333C5.58 12.3333 5.49333 12.3133 5.41333 12.28C5.33333 12.2467 5.26 12.2 5.19333 12.14C5.07333 12.0133 5 11.84 5 11.6667C5 11.4933 5.07333 11.32 5.19333 11.1933C5.26 11.1333 5.33333 11.0867 5.41333 11.0533C5.57333 10.9867 5.76 10.9867 5.92 11.0533C6 11.0867 6.07333 11.1333 6.14 11.1933C6.26 11.32 6.33333 11.4933 6.33333 11.6667C6.33333 11.84 6.26 12.0133 6.14 12.14ZM6.28 9.58666C6.24667 9.66666 6.2 9.74 6.14 9.80666C6.07333 9.86666 6 9.91333 5.92 9.94666C5.84 9.98 5.75333 10 5.66667 10C5.58 10 5.49333 9.98 5.41333 9.94666C5.33333 9.91333 5.26 9.86666 5.19333 9.80666C5.13333 9.74 5.08667 9.66666 5.05333 9.58666C5.02 9.50666 5 9.42 5 9.33333C5 9.24666 5.02 9.16 5.05333 9.08C5.08667 9 5.13333 8.92666 5.19333 8.86C5.26 8.8 5.33333 8.75333 5.41333 8.72C5.57333 8.65333 5.76 8.65333 5.92 8.72C6 8.75333 6.07333 8.8 6.14 8.86C6.2 8.92666 6.24667 9 6.28 9.08C6.31333 9.16 6.33333 9.24666 6.33333 9.33333C6.33333 9.42 6.31333 9.50666 6.28 9.58666ZM8.47333 9.80666C8.40667 9.86666 8.33333 9.91333 8.25333 9.94666C8.17333 9.98 8.08667 10 8 10C7.91333 10 7.82667 9.98 7.74667 9.94666C7.66667 9.91333 7.59333 9.86666 7.52667 9.80666C7.40667 9.68 7.33333 9.50666 7.33333 9.33333C7.33333 9.16 7.40667 8.98666 7.52667 8.86C7.59333 8.8 7.66667 8.75333 7.74667 8.72C7.90667 8.64666 8.09333 8.64666 8.25333 8.72C8.33333 8.75333 8.40667 8.8 8.47333 8.86C8.59333 8.98666 8.66667 9.16 8.66667 9.33333C8.66667 9.50666 8.59333 9.68 8.47333 9.80666Z"
                fill="#BC2228"
              />
            </svg>
            <strong>Ngày:&nbsp;&nbsp;</strong> {{ item.date }}
          </p>
          <p class="card-detail">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.9987 1.33333C4.32536 1.33333 1.33203 4.32666 1.33203 8C1.33203 11.6733 4.32536 14.6667 7.9987 14.6667C11.672 14.6667 14.6654 11.6733 14.6654 8C14.6654 4.32666 11.672 1.33333 7.9987 1.33333ZM10.8987 10.38C10.8054 10.54 10.6387 10.6267 10.4654 10.6267C10.3787 10.6267 10.292 10.6067 10.212 10.5533L8.14536 9.31999C7.63203 9.01333 7.25203 8.33999 7.25203 7.74666V5.01333C7.25203 4.74 7.4787 4.51333 7.75203 4.51333C8.02536 4.51333 8.25203 4.74 8.25203 5.01333V7.74666C8.25203 7.98666 8.45203 8.33999 8.6587 8.45999L10.7254 9.69333C10.9654 9.83333 11.0454 10.14 10.8987 10.38Z"
                fill="#BC2228"
              />
            </svg>

            <strong>Thời gian:&nbsp;&nbsp;</strong> {{ item.time }}
          </p>
          <p class="card-detail">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.7448 5.63334C13.0448 2.55334 10.3581 1.16667 7.99811 1.16667C7.99811 1.16667 7.99811 1.16667 7.99144 1.16667C5.63811 1.16667 2.94478 2.54667 2.24478 5.62667C1.46478 9.06667 3.57144 11.98 5.47811 13.8133C6.18478 14.4933 7.09144 14.8333 7.99811 14.8333C8.90478 14.8333 9.81144 14.4933 10.5114 13.8133C12.4181 11.98 14.5248 9.07334 13.7448 5.63334ZM7.99811 8.97334C6.83811 8.97334 5.89811 8.03334 5.89811 6.87334C5.89811 5.71334 6.83811 4.77334 7.99811 4.77334C9.15811 4.77334 10.0981 5.71334 10.0981 6.87334C10.0981 8.03334 9.15811 8.97334 7.99811 8.97334Z"
                fill="#BC2228"
              />
            </svg>

            <span>
              <strong>Địa điểm:&nbsp;&nbsp;</strong>
              {{ item.meetingLink }}
            </span>
          </p>
        </div>
        <div class="card-footer">
          <button class="edit-button" @click="openEditInterview(item.id)">
            Chỉnh sửa
          </button>
          <button class="delete-button" @click="deleteInterview(item.id)">
            Xóa
          </button>
        </div>
      </div>
    </div>
    <br />
    <PaginationInterview />
    <EditInterview
      v-if="isEditVisible"
      :initialInterview="currentInterview"
      :isVisible="isEditVisible"
      @close="closeEdit"
      @save="saveInterview"
    />
  </div>
</template>

 
<script setup>
import PaginationInterview from "./PaginationInterview.vue";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import EditInterview from "./EditInterview.vue";
import { ref } from "vue";

const store = useStore();
const isEditVisible = ref(false);
const currentInterview = ref(null);
const currentEnterpriseId = JSON.parse(localStorage.getItem("enterpriseId"))

const interviewBookings = computed(() => store.state.interviewBooking.interviewBookings);
const enterprises = computed(() => store.state.enterprise.enterprises);
const users = computed(() => store.state.user.users);  
const cvs = computed(() => store.state.cv.cvs);  

console.log(store);

const getUserName = (userId) => {
  const user = users.value.find(user => user.id === userId);
  return user ? user.userName : 'Unknown User';
};
const filteredInterviewBookings = computed(() => {
  console.log("filteredInterviewBookings",filteredInterviewBookings);

  
  return interviewBookings.value.filter(item => item.enterpriseId === currentEnterpriseId);
});

const getEnterpriseDetails = (enterpriseId) => {
  const enterprise = enterprises.value.find(ent => ent.id === enterpriseId);
  return enterprise ? { position: enterprise.position, introduction: enterprise.introduction } : { position: 'Unknown Position', introduction: '' };
};

const getCvUrl = (userId) => {
  const cv = cvs.value.find(cv => cv.userId === userId);
  return cv ? cv.pdfUrl : 'Không có CV'; // Trả về đường dẫn CV hoặc thông báo nếu không có
};

const formatDate = (dateTime) => {
  if (!dateTime) return 'Invalid Date'; // Kiểm tra giá trị đầu vào
  const date = new Date(dateTime);
  return isNaN(date) ? 'Invalid Date' : date.toISOString().split('T')[0]; // Kiểm tra xem đối tượng Date có hợp lệ không
};

const formatTime = (dateTime) => {
  if (!dateTime) return 'Invalid Time'; // Kiểm tra giá trị đầu vào
  const date = new Date(dateTime);
  return isNaN(date) ? 'Invalid Time' : date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Kiểm tra tính hợp lệ
};
const closeEdit = () => {
  isEditVisible.value = false;
};

const openEditInterview = (id) => {
  const interview = interviewBookings.value.find(item => item.id === id);
  currentInterview.value = interview;
  isEditVisible.value = true;  
};

onMounted(() => {
  store.dispatch("interviewBooking/fetchAllInterviewBookings");
  store.dispatch("fetchAllCvs");
  store.dispatch("fetchAllEnterprise");
  store.dispatch("fetchAllUsers");
});

const saveInterview = (updatedInterview) => {
  store.dispatch("interviewBooking/updateInterviewBooking", updatedInterview);
  isEditVisible.value = false;
};

const deleteInterview = (id) => {
  store.dispatch("interviewBooking/deleteInterviewBooking", id);
};
</script>

<style scoped>
.interview-management-container {
  padding: 20px;
  max-width: 1200px;
  margin: auto;
  font-family: Arial, sans-serif;
}

.title-main {
  font-weight: 600;
  font-size: 24px;
}
.title {
  color: rgba(103, 103, 103, 1);
}
.card-detail {
  display: flex;
  align-items: center;
  font-size: 14px;
  gap: 04px;
}
.interview-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.interview-card {
  border: 0px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* width: 300px; */
}

.card-header {
  display: flex;
  gap: 20px;
  text-align: center;
}

.company-logo {
  width: 40px;
  height: 40px;
  margin-bottom: 8px;
}

.company-name {
  font-size: 0.9em;
  color: #666;
}

.divider {
  height: 1px;
  background-color: #cfcfcf;
  margin: 20px 0;
}
.card-body p {
  margin: 8px 0;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
}

.edit-button,
.delete-button {
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.edit-button {
  background-color: rgba(171, 31, 36, 1);
  color: #fff;
  width: 162px;
  height: 36px;
}

.delete-button {
  background-color: rgba(244, 244, 244, 1);
  color: black;
  width: 64px;
  height: 36px;
}
</style>
