<template>
  <div>
    <div class="profile-form-section">
      <form class="profile-form" @submit.prevent="handleUpdate">
        <p class="text-2xl">Chỉnh sửa thông tin công ty</p>
        <div class="form-profile">
          <div class="form-left">
            <label for="businessLicense">Mã số thuế</label>
            <input
              type="text"
              id="businessLicense"
              v-model="enterprise.businessLicense"
              disabled
            />

            <label for="industry">Lĩnh vực hoạt động</label>
            <input type="text" id="industry" v-model="enterprise.industry" />

            <label for="hotline">Số điện thoại</label>
            <input type="text" id="hotline" v-model="enterprise.hotline" />

            <label for="emailEnterprise">Email</label>
            <input
              type="text"
              id="emailEnterprise"
              v-model="enterprise.emailEnterprise"
            />

            <label for="companySize">Quy mô công ty</label>
            <input
              type="text"
              id="companySize"
              v-model="enterprise.companySize"
            />

            <label for="address">Địa chỉ</label>
            <input type="text" id="address" v-model="enterprise.address" />
          </div>
        </div>
        <br />
        <div class="form-actions">
          <button type="button" @click="handleCancel" class="cancel-btn">
            Hủy
          </button>
          <button type="submit" class="update-btn">Cập nhật</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";

const router = useRouter();
const store = useStore();
const route = useRoute();

const enterprise = ref({
  businessLicense: "",
  industry: "",
  hotline: "",
  emailEnterprise: "",
  companySize: "",
  address: "",
});

onMounted(() => {
  const id = route.query.id;
  store.dispatch("fetchEnterpriseById", id).then(() => {
    enterprise.value = store.state.enterprise.currentEnterprise;
  });
});

const enterpriseId = JSON.parse(localStorage.getItem("enterpriseId"));
// Xử lý cập nhật thông tin công ty
const handleUpdate = async () => {
  try {
    console.log("Id doanh nghiệp:", route.query.id);
    console.log("Id doanh nghiệp11:", enterprise.value.id);

    await store.dispatch("updateEnterpriseById", {
      ...enterprise.value,
      id: enterprise.value.id,
    });
    Swal.fire(
      "Cập nhật thành công",
      "Thông tin công ty đã được cập nhật.",
      "success"
    );

    router.push("/enterprise/basic-info");
  } catch (error) {
    Swal.fire("Lỗi", "Cập nhật thất bại. Vui lòng thử lại.", "error");
    console.log("Error:", error);
  }
};

// Hủy và quay lại trang trước
const handleCancel = () => {
  router.push("/enterprise/basic-info");
};
</script>

<style scoped>
.image-instructions {
  font-size: 14px;
  color: #888;
  margin-bottom: 20px;
}
.profile-title {
  font-size: 20px;
}
.profile-content {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  width: 100%;
  margin-left: 70px;
}

.profile-icon {
  position: absolute;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-left: 105px;
  margin-top: -35px;
}

.profile-image-title {
  margin-right: 200px;
  margin-bottom: 10px;
  font-size: 20px;
}

.profile-image-container {
  width: 200px;
  height: 200px;
  overflow: hidden;
  border-radius: 50%;
}

.profile-manage {
  font-size: 14px;
  color: #888;
  margin-bottom: 20px;
  margin-top: 10px;
}

.profile-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-form-section {
  flex: 1;
}

.form-profile {
  display: flex;
}

.form-right,
.form-left {
  display: flex;
  flex-direction: column;
  flex: 1;
}

label {
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

input,
select {
  width: 70%;
  padding: 8px;
  font-size: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
}

.input-icon {
  position: absolute;
  right: 150px;
  width: 20px;
  height: 20px;
  color: #666;
  cursor: pointer;
}

.form-actions {
  display: flex;
  gap: 15px;
  margin-left: 250px;
}

.cancel-btn {
  background-color: #f0f0f0;
  padding: 10px 20px;
  width: 100px;
  border: none;
  border-radius: 4px;
  color: #555;
  cursor: pointer;
}

.update-btn {
  background-color: #d32f2f;
  width: 150px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
}
.error-message {
  color: red;
  font-size: 12px;
  margin-top: -10px;
  margin-bottom: 10px;
}
.profile-icon-container {
  position: absolute;
  bottom: -20px;
  right: -20px;
  width: 45px;
  height: 45px;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.profile-icon {
  width: 30px;
  height: 30px;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 30%;
}

.close-button {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close-button:hover,
.close-button:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.modal-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.modal-body input {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.modal-body button {
  background-color: #d32f2f;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
