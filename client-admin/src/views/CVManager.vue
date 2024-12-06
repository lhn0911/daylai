<template>
  <div class="cv-management">
    <!-- Navigation breadcrumb -->
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
          <span class="ant-breadcrumb-link">
            <span
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
                class="lucide lucide-book-minus w-4 h-4"
              >
                <path
                  d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
                ></path>
                <path d="M9 10h6"></path>
              </svg>
              CV
            </span>
          </span>
        </li>
      </ol>
    </nav>

    <!-- Search and filter bar -->
    <div class="search-bar">
      <input
        type="text"
        class="input"
        placeholder="Nhập tên chủ sở hữu hoặc tiêu đề..."
        v-model="searchQuery"
      />
      <select class="input" v-model="statusFilter">
        <option value="">Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <select class="input" v-model="languageFilter">
        <option value="">Language</option>
        <option
          v-for="language in languages"
          :key="language.id"
          :value="language.id"
        >
          {{ language.name }}
        </option>
      </select>
      <button class="button button-red" @click="showUploadModal = true">
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
          class="icon"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8 12h8"></path>
          <path d="M12 8v8"></path>
        </svg>
        Thêm CV
      </button>
    </div>

    <!-- CV Table -->
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Owner CV</th>
          <th>Uploader</th>
          <th>Title</th>
          <th>Language</th>
          <th class="center">PDF</th>
          <th class="center">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cv in paginatedCvs" :key="cv.id">
          <td>{{ cv.id }}</td>
          <td>{{ getUserName(cv.userId) }}</td>
          <td>{{ getUserName(cv.userId) }}</td>
          <td>{{ cv.title }}</td>
          <td>{{ getLanguageName(cv.languageId) }}</td>
          <td class="center">
            <button @click="viewPdf(cv.pdfUrl)" class="icon-button">
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
                class="lucide lucide-eye w-5 h-5"
              >
                <path
                  d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
                />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
          </td>
          <td class="center">
            <span
              :class="
                cv.status === 'active' ? 'status-active' : 'status-inactive'
              "
              @click="handleStatus(cv)"
            >
              {{ cv.status }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="footer">
      <p>Total {{ totalItems }} items</p>
      <div class="pagination">
        <button
          class="pagination-btn"
          @click="prevPage"
          :disabled="currentPage === 1"
        >
          ❮
        </button>
        <div class="page-numbers">
          <!-- Use a real element instead of <template> -->
          <div v-for="pageNum in totalPages" :key="pageNum">
            <!-- First page -->
            <button
              v-if="pageNum === 1"
              @click="goToPage(pageNum)"
              :class="['page-number', currentPage === pageNum ? 'active' : '']"
            >
              {{ pageNum }}
            </button>

            <!-- Ellipsis after first page -->
            <span v-if="pageNum === 2 && currentPage > 3" class="ellipsis">
              ...
            </span>

            <!-- Current and adjacent pages -->
            <button
              v-if="
                pageNum >= currentPage - 1 &&
                pageNum <= currentPage + 1 &&
                pageNum !== 1 &&
                pageNum !== totalPages
              "
              @click="goToPage(pageNum)"
              :class="['page-number', currentPage === pageNum ? 'active' : '']"
            >
              {{ pageNum }}
            </button>

            <!-- Ellipsis before last page -->
            <span
              v-if="pageNum === totalPages - 1 && currentPage < totalPages - 2"
              class="ellipsis"
            >
              ...
            </span>

            <!-- Last page -->
            <button
              v-if="pageNum === totalPages && totalPages !== 1"
              @click="goToPage(pageNum)"
              :class="['page-number', currentPage === pageNum ? 'active' : '']"
            >
              {{ pageNum }}
            </button>
          </div>
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

    <!-- Upload Modal -->
    <div v-if="showUploadModal" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <h3>Create New CV</h3>
          <button class="close-button" @click="closeModal">×</button>
        </div>

        <div class="modal-form">
          <!-- Owner Selection -->
          <div class="form-group">
            <label>Owner*</label>
            <div class="search-input-container">
              <span class="search-icon">
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
                  class="lucide lucide-users w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 transform -translate-y-1/2"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </span>
              <input
                type="text"
                v-model="searchOwnerQuery"
                class="input search-input"
                placeholder="Search by user..."
                @input="searchUsers"
              />
            </div>
            <div v-if="filteredUsers.length > 0" class="user-results">
              <div
                v-for="user in filteredUsers"
                :key="user.id"
                class="user-item"
                @click="selectOwner(user)"
              >
                <div class="user-info">
                  <div class="user-name">{{ user.userName }}</div>
                  <div class="user-email">{{ user.email }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Language Selection -->
          <div class="form-group">
            <label>Language*</label>
            <select v-model="selectedLanguage" class="input">
              <option value="">Select language</option>
              <option v-for="lang in languages" :key="lang.id" :value="lang.id">
                {{ lang.name }}
              </option>
            </select>
          </div>

          <!-- CV Title -->
          <div class="form-group">
            <label>CV Title*</label>
            <input
              type="text"
              v-model="cvTitle"
              class="input"
              placeholder="Enter CV title"
            />
          </div>

          <!-- File Upload -->
          <div class="form-group">
            <label>PDF File*</label>
            <button class="upload-button" @click="$refs.fileInput.click()">
              <span>Upload PDF</span>
            </button>
            <input
              type="file"
              ref="fileInput"
              @change="handleFileChange"
              accept=".pdf"
              style="display: none"
            />
            <div v-if="selectedFile" class="selected-file">
              {{ selectedFile.name }}
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="button button-cancel" @click="closeModal">
            Cancel
          </button>
          <button class="button button-create" @click="uploadCv">Create</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../firebase/config";
import Swal from "sweetalert2";

// Vuex store
const store = useStore();

// State
const showUploadModal = ref(false);
const selectedFile = ref(null);
const cvTitle = ref("");
const selectedLanguage = ref("");
const searchQuery = ref("");
const statusFilter = ref("");
const languageFilter = ref("");
const searchOwnerQuery = ref("");
const selectedOwner = ref(null);
const filteredUsers = ref([]);
const users = ref({});
const currentPage = ref(1);
const itemsPerPage = ref(5);

// Computed properties
const languages = computed(() => store.getters.allLanguages);
const cvs = computed(() => store.getters.allCvs);
const adminLogin = JSON.parse(localStorage.getItem("adminLogin"));
const adminId = adminLogin ? adminLogin.id : null;

// Fetch initial data
onMounted(async () => {
  try {
    await Promise.all([
      fetchAllUsers(),
      store.dispatch("fetchAllCvs"),
      store.dispatch("fetchAllLanguages"),
    ]);
  } catch (error) {
    console.error("Error loading data:", error);
    showError("Unable to load data. Please try again.");
  }
});

// User management
const fetchAllUsers = async () => {
  try {
    await store.dispatch("fetchAllUsers");
    const allUsers = store.getters.allUsers;
    if (allUsers?.length) {
      users.value = allUsers.reduce((acc, user) => {
        acc[user.id] = user.userName;
        return acc;
      }, {});
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

const getUserName = (id) => users.value[id] || "N/A";

const searchUsers = () => {
  const query = searchOwnerQuery.value.toLowerCase();
  const allUsers = store.getters.allUsers;
  filteredUsers.value = allUsers.filter(
    (user) =>
      user.userName.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query)
  );
};

const selectOwner = (user) => {
  selectedOwner.value = user;
  searchOwnerQuery.value = user.userName;
  filteredUsers.value = [];
};

// CV management
const getLanguageName = (id) => {
  const language = languages.value.find((lang) => lang.id === id);
  return language?.name || "Unknown";
};

const viewPdf = (url) => window.open(url, "_blank");

const handleFileChange = (event) => {
  selectedFile.value = event.target.files[0];
};

const uploadCv = async () => {
  if (
    !selectedFile.value ||
    !selectedLanguage.value ||
    !cvTitle.value ||
    !selectedOwner.value
  ) {
    showError("Please fill in all required fields and select a file.");
    return;
  }

  if (!adminId) {
    showError("Admin login information not found.");
    return;
  }

  const filePath = `cvs/${Date.now()}_${selectedFile.value.name}`;
  const fileRef = storageRef(storage, filePath);

  try {
    const uploadResult = await uploadBytes(fileRef, selectedFile.value);
    const pdfUrl = await getDownloadURL(uploadResult.ref);

    const newCv = {
      title: cvTitle.value,
      pdfUrl,
      languageId: selectedLanguage.value,
      status: "active",
      userId: selectedOwner.value.id,
      enterpriseId: adminId,
      createdAt: new Date().toISOString(),
    };

    await store.dispatch("createCv", newCv);

    Swal.fire({
      icon: "success",
      title: "Success",
      text: "CV uploaded successfully",
    });

    closeModal();
  } catch (error) {
    console.error("Error uploading CV:", error);
    showError("Failed to upload CV. Please try again.");
  }
};

const closeModal = () => {
  showUploadModal.value = false;
  selectedFile.value = null;
  cvTitle.value = "";
  selectedLanguage.value = "";
  selectedOwner.value = null;
  searchOwnerQuery.value = "";
  filteredUsers.value = [];
};

// CV filtering and status
const filteredCvs = computed(() =>
  (cvs.value || []).filter((cv) => {
    if (!cv?.id) return false;

    const matchesQuery =
      !searchQuery.value ||
      cv.title.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesStatus =
      !statusFilter.value || cv.status === statusFilter.value;
    const matchesLanguage =
      !languageFilter.value || cv.languageId === languageFilter.value;

    return matchesQuery && matchesStatus && matchesLanguage;
  })
);

const handleStatus = async (cv) => {
  try {
    const result = await Swal.fire({
      title: "Confirm Status Change",
      text: `Are you sure you want to change the status of "${cv.title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      const updatedStatus = cv.status === "active" ? "inactive" : "active";
      await store.dispatch("updateCv", {
        id: cv.id,
        status: updatedStatus,
      });
      await store.dispatch("fetchAllCvs");

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "CV status updated successfully.",
      });
    }
  } catch (error) {
    console.error("Error updating CV status:", error);
    showError("Failed to update CV status. Please try again.");
  }
};

// Pagination
const totalItems = computed(() => filteredCvs.value.length);
const totalPages = computed(() =>
  Math.max(1, Math.ceil(totalItems.value / itemsPerPage.value))
);
const paginatedCvs = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return filteredCvs.value.slice(startIndex, endIndex);
});

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

// Error handling
const showError = (message) => {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: message,
  });
};
</script>

<style scoped>
.cv-management {
  padding: 20px;
}
.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
}
.search-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  margin-top: 30px;
}
.input {
  padding: 8px 12px;
  width: 30%;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}
.button {
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 120px;
  height: 40px;
}
.button:hover {
  background-color: #0056b3;
}
.button-red {
  background-color: #dc3545;
  display: flex;
  align-items: center;
  gap: 5px;
}
.table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
}
th {
  background-color: #f0f0f0;
}
tr:hover {
  background-color: #f9f9f9;
}
.center {
  text-align: center;
}
.select {
  width: 100%;
  padding: 4px;
}
.icon-button {
  background: none;
  border: none;
  cursor: pointer;
}
.icon {
  width: 16px;
  height: 16px;
}
.status-active {
  background-color: #d4edda;
  color: #155724;
  padding: 4px 8px;
  border-radius: 4px;
}
.status-inactive {
  background-color: #f8d7da;
  color: #721c24;
  padding: 4px 8px;
  border-radius: 4px;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-container {
  background-color: white;
  border-radius: 8px;
  width: 500px;
  padding: 24px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.modal-header h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
}

.form-group {
  margin-bottom: 20px;
}
.form-group .input {
  width: 100%;
}
.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

.search-input-container {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}
.search-input {
  padding-left: 45px;
  width: 100%;
}

.user-results {
  margin-top: 4px;
  border: 1px solid #ddd;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
}

.user-item {
  display: flex;
  align-items: center;
  padding: 12px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
}

.user-item:hover {
  background-color: #f5f5f5;
}

.user-info {
  flex: 1;
}

.user-name {
  font-weight: 500;
}

.user-email {
  font-size: 12px;
  color: #666;
}

.upload-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: white;
  border: 1px solid #dc3545;
  color: #dc3545;
  border-radius: 4px;
  cursor: pointer;
}

.selected-file {
  margin-top: 8px;
  font-size: 14px;
  color: #666;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

.button-cancel {
  background-color: #fff;
  border: 1px solid #ddd;
  color: #333;
}

.button-create {
  background-color: #dc3545;
  color: white;
  border: none;
}

.input:focus {
  outline: none;
  border-color: #80bdff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}
.home-link {
  opacity: 0.6; /* Làm mờ toàn bộ link */
  color: #98a2a7; /* Màu mờ nhạt */
  transition: opacity 0.3s ease, color 0.3s ease; /* Thêm hiệu ứng hover */
}

.home-link:hover {
  opacity: 1;
  color: #ffffff;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 16px 0;
}

.pagination {
  display: flex;
  align-items: center;
  gap: 8px;
}

.page-numbers {
  display: flex;
  gap: 4px;
}

.page-number {
  min-width: 32px;
  height: 32px;
  border: 1px solid #d9d9d9;
  background: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #666;
}

.page-number:hover {
  border-color: #1890ff;
  color: #1890ff;
}

.page-number.active {
  background: #1890ff;
  border-color: #1890ff;
  color: white;
}

.pagination-btn {
  min-width: 32px;
  height: 32px;
  border: 1px solid #d9d9d9;
  background: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #666;
}

.pagination-btn:hover:not(:disabled) {
  border-color: #1890ff;
  color: #1890ff;
}

.pagination-btn:disabled {
  cursor: not-allowed;
  color: #d9d9d9;
  border-color: #d9d9d9;
  background: #f5f5f5;
}
</style>