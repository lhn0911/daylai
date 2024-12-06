<template>
  <div>
    <div class="search-bar-container">
      <div class="search-bar">
        <!-- Tìm kiếm theo tên công việc -->
        <div class="search-input-wrapper">
          <img
            src="../../images/searchRed.png"
            alt="Search"
            class="search-icon"
          />
          <input
            type="text"
            placeholder="Tên công việc"
            v-model="searchPosition"
            class="search-input position-input"
          />
        </div>

        <!-- Dropdown các kỹ năng -->
        <div class="dropdown-wrapper">
          <img
            src="../../images/briefcase2.png"
            alt="Industry"
            class="dropdown-icon"
          />
          <select v-model="selectedIndustry" class="dropdown-select">
            <option value="">Các kỹ năng</option>
            <option v-for="skill in skillOptions" :key="skill" :value="skill">
              {{ skill }}
            </option>
          </select>
          <img
            src="../../images/arrow-down.png"
            alt="Expand"
            class="chevron-icon"
          />
        </div>

        <!-- Dropdown địa điểm -->
        <div class="dropdown-wrapper">
          <img
            src="../../images/location.png"
            alt="Location"
            class="dropdown-icon"
          />
          <select v-model="selectedLocation" class="dropdown-select">
            <option value="">Tất cả địa điểm</option>
            <option
              v-for="location in locationOptions"
              :key="location"
              :value="location"
            >
              {{ location }}
            </option>
          </select>
          <img
            src="../../images/arrow-down.png"
            alt="Expand"
            class="chevron-icon"
          />
        </div>

        <!-- Nút tìm kiếm -->
      </div>
    </div>
    <div class="job-listing-container">
      <!-- Header Section -->
      <div class="header">
        <h1 class="title">Tất cả việc làm</h1>
        <div class="view-controls">
          <span class="sort-label">Sắp xếp theo:</span>
          <select v-model="sortBy" class="sort-select">
            <option value="newest">Mới nhất</option>
            <option value="oldest">Cũ nhất</option>
          </select>
          <div class="view-buttons">
            <button
              class="view-button"
              :class="{ active: viewType === 'list' }"
              @click="viewType = 'list'"
            >
              <img src="../../images/row.png" alt="List view" />
            </button>
            <button
              class="view-button"
              :class="{ active: viewType === 'grid' }"
              @click="viewType = 'grid'"
            >
              <img src="../../images/list.png" alt="Grid view" />
            </button>
          </div>
        </div>
      </div>

      <!-- Job Listings -->
      <div :class="['job-listings', viewType]">
        <div
          v-for="job in paginatedJobs"
          :key="job.id"
          class="job-card"
          @click="getJobDeatil(job.id)"
        >
          <!-- Job Image -->
          <div class="job-image">
            <img :src="job.image" />
            <div v-if="job.tag" class="job-tag">{{ job.tag }}</div>
          </div>

          <!-- Job Content -->
          <div class="job-content">
            <div class="job-header">
              <h2 class="job-title">{{ job.title }}</h2>
              <span class="job-salary">{{ job.salary }} triệu</span>
            </div>
            <div class="job-levels">
              <span
                v-for="level in job.levels"
                :key="level"
                :class="['level-tag', level.toLowerCase()]"
              >
                {{ level }}
              </span>
            </div>
            <!-- Job Meta -->
            <div class="job-meta">
              <div class="meta-item">
                <img src="../../images/clock.png" alt="Time" />
                <span>Cập nhật {{ job.postedTime }} giờ trước</span>
              </div>
              <div class="meta-item">
                <img
                  height="16px"
                  width="16px"
                  src="../../images/flag.png"
                  alt="Location"
                />
                <span>{{ job.location }}</span>
              </div>
              <div class="meta-item">
                <img src="../../images/briefcase.png" alt="Type" />
                <span>{{ job.type }}</span>
              </div>
            </div>

            <div class="job-footer">
              <span class="applicants">
                Còn <b>{{ job.remainingPositions }}</b> ngày để ứng tuyển
              </span>
              <div class="action-buttons">
                <button class="apply-button">Ứng tuyển</button>
                <button class="save-button">
                  <img src="../../images/buttonHeart.png" alt="Save" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Pagination -->
      <div class="pagination">
        <button :disabled="currentPage === 1" @click="currentPage--">
          Trước
        </button>
        <span>Trang {{ currentPage }} / {{ totalPages }}</span>
        <button :disabled="currentPage === totalPages" @click="currentPage++">
          Sau
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const router = useRouter();

const viewType = ref("list");
const sortBy = ref("newest");

const store = useStore();
store.dispatch("fetchAllJobs");

const jobs = computed(() => store.state.job.jobs);
const getJobDeatil = (id) => {
  console.log("id cua viec do");

  router.push({ name: "HomePageDeatail", params: { id } });
};
const jobsPerPage = ref(5);
const currentPage = ref(1);

const totalPages = computed(() =>
  Math.ceil(filteredJobs.value.length / jobsPerPage.value)
);

// Lấy danh sách việc làm cho trang hiện tại
const paginatedJobs = computed(() => {
  // Kết hợp filteredJobs và sortedJobs
  const jobsToPaginate = sortedJobs.value.filter((job) => {
    return filteredJobs.value.some((filteredJob) => filteredJob.id === job.id);
  });

  const startIndex = (currentPage.value - 1) * jobsPerPage.value;
  const endIndex = startIndex + jobsPerPage.value;

  return jobsToPaginate.slice(startIndex, endIndex);
});

const sortedJobs = computed(() => {
  return [...jobs.value].sort((a, b) => {
    if (sortBy.value === "newest") {
      return a.postedTime - b.postedTime;
    } else {
      return b.postedTime - a.postedTime;
    }
  });
});

// Biến lưu trữ các tiêu chí tìm kiếm
const searchPosition = ref("");
const selectedIndustry = ref("");
const selectedLocation = ref("");

// Tính toán danh sách các tùy chọn cho dropdown
const skillOptions = computed(() => {
  const levels = new Set(jobs.value.flatMap((job) => job.levels));
  return Array.from(levels);
});

const locationOptions = computed(() => {
  const locations = new Set(jobs.value.map((job) => job.location));
  return Array.from(locations);
});

const filteredJobs = computed(() => {
  return jobs.value.filter((job) => {
    const matchesPosition =
      !searchPosition.value ||
      (job.title &&
        job.title.toLowerCase().includes(searchPosition.value.toLowerCase()));
    const matchesIndustry =
      !selectedIndustry.value || job.levels.includes(selectedIndustry.value);
    const matchesLocation =
      !selectedLocation.value || job.location === selectedLocation.value;

    return matchesPosition && matchesIndustry && matchesLocation;
  });
});

filteredJobs.value = jobs.value;
</script>

<style scoped>
.job-listing-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.title {
  font-size: 24px;
  font-weight: 600;
}

.view-controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

.sort-select {
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  outline: none;
}

.view-buttons {
  display: flex;
  gap: 8px;
}

.view-button {
  padding: 8px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  background: white;
  cursor: pointer;
}

.view-button.active {
  background: #f3f4f6;
}

/* List View Styles */
.job-listings.list .job-card {
  display: flex;
  gap: 20px;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-bottom: 16px;
  background: white;
}

.job-listings.list .job-image {
  width: 200px;
  position: relative;
}

/* Grid View Styles */
/* Dạng grid */
.job-listings.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 20px;
}

.job-listings.grid .job-card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.job-listings.grid .job-image {
  width: 100%;
  padding-top: 60%;
  position: relative;
}

.job-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
}

.job-tag {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #8b5cf6;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.job-content {
  padding: 16px;
  flex: 1;
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.job-title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
}

.job-card:hover .job-title {
  color: #ab1f24;
}

.job-salary {
  color: #9f1239;
  font-weight: 600;
}

.job-levels {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.level-tag {
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: bold;
}

.level-tag.fresher {
  background: #def7ec;
  color: #03543f;
}
.level-tag.junior {
  background: #e1effe;
  color: #1e429f;
}
.level-tag.middle {
  background: #fee2e2;
  color: #9b1c1c;
}
.level-tag.senior {
  background: #fef3c7;
  color: #92400e;
}

.job-meta {
  display: flex;
  gap: 16px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
}

.job-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.applicants {
  color: #6b7280;
  font-size: 14px;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.apply-button {
  padding: 1px 50px;
  background: #9f1239;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.save-button {
  /* padding: 8px; */
  /* border: 1px solid #e5e7eb; */
  /* font-size: ; */
  border-radius: 4px;
  background: white;
  cursor: pointer;
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 20px;
}

.pagination button {
  padding: 8px 16px;
  border: 1px solid #e5e7eb;
  background: white;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button:disabled {
  background: #f3f4f6;
  color: #9ca3af;
  cursor: not-allowed;
}

.pagination span {
  font-size: 16px;
  font-weight: 500;
}

@media (max-width: 768px) {
  .job-listings.list .job-card {
    flex-direction: column;
  }

  .job-listings.list .job-image {
    width: 100%;
    padding-top: 60%;
  }

  .job-meta {
    flex-direction: column;
    gap: 8px;
  }

  .job-footer {
    flex-direction: column;
    gap: 12px;
  }

  .action-buttons {
    width: 100%;
  }

  .apply-button {
    flex: 1;
  }
}
.search-bar-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: white;
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.search-input-wrapper {
  flex: 2;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
}

.dropdown-wrapper {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
}

.search-icon,
.dropdown-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

.chevron-icon {
  width: 16px;
  height: 16px;
  position: absolute;
  right: 12px;
  pointer-events: none;
}

.search-input,
.dropdown-select {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  color: #374151;
}

.dropdown-select {
  appearance: none;
  padding-right: 24px; /* Space for chevron icon */
  cursor: pointer;
}

.search-button {
  padding: 12px 24px;
  background-color: #9f1239;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;
}

.search-button:hover {
  background-color: #881337;
}

/* Placeholder styles */
::placeholder {
  color: #9ca3af;
}

/* Responsive Design */
@media (max-width: 768px) {
  .search-bar {
    flex-direction: column;
    gap: 8px;
    padding: 12px;
  }

  .search-input-wrapper,
  .dropdown-wrapper {
    width: 100%;
  }

  .search-button {
    width: 100%;
  }
}
</style> 