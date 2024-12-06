<template>
  <div class="container">
    <nav
      class="ant-breadcrumb css-ni1kz0"
      style="margin: 0px; user-select: none"
    >
      <ol class="flex gap-1.5">
        <li>
          <span class="ant-breadcrumb-link">
            <span
              class="select-none italic font-bold cursor-pointer flex items-center gap-1 home-link"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-house w-4 h-4"
              >
                <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                <path
                  d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                ></path>
              </svg>
              HOME
            </span>
          </span>
        </li>
        <li class="ant-breadcrumb-separator" aria-hidden="true">/</li>

        <li>
          <span class="ant-breadcrumb-link"
            ><span
              class="select-none italic font-bold cursor-pointer flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-notebook-pen w-4 h-4"
              >
                <path
                  d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"
                ></path>
                <path d="M2 6h4"></path>
                <path d="M2 10h4"></path>
                <path d="M2 14h4"></path>
                <path d="M2 18h4"></path>
                <path
                  d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"
                ></path>
              </svg>
              JOB
            </span>
          </span>
        </li>
      </ol>
    </nav>
    <div class="header">
      <input
        v-model="searchTerm"
        type="text"
        class="search-input"
        placeholder="Search jobs..."
      />
      <select v-model="filterStatus" class="status-select">
        <option value="">Filter by status</option>
        <option
          v-for="status in jobStatusOptions"
          :key="status"
          :value="status"
        >
          {{ status }}
        </option>
      </select>
    </div>

    <table v-if="filteredJobs.length" class="job-table">
      <thead>
        <tr>
          <th>Job Title</th>
          <th>Salary</th>
          <th>Exp</th>
          <th>Job Type</th>
          <th>Enterprise</th>
          <th>Created Date</th>
          <th>Expired Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="job in filteredJobs" :key="job.id">
          <td>{{ job.title }}</td>
          <td>{{ job.salary }} triệu</td>
          <td>{{ job.exp }}</td>
          <td>
            <span
              :class="job.type === 'Toàn thời gian' ? 'type-full' : 'type-part'"
              class="job-type"
            >
              {{ getJobTypeText(job.type) }}
            </span>
            <div v-if="activeDropdown === job.id" class="dropdown-menu">
              <div
                class="dropdown-item"
                @click="updateStatus(job, 'đã xác nhận')"
              >
                Verified
              </div>
              <div
                class="dropdown-item"
                @click="updateStatus(job, 'chờ xác nhận')"
              >
                Pending
              </div>
              <div class="dropdown-item" @click="updateStatus(job, 'block')">
                Blocked
              </div>
            </div>
          </td>
          <td>{{ getEnterpriseName(job.enterpriseId) }}</td>
          <td>{{ job.createAt }}</td>
          <td>{{ job.expiredAt }}</td>
          <td>
            <div class="dropdown">
              <span
                :class="{
                  'status-badge': true,
                  'status-verified': job.status === 'đã xác nhận',
                  'status-pending': job.status === 'chờ xác nhận',
                  'status-blocked': job.status === 'block',
                }"
                @click="toggleStatusDropdown(job.id)"
              >
                {{ getStatusText(job.status) }}
              </span>
              <div v-if="activeDropdown === job.id" class="dropdown-menu">
                <div
                  class="dropdown-item"
                  @click="updateStatus(job, 'đã xác nhận')"
                >
                  Verified
                </div>
                <div
                  class="dropdown-item"
                  @click="updateStatus(job, 'chờ xác nhận')"
                >
                  Pending
                </div>
                <div class="dropdown-item" @click="updateStatus(job, 'block')">
                  Blocked
                </div>
              </div>
            </div>
          </td>
          <td class="actions">
            <button class="btn-view" @click="showJobDetails(job)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-eye w-4 h-4"
              >
                <path
                  d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
                ></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else class="no-data">No jobs found.</p>
    <div v-if="selectedJob" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>Job Details</h2>
          <button class="close-button" @click="closeModal">&times;</button>
        </div>

        <div class="modal-body">
          <div class="detail-row">
            <strong>Job Title:</strong>
            <span>{{ selectedJob.title }}</span>
          </div>

          <div class="detail-row">
            <strong>Salary:</strong>
            <span>{{ selectedJob.salary }} triệu</span>
          </div>

          <div class="detail-row">
            <strong>Experience Required:</strong>
            <span>{{ selectedJob.exp }}</span>
          </div>

          <div class="detail-row">
            <strong>Job Type:</strong>
            <span
              :class="
                selectedJob.type === 'Toàn thời gian'
                  ? 'type-full'
                  : 'type-part'
              "
              class="job-type"
            >
              {{ getJobTypeText(selectedJob.type) }}
            </span>
          </div>

          <div class="detail-row">
            <strong>Enterprise:</strong>
            <span>{{ getEnterpriseName(selectedJob.enterpriseId) }}</span>
          </div>

          <div class="detail-row">
            <strong>Created Date:</strong>
            <span>{{ selectedJob.createAt }}</span>
          </div>

          <div class="detail-row">
            <strong>Expired Date:</strong>
            <span>{{ selectedJob.expiredAt }}</span>
          </div>

          <div class="detail-row">
            <strong>Status:</strong>
            <span
              :class="{
                'status-badge': true,
                'status-verified': selectedJob.status === 'đã xác nhận',
                'status-pending': selectedJob.status === 'chờ xác nhận',
                'status-blocked': selectedJob.status === 'block',
              }"
            >
              {{ getStatusText(selectedJob.status) }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <p>Total {{ totalJobs }} items</p>
      <div class="pagination">
        <button
          class="pagination-btn"
          @click="prevPage"
          :disabled="currentPage === 1"
        >
          ❮
        </button>

        <div class="page-numbers">
          <button
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            :class="['page-number', currentPage === page ? 'active' : '']"
          >
            {{ page }}
          </button>
        </div>

        <button
          class="pagination-btn"
          @click="nextPage"
          :disabled="currentPage === totalPages"
        >
          ❯
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import Swal from "sweetalert2";

const store = useStore();
const searchTerm = ref("");
const filterStatus = ref("");
const currentPage = ref(1);
const itemsPerPage = 5;
const activeDropdown = ref(null);
const selectedJob = ref(null);

const showJobDetails = (job) => {
  selectedJob.value = job;
};

const closeModal = () => {
  selectedJob.value = null;
};
onMounted(() => {
  store.dispatch("fetchAllJobs");
  store.dispatch("fetchAllEnterprise");
});

// Computed property to filter jobs
const filteredJobs = computed(() => {
  let jobs = store.getters.allJobs || [];

  if (searchTerm.value) {
    jobs = jobs.filter((job) =>
      job.title.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  }

  if (filterStatus.value) {
    jobs = jobs.filter((job) => job.status === filterStatus.value);
  }

  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return jobs.slice(start, end);
});

// Get enterprise name from enterprise data
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

const totalPages = computed(() => {
  const totalJobs = store.getters.allJobs?.length || 0;
  return Math.ceil(totalJobs / itemsPerPage);
});

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
const totalJobs = computed(() => store.getters.allJobs?.length || 0);

const goToPage = (page) => {
  currentPage.value = page;
};
// Get unique job status options
const jobStatusOptions = computed(() => {
  const statuses = new Set(store.getters.allJobs.map((job) => job.status));
  return Array.from(statuses);
});
const getStatusText = (status) => {
  switch (status) {
    case "đã xác nhận":
      return "Verified";
    case "chờ xác nhận":
      return "Pending";
    case "block":
      return "Blocked";
    default:
      return "Unknown";
  }
};
const getJobTypeText = (type) => {
  switch (type) {
    case "Toàn thời gian":
      return "Full time";
    case "Bán thời gian":
      return "Part time";
  }
};
const toggleStatusDropdown = (id) => {
  activeDropdown.value = activeDropdown.value === id ? null : id;
};
const updateStatus = (job, newStatus) => {
  if (job.status === newStatus) {
    Swal.fire("Notice", "This job is already in the selected status.", "info");
    return;
  }

  Swal.fire({
    title: "Are you sure?",
    text: `Do you want to change the status to "${getStatusText(newStatus)}"?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, change it!",
  }).then((result) => {
    if (result.isConfirmed) {
      const updatedJob = { ...job, status: newStatus };
      store
        .dispatch("updateJob", updatedJob)
        .then(() => {
          activeDropdown.value = null; // Đóng dropdown
          Swal.fire(
            "Updated!",
            `Job status changed to ${getStatusText(newStatus)}.`,
            "success"
          );
        })
        .catch((error) => {
          Swal.fire(
            "Error!",
            "There was a problem updating the status. Please try again later.",
            "error"
          );
          console.error("Status update failed:", error);
        });
    }
  });
};
</script>

<style scoped>
.container {
  width: 100%;
  padding: 20px;
}

.job-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-bottom: 20px;
}

.job-table th,
.job-table td {
  border: 1px solid #ddd;
  padding: 12px 16px; /* Increased padding */
  text-align: left;
  font-size: 14px;
}

/* Minimum widths for specific columns */
.job-table th:nth-child(1), /* Job Title */
.job-table td:nth-child(1) {
  min-width: 250px;
}

.job-table th:nth-child(2), /* Salary */
.job-table td:nth-child(2) {
  min-width: 120px;
}

.job-table th:nth-child(3), /* Exp */
.job-table td:nth-child(3) {
  min-width: 100px;
}

.job-table th:nth-child(4), /* Job Type */
.job-table td:nth-child(4) {
  min-width: 110px;
}

.job-table th:nth-child(5), /* Enterprise */
.job-table td:nth-child(5) {
  min-width: 200px;
}

.job-table th:nth-child(6), /* Created Date */
.job-table td:nth-child(6),
.job-table th:nth-child(7), /* Expired Date */
.job-table td:nth-child(7) {
  min-width: 120px;
}

.job-table th:nth-child(8), /* Status */
.job-table td:nth-child(8) {
  min-width: 100px;
}

.job-table th {
  background-color: #f5f7fa;
  font-weight: 600;
  color: #2c3e50;
  position: sticky;
  top: 0;
  z-index: 1;
}

.job-table tr:hover {
  background-color: #f8f9fa;
}

/* Add horizontal scrolling for smaller screens */
@media screen and (max-width: 1200px) {
  .container {
    overflow-x: auto;
  }

  .job-table {
    min-width: 1200px;
  }
}

/* Update header spacing */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: 16px;
}

.search-input {
  min-width: 300px;
  padding: 5px;
  margin-top: 30px;
}

.status-select {
  min-width: 150px;
  padding: 5px;
}

.job-type {
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}

.type-full {
  background-color: #cce5ff;
  color: #004085;
}

.type-part {
  background-color: #fff3cd;
  color: #856404;
}

.status-verified {
  background-color: #dcfce7;
  color: #166534;
}

.status-pending {
  background-color: #fef9c3;
  color: #854d0e;
}
.status-blocked {
  background-color: #f9e0de;
  color: #f4584d;
}

.actions {
  text-align: center;
}

.no-data {
  text-align: center;
  color: #888;
  margin: 20px 0;
  font-size: 16px;
}

.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 10;
  background: white;
  border: 1px solid #ddd;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  width: 150px;
}

.dropdown-item {
  padding: 8px 12px;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}
.home-link {
  opacity: 0.6;
  color: #98a2a7;
  transition: opacity 0.3s ease, color 0.3s ease;
}

.home-link:hover {
  opacity: 1;
  color: #ffffff;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
}

.close-button:hover {
  color: #000;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-row strong {
  color: #666;
  min-width: 150px;
}
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.page-numbers {
  display: flex;
  gap: 4px;
}

.pagination-btn,
.page-number {
  min-width: 36px;
  height: 36px;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  color: #4a5568;
}

.pagination-btn:hover:not(:disabled),
.page-number:hover:not(.active) {
  background-color: #f7fafc;
  border-color: #cbd5e0;
}

.pagination-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.page-number.active {
  background-color: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

/* Animation for page changes */
.page-number {
  transition: all 0.2s ease;
}

.page-number.active {
  transform: scale(1.1);
}
</style>
