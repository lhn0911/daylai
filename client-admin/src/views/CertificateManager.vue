<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-6">
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
          <li class="ant-breadcrumb-separator home-link" aria-hidden="true">
            /
          </li>
          <li>
            <span class="ant-breadcrumb-link">
              <span
                class="select-none italic font-bold cursor-pointer flex items-center gap-1"
              >
                <svg
                  data-v-cc56cb04=""
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-ticket-check w-4 h-4"
                >
                  <path
                    data-v-cc56cb04=""
                    d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"
                  ></path>
                  <path data-v-cc56cb04="" d="m9 12 2 2 4-4"></path>
                </svg>
                Certificate
              </span>
            </span>
          </li>
        </ol>
      </nav>
      <button
        @click="showModal = true"
        class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md"
      >
        <span>+</span>
        Add Certificate
      </button>
    </div>

    <div class="overflow-x-auto">
      <table
        class="min-w-full border-collapse shadow-lg rounded-lg overflow-hidden"
      >
        <thead>
          <tr class="bg-gradient-to-r from-purple-500 to-purple-700 text-white">
            <th class="border p-3 text-left w-16">#</th>
            <th class="border p-3 text-left">NAME CERTIFICATE</th>
            <th class="border p-3 text-left">BAND</th>
            <th class="border p-3 text-center w-24">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in paginatedData"
            :key="row.id"
            class="hover:bg-gray-100 even:bg-gray-50"
          >
            <td class="border p-3 text-center">
              {{ index + 1 + (currentPage - 1) * itemsPerPage }}
            </td>
            <td class="border p-3">
              <div class="font-medium">{{ row.type }}</div>
            </td>
            <td class="border p-3">
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in row.value"
                  :key="tag"
                  class="px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800"
                >
                  {{ tag }}
                </span>
              </div>
            </td>
            <td class="border p-3 text-center">
              <button
                @click="deleteCer(row.id)"
                class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow-sm flex items-center gap-1"
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
                  class="lucide lucide-trash2 w-4 h-4"
                >
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  <line x1="10" x2="10" y1="11" y2="17"></line>
                  <line x1="14" x2="14" y1="11" y2="17"></line>
                </svg>
                Delete
              </button>
              <button
                @click="editCertificate(row)"
                class="bg-blue-500 hover:bg-blue-600 text-white px-3 mt-1 py-1 rounded shadow-sm flex items-center gap-1"
              >
                <AkEdit />
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Pagination -->
    <div class="flex justify-end mt-4 items-center space-x-2">
      <button
        class="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300"
        :disabled="currentPage === 1"
        @click="currentPage--"
      >
        Previous
      </button>

      <button
        v-for="page in totalPages"
        :key="page"
        @click="currentPage = page"
        :class="[
          'px-4 py-2 border rounded',
          page === currentPage
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 hover:bg-gray-300',
        ]"
      >
        {{ page }}
      </button>

      <button
        class="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300"
        :disabled="currentPage === totalPages"
        @click="currentPage++"
      >
        Next
      </button>
    </div>
    <!-- modal thêm chứng chỉ -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div class="bg-white w-96 p-6 rounded shadow-lg relative">
        <h2 class="text-xl font-semibold mb-4">Add Certificate</h2>
        <form @submit.prevent="addCertificate">
          <div class="mb-4">
            <label for="name" class="block text-gray-700 font-medium mb-1"
              >Certificate Name</label
            >
            <input
              v-model="newNameCertificate"
              type="text"
              id="name"
              class="w-full px-3 py-2 border rounded"
              placeholder="Enter certificate name"
            />
          </div>
          <div class="mb-4">
            <label for="band" class="block text-gray-700 font-medium mb-1"
              >Band</label
            >
            <input
              type="text"
              id="band"
              v-model="newBand"
              class="w-full px-3 py-2 border rounded"
              placeholder="Enter band"
            />
          </div>
          <div class="flex justify-end space-x-2">
            <button
              type="submit"
              @click="addBand"
              class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
              Add
            </button>
            <button
              type="button"
              @click="showModal = false"
              class="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
    <!-- modal chỉnh sửa -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div class="bg-white w-96 p-6 rounded shadow-lg relative">
        <h2 class="text-xl font-semibold mb-4">Edit Certificate</h2>
        <form @submit.prevent="updateCertificate">
          <div class="mb-4">
            <label for="edit-name" class="block text-gray-700 font-medium mb-1"
              >Certificate Name</label
            >
            <input
              v-model="editedNameCertificate"
              type="text"
              id="edit-name"
              class="w-full px-3 py-2 border rounded"
              placeholder="Enter certificate name"
            />
          </div>
          <div class="mb-4">
            <label for="edit-band" class="block text-gray-700 font-medium mb-1"
              >Band</label
            >
            <input
              v-model="editedBand"
              type="text"
              id="edit-band"
              class="w-full px-3 py-2 border rounded"
              placeholder="Enter band"
            />
          </div>
          <div class="flex justify-end space-x-2">
            <button
              type="submit"
              class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
              Update
            </button>

            <button
              type="button"
              @click="closeEditModal"
              class="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { ref, computed } from "vue";
import VueAwesomePaginate from "vue-awesome-paginate";
import { AkEdit } from "@kalimahapps/vue-icons";
import Swal from "sweetalert2";
const store = useStore();
store.dispatch("fetchAllCertificateTypes");

const currentPage = ref(1);
const itemsPerPage = ref(5);

const tableData = computed(() => store.state.certify.certificateTypes);

const totalPages = computed(() =>
  Math.ceil(tableData.value.length / itemsPerPage.value)
);

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return tableData.value.slice(start, start + itemsPerPage.value);
});

const showModal = ref(false);
const newNameCertificate = ref("");
const newBandCertificate = ref([]);
const newBand = ref("");

const addCertificate = async () => {
  const existingCertificate = tableData.value.find(
    (cert) => cert.type.toLowerCase() === newNameCertificate.value.toLowerCase()
  );

  if (existingCertificate) {
    Swal.fire({
      icon: "error",
      title: "Duplicate Certificate Name",
      text: "The certificate name already exists. Please choose another name.",
    });
    return;
  }

  const newCert = {
    id: Math.ceil(Math.random() * 10000000000),
    type: newNameCertificate.value,
    value: [...newBandCertificate.value],
  };

  await store.dispatch("addCertificateType", newCert);

  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Your certificate has been added",
    showConfirmButton: false,
    timer: 1500,
  });

  newNameCertificate.value = "";
  newBandCertificate.value = [];
  showModal.value = false;
};

const addBand = () => {
  if (newBand.value.trim()) {
    const bands = newBand.value
      .split(",")
      .map((band) => band.trim())
      .filter(Boolean);
    newBandCertificate.value.push(...bands);
    newBand.value = "";
  }
};

const showEditModal = ref(false);
const editedCertificateId = ref(null);
const editedNameCertificate = ref("");
const editedBand = ref("");

const editCertificate = (certificate) => {
  showEditModal.value = true;
  editedCertificateId.value = certificate.id;
  editedNameCertificate.value = certificate.type;
  editedBand.value = certificate.value.join(", ");
};

const closeEditModal = () => {
  showEditModal.value = false;
  editedCertificateId.value = null;
  editedNameCertificate.value = "";
  editedBand.value = "";
};

const updateCertificate = async () => {
  const existingCertificate = tableData.value.find(
    (cert) =>
      cert.type.toLowerCase() === editedNameCertificate.value.toLowerCase() &&
      cert.id !== editedCertificateId.value
  );

  if (existingCertificate) {
    Swal.fire({
      icon: "error",
      title: "Duplicate Certificate Name",
      text: "The certificate name already exists. Please choose another name.",
    });
    return;
  }

  const updatedCert = {
    id: editedCertificateId.value,
    type: editedNameCertificate.value,
    value: editedBand.value
      .split(",")
      .map((band) => band.trim())
      .filter(Boolean),
  };

  await store.dispatch("updateCertificate", updatedCert);

  Swal.fire({
    title: "Updated Successfully",
    icon: "success",
  });

  closeEditModal();
};

const deleteCer = (id) => {
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
      store.dispatch("deleteCertificate", id);

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
.home-link {
  opacity: 0.6; /* Làm mờ toàn bộ link */
  color: #98a2a7; /* Màu mờ nhạt */
  transition: opacity 0.3s ease, color 0.3s ease; /* Thêm hiệu ứng hover */
}

.home-link:hover {
  opacity: 1; /* Hiển thị rõ hơn khi hover */
  color: #ffffff; /* Đổi màu khi hover */
}

table {
  border-spacing: 0;
}

thead th {
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.9rem;
}

td {
  vertical-align: middle;
}

button {
  transition: all 0.2s ease-in-out;
}

button:hover {
  transform: translateY(-2px);
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background-color: #e9d5ff;
  color: #6b21a8;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  margin-right: 0.25rem;
}
</style>
