<template>
  <div>
    <div class="container">
      <!-- Header -->
      <div class="candidates-header">
        <h2 class="title">Tất cả ứng viên</h2>
        <div class="sort">
          <span>Sắp xếp theo:</span>
          <select v-model="sortDirection" class="sort-select">
            <option style="color: red" value="asc">TỪ A-Z</option>
            <option value="desc">TỪ Z-A</option>
          </select>
        </div>
      </div>
      <hr />
      <br />
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
              :alt="candidate.name"
              class="candidate-img"
            />
            <span
              :class="['position-label', getPositionColor(candidate.skills)]"
            >
              {{ candidate.skills }}
            </span>
          </div>
          <!-- Candidate Info -->
          <div @click="handleClick(candidate.id)" class="candidate-info">
            <h3 class="candidate-name">{{ candidate.lastName }}</h3>
            <p class="candidate-age">{{ candidate.age }} tuổi</p>
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
                <ul class="detail-value">
                  <li
                    v-for="cert in getCertificatesByCandidate(candidate.id)"
                    :key="cert.id"
                  >
                    {{ cert.type }} : {{ cert.certificateValue }}
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
    </div>
    <div class="pagination">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="pagination-btn"
      >
        &laquo; Trang trước
      </button>

      <button
        v-for="page in totalPages"
        :key="page"
        @click="goToPage(page)"
        :class="{ active: page === currentPage }"
        class="pagination-btn"
      >
        {{ page }}
      </button>

      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="pagination-btn"
      >
        Trang sau &raquo;
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import {
  getAllUserCertificates,
  getAllCertificateTypes,
} from "../../services/certifycateServices.js";

const router = useRouter();
const store = useStore();

store.dispatch("fetchCandidates");
console.log(1111111, store);

const candidates = computed(() => store.state.candidate.candidates);
const sortDirection = ref("asc");

const sortedCandidates = computed(() => {
  return [...candidates.value].sort((a, b) => {
    return sortDirection.value === "asc"
      ? a.firstName.localeCompare(b.firstName)
      : b.firstName.localeCompare(a.firstName);
  });
});

const getPositionColor = (skills) => {
  const colors = {
    "Project Manager": "green",
    "Full-stack Developer": "blue",
    Tester: "orange",
    "Front-end Developer": "red",
  };
  return colors[skills] || "gray";
};

const handleClick = (id) => {
  console.log("id nguoi day", id);
  router.push({ name: "HomePageDetail", params: { id } });
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
const itemsPerPage = ref(4);
const totalPages = computed(() => {
  return Math.ceil(candidates.value.length / itemsPerPage.value);
});

const paginatedCandidates = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return sortedCandidates.value.slice(startIndex, endIndex);
});

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
</script>

<style scoped>
.candidates-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.candidates-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.sort {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sort-select {
  padding: 6px 12px;
  border: 1px solid #b32024;
  border-radius: 4px;
  color: #b32024;
  background-color: white;
  cursor: pointer;
}
.title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

.sort-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border: 1px solid #b32024;
  border-radius: 4px;
  color: #b32024;
  background: white;
  cursor: pointer;
}

.candidates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.candidate-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  transition: box-shadow 0.3s;
}

.candidate-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.candidate-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.candidate-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.candidate-info {
  padding: 16px;
}

.candidate-name {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 4px 0;
}

.candidate-age {
  color: #666;
  margin: 0 0 8px 0;
}

.candidate-position {
  margin-bottom: 16px;
}

.candidate-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
}

.detail-icon {
  width: 16px;
  height: 16px;
}

.detail-value {
  font-weight: 500;
  color: #333;
}

@media (max-width: 768px) {
  .candidates-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .candidates-grid {
    grid-template-columns: 1fr;
  }
}

.container {
  max-width: 1200px;
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

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
}

.pagination-btn {
  padding: 8px 12px;
  border: 1px solid #b32024;
  background-color: white;
  color: #b32024;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.pagination-btn:hover {
  background-color: #b32024;
  color: white;
}

.pagination-btn:disabled {
  background-color: #f3f4f6;
  color: #9ca3af;
  cursor: not-allowed;
}

.pagination-btn.active {
  background-color: #b32024;
  color: white;
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
</style>
