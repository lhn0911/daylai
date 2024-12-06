<template>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h2 class="title">Ứng viên nổi bật</h2>
      <router-link to="/candidate" class="view-all">
        Xem tất cả
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </router-link>
    </div>

    <!-- Candidates Grid -->
    <div class="candidates-grid">
      <div
        v-for="candidate in paginatedCandidates"
        :key="candidate.id"
        class="candidate-card"
      >
        <!-- Candidate Image -->
        <div class="candidate-image">
          <img
            :src="candidate.avatar"
            :alt="candidate.lastName"
            class="candidate-img"
          />
          <span :class="['position-label', getPositionColor(candidate.skills)]">
            {{ candidate.skills }}
          </span>
        </div>

        <!-- Candidate Info -->
        <div class="candidate-info">
          <h3 class="candidate-name">{{ candidate.lastName }}</h3>
          <p class="candidate-age">{{ candidate.age }} tuổi</p>
          <br />
          <hr />
          <!-- Level & Language -->
          <div class="candidate-details">
            <div class="candidate-detail">
              <svg
                class="detail-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span class="detail-label">Trình độ:</span>
              <span class="detail-value">{{ candidate.level }}</span>
            </div>

            <div class="candidate-detail">
              <svg
                class="detail-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                />
              </svg>
              <span class="detail-label">Ngoại ngữ:</span>
              <ul class="certificate-list">
                <li
                  v-for="cert in getCertificatesByCandidate(candidate.id)"
                  :key="cert.id"
                >
                  {{ cert.type }}: {{ cert.certificateValue }}
                </li>
              </ul>
            </div>

            <div class="candidate-detail">
              <svg
                class="detail-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  d="M264.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 149.8C37.4 145.8 32 137.3 32 128s5.4-17.9 13.9-21.8L264.5 5.2zM476.9 209.6l53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 277.8C37.4 273.8 32 265.3 32 256s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0l152-70.2zm-152 198.2l152-70.2 53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 405.8C37.4 401.8 32 393.3 32 384s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0z"
                />
              </svg>
              <span class="detail-label">Kinh nghiệm:</span>
              <span class="detail-value"
                >{{ candidate.yearsOfExperience }} năm</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Pagination -->
    <div class="pagination">
      <button
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)"
        class="pagination-button"
      >
        Previous
      </button>
      <button
        v-for="page in totalPages"
        :key="page"
        @click="changePage(page)"
        :class="['pagination-button', { active: page === currentPage }]"
      >
        {{ page }}
      </button>
      <button
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)"
        class="pagination-button"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import {
  getAllUserCertificates,
  getAllCertificateTypes,
} from "../../services/certifycateServices.js";
const store = useStore();
store.dispatch("fetchCandidateByYear");
const candidates = computed(() => store.state.candidate.candidates);

const getPositionColor = (skills) => {
  const colors = {
    "Project Manager": "green",
    "Full-stack Developer": "blue",
    "Tester": "orange",
    "Front-end Developer": "red",
  };
  return colors[skills] || "gray";
};
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
const currentPage = ref(1);
const itemsPerPage = 3; 
const totalPages = computed(() => Math.ceil(candidates.value.length / itemsPerPage));

const paginatedCandidates = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return candidates.value.slice(start, end);
});

// Chuyển trang
const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

</script>

<style scoped>
/* Container */
.container {
  max-width: 1500px;
  margin: 0 auto;
  padding: 16px;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.title {
  font-size: 24px;
  font-weight: bold;
}

.view-all {
  color: #dc2626;
  display: flex;
  align-items: center;
  text-decoration: none;
}

.view-all:hover {
  color: #b91c1c;
}

.icon {
  width: 16px;
  height: 16px;
  margin-left: 8px;
}

/* Candidates Grid */
.candidates-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 640px) {
  .candidates-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 1024px) {
  .candidates-grid {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}

/* Candidate Card */
.candidate-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

.candidate-card:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

/* Candidate Image */
.candidate-image {
  position: relative;
  height: 200px;
  background-color: #f3f4f6;
}

.candidate-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.position-label {
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 8px 12px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 500;
}

.green {
  background-color: #d1fae5;
  color: #10b981;
}

.blue {
  background-color: #bfdbfe;
  color: #3b82f6;
}

.orange {
  background-color: #ffedd5;
  color: #fb923c;
}

.red {
  background-color: #fee2e2;
  color: #f87171;
}

.gray {
  background-color: #f3f4f6;
  color: #6b7280;
}

/* Candidate Info */
.candidate-info {
  padding: 16px;
}

.candidate-name {
  font-size: 18px;
  font-weight: 600;
}

.candidate-age {
  font-size: 14px;
  color: #6b7280;
}

/* Candidate Details */
.candidate-details {
  margin-top: 16px;
}

.candidate-detail {
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-bottom: 8px;
}

.detail-label {
  font-weight: 500;
  color: #374151;
}

.detail-value {
  margin-left: 8px;
  color: #6b7280;
}

.detail-icon {
  width: 20px;
  height: 20px;
  color: #dc2626;
  margin-right: 8px;
}
.certificate-list {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.certificate-list li {
  font-size: 14px;
  color: #6b7280;
}
/* Pagination */
.pagination {
  display: flex;
  justify-content: end;
  align-items: center;
  margin-top: 24px;
  gap: 8px;
}

.pagination-button {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  background-color: #f9fafb;
  color: #374151;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pagination-button:hover:not(:disabled) {
  background-color: #e5e7eb;
}

.pagination-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.pagination-button.active {
  background-color: #dc2626;
  color: white;
  font-weight: bold;
}

</style>
