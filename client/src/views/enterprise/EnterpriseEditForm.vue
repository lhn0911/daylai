<template>
  <div class="edit-form-container">
    <h2>Sửa thông tin doanh nghiệp</h2>
    <form @submit.prevent="updateEnterprise" class="edit-form">
      <div class="form-group">
        <label for="introduction">Tên doanh nghiệp:</label>
        <input
          type="text"
          id="introduction"
          v-model="enterprise.introduction"
          required
        />
      </div>
      <div class="form-group">
        <label for="businessLicense">Mã số thuế:</label>
        <input
          type="text"
          id="businessLicense"
          v-model="enterprise.businessLicense"
          required
        />
      </div>
      <div class="form-group">
        <label for="industry">Lĩnh vực hoạt động:</label>
        <input
          type="text"
          id="industry"
          v-model="enterprise.industry"
          required
        />
      </div>
      <div class="form-group">
        <label for="hotline">Số điện thoại:</label>
        <input type="tel" id="hotline" v-model="enterprise.hotline" required />
      </div>
      <div class="form-group">
        <label for="emailEnterprise">Email:</label>
        <input
          type="email"
          id="emailEnterprise"
          v-model="enterprise.emailEnterprise"
          required
        />
      </div>
      <div class="form-group">
        <label for="companySize">Quy mô công ty:</label>
        <input
          type="number"
          id="companySize"
          v-model="enterprise.companySize"
          required
        />
      </div>
      <div class="form-group">
        <label for="address">Địa chỉ:</label>
        <input type="text" id="address" v-model="enterprise.address" required />
      </div>
      <div class="form-actions">
        <button type="button" @click="showEditForm = false" class="cancel-btn">
          Hủy
        </button>
        <button type="submit" class="save-btn">Lưu</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  enterprise: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update"]);

async function updateEnterprise() {
  await emit("update", props.enterprise);
}
</script>

<style scoped>
.edit-form-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.edit-form {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 4px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
}

.cancel-btn,
.save-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-btn {
  background-color: #ccc;
}

.save-btn {
  background-color: #d32f2f;
  color: white;
}
</style>