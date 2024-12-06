<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th class="stt">STT</th>
          <th class="divider-name">Tên Doanh nghiệp</th>
          <th class="divider-name">Trạng thái</th>
          <th class="divider-name">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(enterprise, index) in filteredEnterprises"
          :key="enterprise.id"
        >
          <td class="stt">{{ index + 1 }}</td>
          <td>{{ enterprise.introduction }}</td>
          <td>
            <div
              :class="{
                'status-approved': enterprise.status === 'đã xác nhận',
                'status-pending': enterprise.status === 'chờ xác nhận',
              }"
            >
              {{ enterprise.status }}
            </div>
          </td>
          <td>
            <router-link
              :to="{
                path: '/enterprise/basic-info',
                query: { id: enterprise.id },
              }"
              @click.native="setCurrentEnterprise(enterprise.id)"
            >
              Xem chi tiết
              <span>
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.83594 9.99999H16.5026M16.5026 9.99999L10.6693 4.16666M16.5026 9.99999L10.6693 15.8333"
                    stroke="#231651"
                    stroke-width="1.67"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  
  <script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
onMounted(() => {
  store.dispatch("fetchAllEnterprise");
});
const userLogin = JSON.parse(localStorage.getItem("PartnerLogin"));

const filteredEnterprises = computed(() =>
  store.state.enterprise.enterprises.filter(
    (enterprise) => enterprise.userId === userLogin.id
  )
);
const enterprises = computed(() => store.state.enterprise.enterprises);
// Hàm gọi action để lấy thông tin doanh nghiệp
const setCurrentEnterprise = async (id) => {
  await store.dispatch("fetchEnterpriseById", id);
};
</script>
  
  <style scoped>
.table-container {
  padding: 16px;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  padding: 8px 12px;
  text-align: left;
  border-right: 1px solid #ddd;
}

td {
  padding: 8px 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th:last-child,
td:last-child {
  border-right: none;
}

th {
  background-color: #f8e9ea;
  color: #dc2626;
  font-weight: bold;
}

.stt {
  text-align: center;
  width: 60px;
}

.divider {
  width: 1px;
  background-color: #0e0d0d;
  height: 24px;
  margin-right: 8px;
}

.status-approved {
  color: green;
  background-color: #ecfdf3;
  width: 100px;
  padding: 0 6px 0 6px;
  border-radius: 20px;
}

.status-pending {
  width: 105px;
  padding: 0 6px 0 6px;
  border-radius: 20px;
  background-color: rgb(233, 233, 233);
  color: #3d3d3d;
}
a {
  display: inline-flex;
  align-items: center;

  text-decoration: none;
  font-weight: 500;
  position: relative;
  /* display: inline-block; */
  transition: all 0.3s ease;
}

a:hover {
  color: #dc2626;
  transform: translateX(5px);
  border-color: #007bff;
}

a:active {
  color: #b82525;

  transform: translateX(2px);
}

a::after {
  content: "";
  position: absolute;
  width: 0%;
  height: 2px;
  background-color: #007bff;
  left: 50%;
  bottom: -2px;
  transition: width 0.3s ease, left 0.3s ease;
}

a:hover {
  text-decoration: underline;
}
</style>
  