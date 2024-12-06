<template>
  <div class="enterprise-details-container">
    <div class="enterprise-header">
      <img
        class="enterprise-avatar"
        :src="enterprise?.avatarUrl || 'default-avatar.jpg'"
        alt="Enterprise Avatar"
      />
    </div>
    <div class="enterprise-details">
      <div class="enterprise-info">
        <h2>
          {{ enterprise?.introduction || "Tên doanh nghiệp đang tải..." }}
        </h2>
        <button @click="goToUpdatePage" class="edit-button">
          <div class="edit-icon">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.0514 3.00002L4.20976 10.2417C3.95142 10.5167 3.70142 11.0584 3.65142 11.4334L3.34309 14.1334C3.23476 15.1084 3.93476 15.775 4.90142 15.6084L7.58476 15.15C7.95976 15.0834 8.48475 14.8084 8.74309 14.525L15.5848 7.28335C16.7681 6.03335 17.3014 4.60835 15.4598 2.86668C13.6264 1.14168 12.2348 1.75002 11.0514 3.00002Z"
                stroke="#AB1F24"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.91016 4.20831C10.2685 6.50831 12.1352 8.26665 14.4518 8.49998"
                stroke="#AB1F24"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2.5 18.3333H17.5"
                stroke="#AB1F24"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          Chỉnh sửa
        </button>
      </div>
      <div class="grid-container">
        <div class="column">
          <p>
            <strong>Mã số thuế</strong><br />
            {{ enterprise?.businessLicense || "#" }}
          </p>
          <p>
            <strong>Lĩnh vực hoạt động</strong><br />
            {{ enterprise?.industry || "#" }}
          </p>
          <p>
            <strong>Số điện thoại</strong><br />
            {{ enterprise?.hotline || "#" }}
          </p>
        </div>
        <div class="column">
          <p>
            <strong>Email</strong><br />
            {{ enterprise?.emailEnterprise || "#" }}
          </p>
          <p>
            <strong>Quy mô công ty</strong><br />
            {{ enterprise?.companySize || "#" }} nhân viên
          </p>
          <p>
            <strong>Địa chỉ</strong><br />
            {{ enterprise?.address || "#" }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { onMounted, ref } from "vue";

const router = useRouter();
const store = useStore();
const enterprise = ref(null);

onMounted(() => {
  // Lấy thông tin công ty từ Vuex (hoặc API)
  let enterpriseId = router.currentRoute.value.query.id;
  if (enterpriseId) {
    store.dispatch("fetchEnterpriseById", enterpriseId).then(() => {
      enterprise.value = store.state.enterprise.currentEnterprise;
    });
  }
  // Kiểm tra xem có enterpriseId trong URL không, nếu không lấy từ localStorage
  if (!enterpriseId) {
    enterpriseId = localStorage.getItem("enterpriseId");
    console.log("enterpriseId", enterpriseId);
  }
  if (enterpriseId) {
    // Lưu lại enterpriseId vào localStorage
    localStorage.setItem("enterpriseId", enterpriseId);

    // Fetch enterprise data từ Vuex store
    store.dispatch("fetchEnterpriseById", enterpriseId).then(() => {
      enterprise.value = store.state.enterprise.currentEnterprise;
    });
  }
});

// Hàm chuyển hướng sang trang chỉnh sửa
function goToUpdatePage() {
  router.push({
    name: "update-basic-info",
    query: { id: enterprise.value.id },
  });
}
</script>

<style scoped>
.enterprise-details-container {
  display: flex;
  padding: 20px;
  max-width: 800px;
  margin: 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;

  gap: 50px;
}

.enterprise-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.enterprise-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
}

.enterprise-info {
  display: flex;
  gap: 30px;
  margin: 0;
  font-size: 26px;
  font-weight: bold;
}

.edit-button {
  padding: 8px 14px;
  background-color: rgba(248, 233, 234, 1);
  color: rgba(171, 31, 36, 1);
  border: 1px solid;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 14px;
  width: 127px;
  height: 36px;
}

.edit-icon {
  margin-right: 5px;
}

.edit-button:hover {
  /* background-color: #d32f2f; */
}

.enterprise-details {
  margin-top: 20px;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Two equal columns */
  gap: 40px; /* Space between columns */
}

.column {
  padding: 10px;
}

.column p {
  margin: 8px 0;
}
</style>