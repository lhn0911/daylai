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
        <li class="ant-breadcrumb-separator home-link" aria-hidden="true">/</li>

        <li>
          <span class="ant-breadcrumb-link"
            ><span
              class="select-none italic font-bold cursor-pointer flex items-center gap-1"
            >
              <AkLanguage></AkLanguage> CV LANGUAGE MANAGER</span
            ></span
          >
        </li>
      </ol>
    </nav>
    <div class="flex justify-end">
      <button
        @click="showModal = true"
        class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md"
      >
        <span>+</span>
        Add Language
      </button>
    </div>

    <div class="filters">
      <input
        type="text"
        class="search-input"
        placeholder="Search by name..."
        v-model="inputSearch"
      />
      <button class="clear-filters" @click="clearFilters">Clear filters</button>
    </div>

    <table class="user-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Language</th>
          <th>CODE</th>
          <th>STATUS</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(language, index) in paginatedLanguages" :key="index.id">
          <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
          <td>{{ language.name }}</td>
          <td>{{ language.code }}</td>
          <td :class="['status', language.status.toLowerCase()]">
            {{ language.status }}
          </td>
          <td class="actions">
            <button class="view-btn" @click="openEditModal(language)">
              <AnOutlinedEdit />
            </button>
            <button class="delete-btn" @click="deleteLanguage(language.id)">
              <FlDelete />
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Next
      </button>
    </div>

    <!-- them ngon ngu -->
    <!-- modal thêm chứng chỉ -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div
        class="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative animate__animated animate__fadeIn"
      >
        <h2 class="text-xl font-semibold mb-4 text-center">Add Languages</h2>
        <form @submit.prevent="addLanguage">
          <div class="mb-4">
            <label for="name" class="block text-gray-700 font-medium mb-1"
              >Name Language</label
            >
            <input
              v-model="languageName"
              type="text"
              id="name"
              class="w-full px-3 py-2 border rounded"
              placeholder="Enter language name"
            />
          </div>
          <div class="mb-4">
            <label for="band" class="block text-gray-700 font-medium mb-1"
              >Code</label
            >
            <input
              type="text"
              id="band"
              v-model="code"
              class="w-full px-3 py-2 border rounded"
              placeholder="Enter code"
            />
          </div>
          <div class="mb-4">
            <label for="band" class="block text-gray-700 font-medium mb-1"
              >Status</label
            >
            <select
              v-model="status"
              class="w-full px-3 py-2 border rounded bg-white"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div class="flex justify-end space-x-2">
            <button
              type="submit"
              class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Add
            </button>
            <button
              type="button"
              @click="showModal = false"
              class="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="isEditModalVisible" class="modal-overlay">
      <div class="modal">
        <h2 class="text-2xl">Edit Language</h2>
        <form @submit.prevent="saveChanges">
          <div class="form-group">
            <label>Name Language</label>
            <input type="text" v-model="editLanguage.name" />
          </div>
          <div class="form-group">
            <label>Code</label>
            <input type="text" v-model="editLanguage.code" />
          </div>
          <div class="form-group">
            <label>Status</label>
            <select v-model="editLanguage.status" name="" id="">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div class="form-actions">
            <button type="submit">Save</button>
            <button type="button" @click="closeEditModal">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { AnOutlinedEdit } from "@kalimahapps/vue-icons";
import { FlDelete } from "@kalimahapps/vue-icons";
import { AkLanguage } from "@kalimahapps/vue-icons";
import { useStore } from "vuex";
import Swal from "sweetalert2";
const store = useStore();
onMounted(() => {
  store.dispatch("fetchAllLanguages");
  watch(inputSearch, (newSearchTerm) => {
    if (newSearchTerm) {
      store.dispatch("searchLanguageByName", newSearchTerm);
    } else {
      store.dispatch("fetchAllLanguages");
    }
  });
});

const languages = computed(() => store.state.languages.languages);

const itemsPerPage = ref(5);
const currentPage = ref(1);

const inputSearch = ref("");
const showModal = ref(false);
const handleSearch = () => {};

const languageName = ref("");
const code = ref("");
const status = ref("");
const totalPages = computed(() =>
  Math.ceil(store.state.languages.languages.length / itemsPerPage.value)
);

const sortOrder = ref("none");

const paginatedLanguages = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return store.state.languages.languages.slice(start, end);
});

const addLanguage = async () => {
  const isDuplicate = languages.value.some(
    (lang) => lang.name.toLowerCase() === languageName.value.trim().toLowerCase()
  );
  if (isDuplicate) {
    Swal.fire({
      icon: "error",
      title: "Duplicate Language",
      text: "The language name already exists. Please use a different name.",
    });
    return;
  }

  const newLanguage = {
    id: Math.ceil(Math.random() * 1000000),
    name: languageName.value.trim(),
    code: code.value.trim(),
    status: status.value,
  };

  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Your Language has been added",
    showConfirmButton: false,
    timer: 1500,
  });

  await store.dispatch("addLanguage", newLanguage);
  languageName.value = "";
  code.value = "";
  status.value = "";
  showModal.value = false;
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const clearFilters = () => {
  inputSearch.value = "";
};

const isEditModalVisible = ref(false);
const editLanguage = ref({ id: null, name: "", code: "", status: "" });

const openEditModal = (language) => {
  editLanguage.value = { ...language };
  isEditModalVisible.value = true;
};

const closeEditModal = () => {
  isEditModalVisible.value = false;
};

const saveChanges = async () => {
  const isDuplicate = languages.value.some(
    (lang) =>
      lang.name.toLowerCase() === editLanguage.value.name.trim().toLowerCase() &&
      lang.id !== editLanguage.value.id
  );
  if (isDuplicate) {
    Swal.fire({
      icon: "error",
      title: "Language already exists",
      text: "The language name already exists. Please use a different name.",
    });
    return;
  }

  await store.dispatch("updatedLanguage", {
    ...editLanguage.value,
    name: editLanguage.value.name.trim(),
    code: editLanguage.value.code.trim(),
  });

  Swal.fire({
    title: "Updated Successfully",
    icon: "success",
  });

  closeEditModal();
};

const deleteLanguage = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      store.dispatch("deleteLanguage", id);
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  });
};
</script>

<style scoped>
/* Các style như trong mã trước */
body {
  font-family: "Arial", sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f9fafb;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header h1 {
  font-size: 2rem;
  font-weight: bold;
}

.filters {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 30px;
}

.search-input,
.role-select,
.status-select {
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 5px;
}

.search-input {
  flex-grow: 0.2;
}

.select-wrapper {
  position: relative;
}

select {
  padding-right: 30px;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
}

.checkbox-wrapper label {
  margin-left: 10px;
}

.clear-filters {
  border: 1px solid black;
  background-color: transparent;
  color: #4b5563;
  cursor: pointer;
}

.clear-filters:hover {
  color: #1f2937;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.user-table th,
.user-table td {
  padding: 12px 15px;
  text-align: left;
}

.user-table th {
  background-color: #f3f4f6;
  font-weight: bold;
}

.user-table tr {
  border-bottom: 1px solid #e5e7eb;
}

.user-table tr:hover {
  background-color: #f9fafb;
}

.status {
  font-weight: bold;
}

.status.active {
  color: #10b981;
}

.status.inactive {
  color: #ef4444;
}

.actions {
  display: flex;
}

.view-btn {
  background-color: transparent;
  border: none;
  color: #3b82f6;
  cursor: pointer;
  font-size: 25px;
  display: flex;
  gap: 5px;
}

.view-btn:hover {
  color: #2563eb;
}

.delete-btn {
  background-color: transparent;
  border: none;
  color: #e60f36;
  cursor: pointer;
  font-size: 25px;
  display: flex;
  gap: 5px;
}

.delete-btn:hover {
  color: #fa0929;
}
.pagination {
  display: flex;
  justify-content: end;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
}

.pagination button {
  padding: 8px 12px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #3b82f6;
  color: white;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #d1d5db;
  cursor: not-allowed;
}

.pagination span {
  font-size: 16px;
  color: #374151;
}
.sort-select {
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 5px;
  background-color: #ffffff;
  color: #4b5563;
  cursor: pointer;
  font-size: 14px;
}

.sort-select:hover {
  border-color: #9ca3af;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.modal h2 {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: 5px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.form-actions button {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.form-actions button[type="submit"] {
  background-color: #3b82f6;
  color: white;
}

.form-actions button[type="button"] {
  background-color: #e5e7eb;
  color: #374151;
}
.home-link {
  opacity: 0.6; /* Làm mờ toàn bộ link */
  color: #98a2a7; /* Màu mờ nhạt */
  transition: opacity 0.3s ease, color 0.3s ease; /* Thêm hiệu ứng hover */
}

.home-link:hover {
  opacity: 1; /* Hiển thị rõ hơn khi hover */
  color: #ffffff; /* Đổi màu khi hover */
}
</style>
