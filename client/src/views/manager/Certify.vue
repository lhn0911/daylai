<template>
  <div class="certificate-container">
    <div class="header">
      <div>
        <h2>Danh sách Chứng chỉ</h2>
        <p>Hãy xem và cập nhật chứng chỉ của bạn.</p>
      </div>
      <button class="add-button" @click="openAddCertificateModal">
        <span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.16602 10C2.16602 5.6845 5.68382 2.16669 9.99935 2.16669C14.3149 2.16669 17.8327 5.6845 17.8327 10C17.8327 14.3155 14.3149 17.8334 9.99935 17.8334C5.68382 17.8334 2.16602 14.3155 2.16602 10ZM11.1243 13.3334V11.125H13.3327C13.9505 11.125 14.4577 10.6178 14.4577 10C14.4577 9.38221 13.9505 8.87502 13.3327 8.87502H11.1243V6.66669C11.1243 6.04888 10.6172 5.54169 9.99935 5.54169C9.38154 5.54169 8.87435 6.04888 8.87435 6.66669V8.87502H6.66602C6.04821 8.87502 5.54102 9.38221 5.54102 10C5.54102 10.6178 6.04821 11.125 6.66602 11.125H8.87435V13.3334C8.87435 13.9512 9.38154 14.4584 9.99935 14.4584C10.6172 14.4584 11.1243 13.9512 11.1243 13.3334Z"
              fill="#AB1F24"
              stroke="#AB1F24"
            />
          </svg>
        </span>
        Thêm chứng chỉ
      </button>
    </div>

    <div class="table-container">
      <table class="certificate-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Loại chứng chỉ</th>
            <th>Giá trị chứng chỉ</th>
            <th>Thời gian / Ngày cấp</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(certificate, index) in userCertificates"
            :key="certificate.id"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ getCertificateType(certificate.certifycateId) }}</td>
            <td>{{ certificate.certificateValue || "N/A" }}</td>
            <td>
              {{ formatDate(certificate.receivedDate) }} -
              {{
                certificate.expirationDate
                  ? formatDate(certificate.expirationDate)
                  : "Không xác định"
              }}
            </td>
            <td>
              <button class="edit-button" @click="editCertificate(certificate)">
                Sửa
              </button>
              <button
                class="delete-button"
                @click="confirmDeleteCertificate(certificate.id)"
              >
                Xóa
              </button>
            </td>
          </tr>
          <tr v-if="userCertificates.length === 0">
            <td colspan="5" class="text-center">Chưa có chứng chỉ nào</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Add/Edit Certificate -->
    <div v-if="showAddCertificateModal" class="modal-overlay">
      <div class="modal-content">
        <h3>{{ isEditing ? "Sửa chứng chỉ" : "Thêm chứng chỉ mới" }}</h3>
        <select
          v-model="selectedCertifycateId"
          @change="updateCertificateValues"
          :disabled="isEditing"
        >
          <option value="">Chọn loại chứng chỉ</option>
          <option
            v-for="type in availableCertificateTypes"
            :key="type.id"
            :value="type.id"
          >
            {{ type.type }}
          </option>
        </select>

        <select v-model="form.certificateValue">
          <option value="">Chọn giá trị chứng chỉ</option>
          <option
            v-for="value in selectedCertificateValues"
            :key="value"
            :value="value"
          >
            {{ value }}
          </option>
        </select>

        <input v-model="form.receivedDate" type="date" placeholder="Ngày cấp" />
        <input
          v-model="form.expirationDate"
          type="date"
          placeholder="Ngày hết hạn"
          :min="form.receivedDate"
        />

        <div class="modal-actions">
          <button
            class="modal-save"
            @click="saveCertificate"
            :disabled="!isFormValid"
          >
            {{ isEditing ? "Cập nhật" : "Lưu" }}
          </button>
          <button class="modal-cancel" @click="closeAddCertificateModal">
            Hủy
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import Swal from "sweetalert2";

const userLogin = JSON.parse(localStorage.getItem("UserLogin"));
const store = useStore();

// Computed Properties
const userCertificates = computed(() =>
  store.getters["allUserCertificates"].filter(
    (cert) => cert.userId === userLogin.id
  )
);

const certificateTypes = computed(() => store.getters["allCertificateTypes"]);

// Lọc ra các loại chứng chỉ chưa được sử dụng
const availableCertificateTypes = computed(() => {
  if (isEditing.value) return certificateTypes.value;

  return certificateTypes.value.filter(
    (type) =>
      !userCertificates.value.some(
        (cert) => cert.certifycateId.toString() === type.id.toString()
      )
  );
});

// Kiểm tra form hợp lệ
const isFormValid = computed(() => {
  return (
    form.value.certifycateId &&
    form.value.certificateValue &&
    form.value.receivedDate
  );
});

// Reactive References
const showAddCertificateModal = ref(false);
const isEditing = ref(false);
const selectedCertifycateId = ref("");
const selectedCertificateValues = ref([]);
const form = ref({
  certifycateId: "",
  certificateValue: "",
  receivedDate: "",
  expirationDate: "",
  id: null,
  userId: userLogin.id,
});

// Initial Data Fetching
store.dispatch("fetchAllUserCertificates");
store.dispatch("fetchAllCertificateTypes");

// Methods
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN");
};

const openAddCertificateModal = () => {
  resetForm();
  showAddCertificateModal.value = true;
  isEditing.value = false;
};

const closeAddCertificateModal = () => {
  showAddCertificateModal.value = false;
  resetForm();
};

const updateCertificateValues = () => {
  const selectedCertificate = certificateTypes.value.find(
    (type) => type.id.toString() === selectedCertifycateId.value.toString()
  );
  selectedCertificateValues.value = selectedCertificate
    ? selectedCertificate.value
    : [];
  form.value.certificateValue = ""; // Reset giá trị chứng chỉ khi đổi loại
};

const certificateExists = (certifycateId) => {
  return userCertificates.value.some(
    (cert) => cert.certifycateId.toString() === certifycateId.toString()
  );
};

const validateDates = () => {
  if (!form.value.receivedDate) {
    throw new Error("Vui lòng chọn ngày cấp chứng chỉ");
  }

  if (
    form.value.expirationDate &&
    form.value.receivedDate > form.value.expirationDate
  ) {
    throw new Error("Ngày hết hạn phải sau ngày cấp");
  }
};

const saveCertificate = async () => {
  try {
    if (!isFormValid.value) {
      throw new Error("Vui lòng điền đầy đủ thông tin bắt buộc");
    }

    validateDates();

    form.value.userId = userLogin.id;

    if (isEditing.value) {
      await store.dispatch("updateUserCertificate", { ...form.value });
      Swal.fire({
        icon: "success",
        title: "Thành công",
        text: "Cập nhật chứng chỉ thành công",
      });
    } else {
      if (certificateExists(form.value.certifycateId)) {
        throw new Error("Bạn đã có chứng chỉ này trong hồ sơ");
      }

      await store.dispatch("addUserCertificate", { ...form.value });
      Swal.fire({
        icon: "success",
        title: "Thành công",
        text: "Thêm chứng chỉ mới thành công",
      });
    }

    closeAddCertificateModal();
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Lỗi",
      text: error.message || "Có lỗi xảy ra, vui lòng thử lại",
    });
  }
};

const editCertificate = (certificate) => {
  isEditing.value = true;
  selectedCertifycateId.value = certificate.certifycateId.toString();
  form.value = { ...certificate };
  showAddCertificateModal.value = true;
  updateCertificateValues();
};

const confirmDeleteCertificate = (id) => {
  Swal.fire({
    title: "Xác nhận xóa?",
    text: "Bạn có chắc chắn muốn xóa chứng chỉ này?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Xóa",
    cancelButtonText: "Hủy",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await store.dispatch("deleteUserCertificate", id);
        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: "Đã xóa chứng chỉ",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Không thể xóa chứng chỉ. Vui lòng thử lại",
        });
      }
    }
  });
};

const resetForm = () => {
  form.value = {
    certifycateId: "",
    certificateValue: "",
    receivedDate: "",
    expirationDate: "",
    id: null,
    userId: userLogin.id,
  };
  selectedCertifycateId.value = "";
  selectedCertificateValues.value = [];
};

const getCertificateType = (certifycateId) => {
  const cert = certificateTypes.value.find(
    (type) => type.id.toString() === certifycateId.toString()
  );
  return cert ? cert.type : "N/A";
};

// Watchers
watchEffect(() => {
  form.value.certifycateId = selectedCertifycateId.value;
  updateCertificateValues();
});
</script>

<style scoped>
.certificate-container {
  padding: 20px;
  font-family: Arial, sans-serif;
  color: #333;
  background-color: #f7fafc;
  border-radius: 8px;
  margin: 0 auto;
  max-width: 100%;
  padding: 1rem;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #4a5568;
}
.header p {
  color: #718096;
  font-size: 0.875rem;
}
.add-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #ffaeae;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: background-color 0.2s ease;
  border: none;
  cursor: pointer;
}

.table-container {
  margin-top: 20px;
  overflow-x: auto;
}

.certificate-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 1rem;
  margin-bottom: 20px;
}

.certificate-table th,
.certificate-table td {
  padding: 0.75rem;
  border-bottom: 1px solid #e2e8f0;
  text-align: center;
}

.certificate-table thead {
  background-color: #fff5f5;
  color: #e53e3e;
  font-weight: 600;
}
.certificate-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}
.certificate-table tbody tr:hover {
  background-color: #f7fafc;
}
.certificate-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.edit-button,
.delete-button {
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.3s ease;
}

.edit-button {
  background-color: #007bff;
  color: #fff;
}

.edit-button:hover {
  background-color: #0069d9;
}

.delete-button {
  background-color: #dc3545;
  color: #fff;
}

.delete-button:hover {
  background-color: #c82333;
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

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s ease-in-out;
}

.modal-content h3 {
  margin-bottom: 15px;
  font-size: 1.5em;
  color: #333;
}

.modal-content select,
.modal-content input {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
}

.modal-save {
  background-color: #4caf50;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;
  margin-right: 10px;
}

.modal-save:hover {
  background-color: #45a049;
}

.modal-cancel {
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;
}

.modal-cancel:hover {
  background-color: #c82333;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
