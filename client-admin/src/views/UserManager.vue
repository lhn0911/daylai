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
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-users w-4 h-4"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg
              >USER</span
            ></span
          >
        </li>
      </ol>
    </nav>
    <div class="filters">
      <input
        type="text"
        class="search-input"
        placeholder="Search by email, username..."
        v-model="searchValue"
      />
      <div class="select-wrapper">
        <select class="role-select" v-model="selectedRole">
          <option value="all">All roles</option>
          <option value="user">USER</option>
          <option value="admin">ADMIN</option>
          <option value="partner">PARTNER</option>
        </select>
      </div>
      <div class="select-wrapper">
        <select class="status-select" v-model="selectedStatus">
          <option value="all">All status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div class="select-wrapper">
        <select class="sort-select" v-model="sortOrder">
          <option value="none">Sort by Username</option>
          <option value="asc">Username A-Z</option>
          <option value="desc">Username Z-A</option>
        </select>
      </div>

      <button class="clear-filters" @click="clearFilters">Clear filters</button>
    </div>

    <table class="user-table">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Username</th>
          <th>Role</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in paginatedUsers" :key="user.id">
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.userName }}</td>
          <td>{{ user.role }}</td>
          <td :class="['status', user.status.toLowerCase()]">
            {{ user.status }}
          </td>
          <td class="actions">
            <button class="view-btn" @click="openEditModal(user)">
              <AnOutlinedEdit />
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
    <div v-if="isEditModalVisible" class="modal-overlay">
      <div class="modal">
        <h2 class="text-2xl">Edit User</h2>
        <form @submit.prevent="saveChanges">
          <div class="form-group">
            <label>First Name</label>
            <input type="text" v-model="editableUser.firstName" disabled />
          </div>
          <div class="form-group">
            <label>Last Name</label>
            <input type="text" v-model="editableUser.lastName" disabled />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="text" v-model="editableUser.email" disabled />
          </div>
          <div class="form-group">
            <label>Username</label>
            <input type="text" v-model="editableUser.userName" disabled />
          </div>
          <div class="form-group">
            <label>Role</label>
            <select
              v-model="editableUser.role"
              :disabled="
                editableUser.role === 'partner' || editableUser.role === 'admin'
              "
            >
              <option value="user">USER</option>
              <option value="admin">ADMIN</option>
              <option value="partner">PARTNER</option>
            </select>
          </div>

          <div class="form-group">
            <label>Status</label>
            <select
              v-model="editableUser.status"
              :disabled="editableUser.role === 'admin'"
            >
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
import { ref, computed } from "vue";
import { AnOutlinedEdit } from "@kalimahapps/vue-icons";
import { useStore } from "vuex";
import Swal from "sweetalert2";
const store = useStore();
store.dispatch("fetchAllUsers");
console.log(11111, store);

const users = computed(() => store.state.user.users);

const itemsPerPage = ref(5);
const currentPage = ref(1);

const searchValue = ref("");
const selectedRole = ref("all");
const selectedStatus = ref("all");

const filteredUsers = computed(() => {
  return users.value.filter((user) => {
    const searchMatch =
      user.email.toLowerCase().includes(searchValue.value.toLowerCase()) ||
      user.userName.toLowerCase().includes(searchValue.value.toLowerCase());

    const roleMatch =
      selectedRole.value === "all" || user.role === selectedRole.value;

    const statusMatch =
      selectedStatus.value === "all" ||
      user.status.toLowerCase() === selectedStatus.value.toLowerCase();

    return searchMatch && roleMatch && statusMatch;
  });
});

const totalPages = computed(() =>
  Math.ceil(filteredUsers.value.length / itemsPerPage.value)
);

const sortOrder = ref("none");

const sortedUsers = computed(() => {
  let result = [...filteredUsers.value];
  if (sortOrder.value === "asc") {
    result.sort((a, b) => a.userName.localeCompare(b.userName));
  } else if (sortOrder.value === "desc") {
    result.sort((a, b) => b.userName.localeCompare(a.userName));
  }
  return result;
});

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return sortedUsers.value.slice(start, end);
});

// Chuyển trang
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};
const clearFilters = () => {
  searchValue.value = "";
  selectedRole.value = "all";
  selectedStatus.value = "all";
  sortOrder.value = "none";
};

const isEditModalVisible = ref(false);
const editableUser = ref({});

const openEditModal = (user) => {
  editableUser.value = { ...user };
  isEditModalVisible.value = true;
};

const closeEditModal = () => {
  isEditModalVisible.value = false;
};

const saveChanges = () => {
  if (editableUser.role === "admin") {
    editableUser.status = "active";
  }
  store
    .dispatch("updateUser", editableUser.value)
    .then(() => {
      Swal.fire({
        title: "Update success",
        width: 600,
        padding: "3em",
        color: "#716add",
        background: "#fff url(https://sweetalert2.github.io/images/trees.png)",
        backdrop: `
          rgba(0,0,123,0.4)
          url("https://sweetalert2.github.io/images/nyan-cat.gif")
          left top
          no-repeat
        `,
      });
      closeEditModal();
    })
    .catch((error) => {
      console.error("Error updating user:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to update user!",
      });
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
