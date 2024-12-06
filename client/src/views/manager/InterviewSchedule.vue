<template>
  <div class="schedule-container">
    <h3>Lịch phỏng vấn</h3>
    <p>Theo dõi lịch phỏng vấn mới nhất của bạn</p>
    <div class="interview-schedule">
      <div
        class="interview-card"
        v-for="interview in filteredInterviews"
        :key="interview.id"
      >
        <div class="flex">
          <img
            :src="getEnterpriseLogo(interview.enterpriseId)"
            alt="Logo Công ty"
            class="logo"
          />
          <div>
            <b class="position">
              {{ getEnterpriseTitle(interview.enterpriseId) }}
            </b>
            <p class="company">
              {{ getEnterpriseName(interview.enterpriseId) }}
            </p>
          </div>
        </div>
        <hr />
        <div class="info">
          <p>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.1662 2.37334V1.33334C11.1662 1.06 10.9395 0.833336 10.6662 0.833336C10.3928 0.833336 10.1662 1.06 10.1662 1.33334V2.33334H5.83284V1.33334C5.83284 1.06 5.60617 0.833336 5.33284 0.833336C5.0595 0.833336 4.83284 1.06 4.83284 1.33334V2.37334C3.03284 2.54 2.1595 3.61334 2.02617 5.20667C2.01284 5.4 2.17284 5.56 2.3595 5.56H13.6395C13.8328 5.56 13.9928 5.39334 13.9728 5.20667C13.8395 3.61334 12.9662 2.54 11.1662 2.37334Z"
                fill="#BC2228"
              />
              <path
                d="M13.3333 6.56H2.66667C2.3 6.56 2 6.86 2 7.22666V11.3333C2 13.3333 3 14.6667 5.33333 14.6667H10.6667C13 14.6667 14 13.3333 14 11.3333V7.22666C14 6.86 13.7 6.56 13.3333 6.56ZM6.14 12.14C6.07333 12.2 6 12.2467 5.92 12.28C5.84 12.3133 5.75333 12.3333 5.66667 12.3333C5.58 12.3333 5.49333 12.3133 5.41333 12.28C5.33333 12.2467 5.26 12.2 5.19333 12.14C5.07333 12.0133 5 11.84 5 11.6667C5 11.4933 5.07333 11.32 5.19333 11.1933C5.26 11.1333 5.33333 11.0867 5.41333 11.0533C5.57333 10.9867 5.76 10.9867 5.92 11.0533C6 11.0867 6.07333 11.1333 6.14 11.1933C6.26 11.32 6.33333 11.4933 6.33333 11.6667C6.33333 11.84 6.26 12.0133 6.14 12.14ZM6.28 9.58666C6.24667 9.66666 6.2 9.74 6.14 9.80666C6.07333 9.86666 6 9.91333 5.92 9.94666C5.84 9.98 5.75333 10 5.66667 10C5.58 10 5.49333 9.98 5.41333 9.94666C5.33333 9.91333 5.26 9.86666 5.19333 9.80666C5.13333 9.74 5.08667 9.66666 5.05333 9.58666C5.02 9.50666 5 9.42 5 9.33333C5 9.24666 5.02 9.16 5.05333 9.08C5.08667 9 5.13333 8.92666 5.19333 8.86C5.26 8.8 5.33333 8.75333 5.41333 8.72C5.57333 8.65333 5.76 8.65333 5.92 8.72C6 8.75333 6.07333 8.8 6.14 8.86C6.2 8.92666 6.24667 9 6.28 9.08C6.31333 9.16 6.33333 9.24666 6.33333 9.33333C6.33333 9.42 6.31333 9.50666 6.28 9.58666ZM8.47333 9.80666C8.40667 9.86666 8.33333 9.91333 8.25333 9.94666C8.17333 9.98 8.08667 10 8 10C7.91333 10 7.82667 9.98 7.74667 9.94666C7.66667 9.91333 7.59333 9.86666 7.52667 9.80666C7.40667 9.68 7.33333 9.50666 7.33333 9.33333C7.33333 9.16 7.40667 8.98666 7.52667 8.86C7.59333 8.8 7.66667 8.75333 7.74667 8.72C7.90667 8.64666 8.09333 8.64666 8.25333 8.72C8.33333 8.75333 8.40667 8.8 8.47333 8.86C8.59333 8.98666 8.66667 9.16 8.66667 9.33333C8.66667 9.50666 8.59333 9.68 8.47333 9.80666Z"
                fill="#BC2228"
              />
            </svg>
            Ngày:
            {{ formatDate(interview.createAt) }}
          </p>
          <p>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.00065 1.33334C4.32732 1.33334 1.33398 4.32667 1.33398 8C1.33398 11.6733 4.32732 14.6667 8.00065 14.6667C11.674 14.6667 14.6673 11.6733 14.6673 8C14.6673 4.32667 11.674 1.33334 8.00065 1.33334ZM10.9007 10.38C10.8073 10.54 10.6407 10.6267 10.4673 10.6267C10.3807 10.6267 10.294 10.6067 10.214 10.5533L8.14732 9.32C7.63398 9.01334 7.25398 8.34 7.25398 7.74667V5.01334C7.25398 4.74 7.48065 4.51334 7.75398 4.51334C8.02732 4.51334 8.25398 4.74 8.25398 5.01334V7.74667C8.25398 7.98667 8.45398 8.34 8.66065 8.46L10.7273 9.69334C10.9673 9.83334 11.0473 10.14 10.9007 10.38Z"
                fill="#BC2228"
              />
            </svg>
            Thời gian:
            {{ formatTime(interview.createAt) }}
          </p>
          <p>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_28_11225)">
                <path
                  d="M13.7467 5.63333C13.0467 2.55333 10.3601 1.16666 8.00006 1.16666C8.00006 1.16666 8.00006 1.16666 7.9934 1.16666C5.64006 1.16666 2.94673 2.54666 2.24673 5.62666C1.46673 9.06666 3.5734 11.98 5.48006 13.8133C6.18673 14.4933 7.0934 14.8333 8.00006 14.8333C8.90673 14.8333 9.8134 14.4933 10.5134 13.8133C12.4201 11.98 14.5267 9.07333 13.7467 5.63333ZM8.00006 8.97333C6.84006 8.97333 5.90006 8.03333 5.90006 6.87333C5.90006 5.71333 6.84006 4.77333 8.00006 4.77333C9.16006 4.77333 10.1001 5.71333 10.1001 6.87333C10.1001 8.03333 9.16006 8.97333 8.00006 8.97333Z"
                  fill="#BC2228"
                />
              </g>
              <defs>
                <clipPath id="clip0_28_11225">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <a :href="interview.meetingLink" target="_blank">{{
              interview.meetingLink
            }}</a>
          </p>
          <p>
            <i class="fas fa-info-circle"></i> Trạng thái:
            <span
              :class="{
                pending: interview.status === 'Pending',
                completed: interview.status === 'Completed',
              }"
            >
              {{ interview.status }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const interviews = computed(() => store.getters.allInterviews);
const userId = JSON.parse(localStorage.getItem("UserLogin")).id;

const filteredInterviews = computed(() => {
  return interviews.value.filter((interview) => interview.userId === userId);
});

const getEnterpriseName = (enterpriseId) => {
  const enterprises = store.getters.allEnterprise;
  if (!enterprises || enterprises.length === 0) {
    return "-";
  }
  const enterprise = enterprises.find((e) => e.id === enterpriseId);
  return enterprise
    ? enterprise.introduction || enterprise.fullName || "-"
    : "-";
};

const getEnterpriseTitle = (enterpriseId) => {
  const enterprises = store.getters.allEnterprise;
  if (!enterprises || enterprises.length === 0) {
    return "-";
  }
  const enterprise = enterprises.find((e) => e.id === enterpriseId);
  return enterprise ? enterprise.position || enterprise.fullName || "-" : "-";
};

const getEnterpriseLogo = (enterpriseId) => {
  const enterprises = store.getters.allEnterprise;
  if (!enterprises || enterprises.length === 0) {
    return "-";
  }
  const enterprise = enterprises.find((e) => e.id === enterpriseId);
  return enterprise ? enterprise.avatarUrl || enterprise.fullName || "-" : "-";
};

const formatDate = (date) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(date).toLocaleDateString("vi-VN", options);
};

const formatTime = (date) => {
  const options = { hour: "2-digit", minute: "2-digit", second: "2-digit" };
  return new Date(date).toLocaleTimeString("vi-VN", options);
};

onMounted(() => {
  store.dispatch("fetchAllInterviews", userId);
  store.dispatch("fetchAllEnterprise");
});
</script>

<style scoped>
.schedule-container {
  text-align: left;
  padding: 20px;
}

.interview-schedule {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.interview-card {
  width: 329px;
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
}

.logo {
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
  object-fit: contain;
}

.company {
  color: #555;
}

.info p {
  display: flex;
  align-items: center;
  margin: 5px 0;
}

.info i {
  color: #ff3d00;
  margin-right: 8px;
}

.pending {
  color: orange;
}

.completed {
  color: green;
}
.info p {
  display: flex;
  align-items: center;
  margin: 5px 0;
}

/* Thêm style mới cho container của địa điểm */
.info p a {
  max-width: 150px; /* hoặc bất kỳ giá trị nào phù hợp */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
