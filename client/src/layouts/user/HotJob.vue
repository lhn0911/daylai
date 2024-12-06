<template>
  <div class="featured-jobs-container">
    <!-- Header -->
    <div class="header">
      <h2>Việc làm nổi bật</h2>
      <router-link to="/jobList" class="view-all-link">
        Xem tất cả
        <svg
          class="icon"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.83325 14.1667L14.1666 5.83333M14.1666 5.83333H5.83325M14.1666 5.83333V14.1667"
            stroke="#BC2228"
            stroke-width="1.67"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </router-link>
    </div>

    <!-- Filter Buttons -->
    <div class="filter-buttons">
      <button
        class="filter-btn"
        :class="{ active: selectedLocation === '' }"
        @click="selectedLocation = ''"
      >
        Ngẫu nhiên
      </button>
      <button
        v-for="location in uniqueLocations"
        :key="location"
        class="filter-btn"
        :class="{ active: selectedLocation === location }"
        @click="selectedLocation = location"
      >
        {{ location }}
      </button>

      <div class="location-filter">
        <span>Lọc theo:</span>
        <select class="select-filter" v-model="selectedLocation">
          <option value="">Địa điểm</option>
          <option
            v-for="location in uniqueLocations"
            :key="location"
            :value="location"
          >
            {{ location }}
          </option>
        </select>
      </div>
    </div>

    <!-- Job Cards -->
    <div class="job-cards">
      <div
        v-for="job in paginatedJobs"
        :key="job.id"
        class="job-card"
      >
        <div class="job-info">
          <img :src="job.image" alt="Job image" class="job-img" />
          <div class="job-details">
            <a href="#" class="job-title">{{ job.title }}</a>
            <span class="job-level">
              <div
                v-for="(item, index) in job.levels"
                :key="index"
                :class="getLevelClass(item)"
              >
                {{ item }}
              </div>
            </span>
          </div>
        </div>
        <div class="job-meta">
          <span class="job-salary">
            <img src="../../images/money.png" alt="" />{{ job.salary }} triệu</span
          >
          <span class="job-location">
            <img width="21px" height="21px" src="../../images/flag.png" alt="" />{{ job.location }}</span
          >
          <span class="job-type">
            <img src="../../images/briefcase.png" alt="" />{{ job.type }}</span
          >
        </div>
        <div class="job-footer">
          <span class="job-update">Cập nhật <b>{{ job.postedTime }}</b> giờ trước - còn <b>{{job.remainingPositions}}</b> để ứng tuyển</span>
          <button class="favorite-btn">
            <svg class="icon" viewBox="0 0 24 24">
              <path
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="container">
      <div class="icon-container">
        <div
          class="icon"
          :class="{ active: currentPage === index + 1 }"
          v-for="(page, index) in totalPages"
          :key="index"
          @click="currentPage = index + 1"
        >
          {{ index + 1 }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
store.dispatch("fetchJobByLevels");
const hotJobs = computed(() => store.state.job.jobs);

const selectedLocation = ref("");
const currentPage = ref(1); 
const jobsPerPage = ref(2); 
const uniqueLocations = computed(() => {
  const locations = hotJobs.value.map((job) => job.location);
  return [...new Set(locations)];
});

const filteredJobs = computed(() => {
  if (!selectedLocation.value) return hotJobs.value;
  return hotJobs.value.filter((job) => job.location === selectedLocation.value);
});

const totalPages = computed(() => {
  return Math.ceil(filteredJobs.value.length / jobsPerPage.value);
});

const paginatedJobs = computed(() => {
  const startIndex = (currentPage.value - 1) * jobsPerPage.value;
  const endIndex = startIndex + jobsPerPage.value;
  return filteredJobs.value.slice(startIndex, endIndex);
});

const getLevelClass = (level) => {
  switch (level) {
    case "Fresher":
      return "fresher-level";
    case "Junior":
      return "junior-level";
    case "Senior":
      return "senior-level";
    case "Middle":
      return "middle-level";
    default:
      return "";
  }
};
</script>

<style scoped>
.featured-jobs-container {
  max-width: 1500px;
  margin: 2rem auto;
  padding: 1rem;
  padding-top: 5rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.header h2 {
  font-size: 1.5rem;
  font-weight: bold;
}

.view-all-link {
  color: #9e1c3f;
  display: flex;
  align-items: center;
  text-decoration: none;
}

.icon {
  width: 1rem;
  height: 1rem;
  fill: none;
  stroke: currentColor;
}

.filter-buttons {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  align-items: center;
}

.filter-btn {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #ddd;
  cursor: pointer;
}

.filter-btn.active {
  background-color: #9e1c3f;
  color: white;
}

.location-filter {
  margin-left: auto;
  display: flex;
  align-items: center;
}

.select-filter {
  margin-left: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
}

.job-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.job-card {
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #ddd;
  transition: box-shadow 0.3s ease;
}

.job-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.job-info {
  display: flex;
  gap: 1rem;
}

.job-img {
  width: 5rem;
  height: 5rem;
  border-radius: 0.5rem;
  object-fit: cover;
}

.job-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.job-title {
  font-size: 1rem;
  font-weight: bold;
  color: #9e1c3f;
  text-decoration: none;
}

.job-level {
  display: flex;
  gap: 0.5rem; /* Khoảng cách giữa các level */
  flex-wrap: wrap; /* Cho phép các phần tử xuống dòng nếu không đủ chỗ */
}

.job-level div {
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

.fresher-level {
  background-color: #b9e2c6; /* Màu nền xanh lá */
  color: #027a48; /* Màu chữ xanh lá */
}

.junior-level {
  background-color: #d0e7f9; /* Màu nền xanh biển */
  color: #0288d1; /* Màu chữ xanh biển */
}
.middle-level,
.senior-level {
  background-color: #f8d7da; /* Màu nền đỏ nhẹ */
  color: #bc2228; /* Màu chữ đỏ */
}

.job-meta {
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 0.875rem;
  margin-top: 1rem;
}
.job-salary {
  display: flex;
  justify-content: center;
  gap: 8px;
}
.job-location {
  display: flex;
  justify-content: center;
  gap: 8px;
}
.job-type {
  display: flex;
  justify-content: center;
  gap: 8px;
}
.job-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}

.job-update {
  color: #888;
  font-size: 0.75rem;
}

.favorite-btn {
  color: #666;
  background: none;
  border: none;
  cursor: pointer;
}

.pagination {
  display: flex;
  justify-content: end;
  gap: 0.5rem;
  margin-top: 2rem;
}

.page-number {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
}

.page-number.active {
  background-color: #fde8ec;
  color: #9e1c3f;
}

.page-arrow {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
}

.container {
  margin-top: 40px;
  display: flex;
  justify-content: end;
  align-items: end;
}

.icon-container {
  display: flex;
  gap: 16px;
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #f0f0f0;
  color: #333;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.icon.active {
  background-color: rgba(248, 233, 234, 1);
  color: rgba(171, 31, 36, 1);
}

.icon svg {
  width: 16px;
  height: 16px;
}
</style>
