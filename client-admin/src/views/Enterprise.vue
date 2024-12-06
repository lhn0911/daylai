<template>
  <div class="container">
    <!-- Search and Filter Bar -->
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
                class="lucide lucide-factory w-4 h-4"
              >
                <path
                  d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"
                ></path>
                <path d="M17 18h1"></path>
                <path d="M12 18h1"></path>
                <path d="M7 18h1"></path>
              </svg>
              ENTERPRISE
            </span>
          </span>
        </li>
      </ol>
    </nav>
    <div class="search-bar">
      <input
        v-model="searchQuery"
        type="text"
        class="search-input"
        placeholder="Search enterprises..."
      />
      <select v-model="statusFilter" class="status-select">
        <option value="">All Status</option>
        <option value="đã xác nhận">Verified</option>
        <option value="chờ xác nhận">Pending</option>
        <option value="block">Blocked</option>
      </select>
    </div>

    <!-- Enterprise Table -->
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Enterprise Name</th>
            <th>Company Size</th>
            <th>Industry</th>
            <th>Status</th>
            <th>Owner</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="enterprise in paginatedEnterprises" :key="enterprise.id">
            <td>{{ enterprise.introduction || "-" }}</td>
            <td>{{ enterprise.companySize || "-" }}</td>
            <td>{{ enterprise.industry || "-" }}</td>
            <td>
              <!-- Dropdown for Status -->
              <div class="dropdown">
                <span
                  :class="{
                    'status-badge': true,
                    'status-verified': enterprise.status === 'đã xác nhận',
                    'status-pending': enterprise.status === 'chờ xác nhận',
                    'status-blocked': enterprise.status === 'block',
                  }"
                  @click="toggleStatusDropdown(enterprise.id)"
                >
                  {{ getStatusText(enterprise.status) }}
                </span>
                <div
                  v-if="activeDropdown === enterprise.id"
                  class="dropdown-menu"
                >
                  <div
                    class="dropdown-item"
                    @click="updateStatus(enterprise, 'đã xác nhận')"
                  >
                    Verified
                  </div>
                  <div
                    class="dropdown-item"
                    @click="updateStatus(enterprise, 'chờ xác nhận')"
                  >
                    Pending
                  </div>
                  <div
                    class="dropdown-item"
                    @click="updateStatus(enterprise, 'block')"
                  >
                    Blocked
                  </div>
                </div>
              </div>
            </td>
            <td>{{ getOwnerName(enterprise.userId) }}</td>
            <td>{{ enterprise.hotline || "-" }}</td>
            <td>{{ enterprise.emailEnterprise || "-" }}</td>
            <td>
              <div class="action-buttons">
                <button class="btn-edit" @click="editEnterprise(enterprise)">
                  Edit
                </button>
                <button
                  class="btn-delete"
                  @click="confirmDeleteEnterprise(enterprise)"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="pagination">
      <button
        v-for="page in totalPages"
        :key="page"
        :class="['btn-page', { active: page === currentPage }]"
        @click="changePage(page)"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted, watch } from "vue";
import Swal from "sweetalert2";
import { useStore } from "vuex";

const store = useStore();

const searchQuery = ref("");
const statusFilter = ref("");
const currentPage = ref(1);
const itemsPerPage = 5;

const activeDropdown = ref(null);

const enterprises = computed(() => store.getters.allEnterprise);
const users = computed(() => store.getters.allUsers);

const getOwnerName = (userId) => {
  const user = users.value.find((user) => user.id === userId);
  return user ? user.fullName || user.userName || "-" : "-";
};

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

const filteredEnterprises = computed(() => {
  return enterprises.value.filter((enterprise) => {
    const matchesSearch =
      !searchQuery.value ||
      (enterprise.introduction &&
        enterprise.introduction
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase())) ||
      (enterprise.emailEnterprise &&
        enterprise.emailEnterprise
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()));
    const matchesStatus =
      !statusFilter.value || enterprise.status === statusFilter.value;

    return matchesSearch && matchesStatus;
  });
});

const paginatedEnterprises = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredEnterprises.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredEnterprises.value.length / itemsPerPage);
});

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const toggleStatusDropdown = (enterpriseId) => {
  activeDropdown.value =
    activeDropdown.value === enterpriseId ? null : enterpriseId;
};

const updateStatus = (enterprise, newStatus) => {
  const updatedEnterprise = { ...enterprise, status: newStatus };
  store.dispatch("updateEnterprise", updatedEnterprise);
  Swal.fire(
    "Status Updated",
    `Enterprise status changed to ${getStatusText(newStatus)}.`,
    "success"
  );
  activeDropdown.value = null;
};

const editEnterprise = async (enterprise) => {
  const { value: formData } = await Swal.fire({
    title: "Edit Enterprise",
    html: `  
      <input id="swal-intro" class="swal2-input" placeholder="Introduction" value="${
        enterprise.introduction || ""
      }">
      <input id="swal-size" class="swal2-input" placeholder="Company Size" value="${
        enterprise.companySize || ""
      }">
      <input id="swal-industry" class="swal2-input" placeholder="Industry" value="${
        enterprise.industry || ""
      }">
    `,
    focusConfirm: false,
    showCancelButton: true,
    preConfirm: () => {
      return {
        introduction: document.getElementById("swal-intro").value,
        companySize: document.getElementById("swal-size").value,
        industry: document.getElementById("swal-industry").value,
      };
    },
  });

  if (formData) {
    const updatedEnterprise = { ...enterprise, ...formData };
    await store.dispatch("updateEnterprise", updatedEnterprise);
    Swal.fire("Updated!", "Enterprise updated successfully.", "success");
  }
};

const confirmDeleteEnterprise = (enterprise) => {
  Swal.fire({
    title: "Are you sure?",
    text: `Do you want to delete ${enterprise.introduction}?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      store.dispatch("deleteEnterprise", enterprise.id);
      Swal.fire("Deleted!", "Enterprise has been deleted.", "success");
    }
  });
};

onMounted(() => {
  store.dispatch("fetchAllEnterprise");
  store.dispatch("fetchAllUsers");
});

watch([searchQuery, statusFilter], () => {
  currentPage.value = 1;
});
</script>

<style scoped>
.container {
  padding: 24px;
  max-width: 100%;
}

.search-bar {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  margin-top: 30px;
}

.search-input,
.status-select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.table-container {
  overflow-x: auto;
  background: white;
  border-radius: 8px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 12px 16px;
  border: 1px solid #eee;
  text-align: left;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  cursor: pointer;
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
.action-buttons {
  display: flex;
  gap: 8px;
}

.btn-edit,
.btn-delete {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
}

.btn-edit {
  background-color: #4caf50;
}

.btn-delete {
  background-color: #f44336;
}

.pagination {
  margin-top: 16px;
  display: flex;
  justify-content: center;
  gap: 8px;
}

.btn-page {
  padding: 8px 12px;
  border: 1px solid #ddd;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
}

.btn-page.active {
  background-color: #2563eb;
  color: white;
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
.home-link {
  opacity: 0.6;
  color: #98a2a7;
  transition: opacity 0.3s ease, color 0.3s ease;
}

.home-link:hover {
  opacity: 1;
  color: #ffffff;
}
</style>
