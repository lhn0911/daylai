<template>
  <div class="container">
    <div>
      <h2>Danh sách Doanh nghiệp</h2>
      <p>Hãy xem và cập nhật doanh nghiệp của bạn.</p>
    </div>

    <div class="add-enterprise">
      <button @click="toggleForm">
        <span>
          <i class="fa fa-plus-circle" aria-hidden="true"></i>
        </span>
        Thêm Doanh nghiệp
      </button>
    </div>

    <!-- Overlay và form sẽ hiển thị khi isFormVisible là true -->
    <div v-if="isFormVisible" class="overlay" @click="toggleForm">
      <div class="enterprise-form" @click.stop>
        <label class="enterprise-name" for="enterprise-name"
          >Thêm Doanh nghiệp</label
        >
        <div class="form-group">
          <div class="divider"></div>
          <label class="enterprise-add" for="enterprise-name"
            >Tên Doanh nghiệp</label
          >
          <br />
          <input
            type="text"
            id="enterprise-name"
            v-model="enterpriseName"
            placeholder="Công ty Cổ phần Rikkeisoft"
            @input="validateEnterpriseName"
          />
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </div>
        <div class="button-group">
          <button @click="toggleForm" class="cancel-button">Hủy</button>
          <button
            class="add-form"
            @click="addEnterprise"
            :disabled="!isFormValid"
          >
            <span>
              <i class="fa fa-plus-circle" aria-hidden="true"></i>
            </span>
            Thêm Doanh nghiệp
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import store from "@/store/store";
import Swal from "sweetalert2";

// Biến để điều khiển việc hiển thị form
const isFormVisible = ref(false);
const enterpriseName = ref("");
const errorMessage = ref("");

// Hàm để hiển thị/ẩn form
const toggleForm = () => {
  isFormVisible.value = !isFormVisible.value;
  // Reset form when toggling
  enterpriseName.value = "";
  errorMessage.value = "";
};

// Validation function
const validateEnterpriseName = () => {
  const trimmedName = enterpriseName.value.trim();

  // Check if name is empty
  if (!trimmedName) {
    errorMessage.value = "Tên doanh nghiệp không được để trống";
    return;
  }

  // Check minimum length
  if (trimmedName.length < 3) {
    errorMessage.value = "Tên doanh nghiệp phải có ít nhất 3 ký tự";
    return;
  }

  // Check for special characters or numbers
  const nameRegex = /^[A-Za-zÀ-ỹ\s]+$/;
  if (!nameRegex.test(trimmedName)) {
    errorMessage.value =
      "Tên doanh nghiệp chỉ được chứa chữ cái và khoảng trắng";
    return;
  }

  // Clear error if validation passes
  errorMessage.value = "";
};

// Computed property to check form validity
const isFormValid = computed(() => {
  return enterpriseName.value.trim().length >= 3 && !errorMessage.value;
});

// Hàm thêm doanh nghiệp
const addEnterprise = () => {
  // Validate before submission
  validateEnterpriseName();

  // Check if there are any validation errors
  if (errorMessage.value) {
    Swal.fire({
      icon: "error",
      title: "Lỗi",
      text: errorMessage.value,
      confirmButtonText: "Đóng",
    });
    return;
  }

  const newEnterprise = {
    userId: JSON.parse(localStorage.getItem("PartnerLogin")).id,
    introduction: enterpriseName.value.trim(),
    companySize: "",
    position: "",
    industry: "",
    emailEnterprise: "",
    websiteUrl: "",
    facebookUrl: "",
    bannerUrl:
      "https://th.bing.com/th/id/OIP.gSvP3sXUyXL_rR8cgHLCkAHaDt?rs=1&pid=ImgDetMain",
    avatarUrl: "",
    zaloUrl: "",
    linkedinUrl: "",
    twitterUrl: "",
    businessLicense: Math.floor(Math.random() * 100000000),
    hotline: "",
    status: "chờ xác nhận",
    address: "",
  };

  // Dispatch or commit the action to add the enterprise
  store
    .dispatch("addEnterprise", newEnterprise)
    .then(() => {
      // Success notification
      Swal.fire({
        icon: "success",
        title: "Thêm Doanh nghiệp",
        text: "Doanh nghiệp đã được thêm thành công!",
        confirmButtonText: "Đóng",
      });

      // Reset form
      enterpriseName.value = "";
      toggleForm();
    })
    .catch((error) => {
      // Error handling
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Không thể thêm doanh nghiệp. Vui lòng thử lại.",
        confirmButtonText: "Đóng",
      });
      console.error("Error adding enterprise:", error);
    });
};
</script>


<style scoped>
.add-enterprise {
  margin: 16px 0;
}
.add-form {
  background-color: #dc2626;
  color: #f8e9ea;
}
.divider {
  height: 1px;
  background-color: #d6d5d5;
  margin: 20px 0;
}

button {
  font-size: larger;
  font-weight: 500;
  background-color: #f8e9ea;
  color: #dc2626;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}
.enterprise-name {
  font-weight: 500;
}
.enterprise-add {
  font-size: 14px;
  font-weight: 500;
}
#enterprise-name {
  border: 1px solid #ccc;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 14px;
  color: #333;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

#enterprise-name:focus {
  border-color: #4a90e2;
  outline: none;
  box-shadow: 0 0 8px rgba(72, 144, 226, 0.5);
}

.form-group {
  margin-bottom: 16px;
}

.enterprise-form {
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2; /* Đảm bảo form nằm trên overlay */
}

.container {
  display: flex;
  justify-content: space-between;
  padding: 16px;
}
h2 {
  font-size: larger;
  font-weight: 500;
}

p {
  color: #6b6a6a;
}

/* Overlay */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* Nền mờ */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1; /* Đảm bảo overlay phủ kín màn hình */
}

/* Button group */
.button-group {
  display: flex;
  justify-content: space-between;
}

.cancel-button {
  background-color: #ddd;
  color: #333;
}
</style>