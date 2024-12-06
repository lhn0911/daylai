<template>
  <div>
    <div class="container-slider">
      <div class="sidebar" v-if="currentUser">
        <div class="user-info">
          <img
            :src="currentUser.avatar"
            alt="User avatar"
            class="user-avatar"
          />
          <div>
            <div class="user-name">{{ currentUser.userName }}</div>
            <div class="user-text">{{ currentUser.email }}</div>
          </div>
        </div>
        <hr />
        <nav class="nav-menu">
          <router-link
            v-for="(link, index) in navLinks"
            :key="index"
            :to="link.path"
            class="nav-item"
            :class="{ active: link.path === $route.path }"
          >
            <div class="icon-wrapper"></div>
            <span>{{ link.name }}</span>
          </router-link>
        </nav>
      </div>
      <p v-else>Đang tải thông tin người dùng...</p>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();

const userId = JSON.parse(localStorage.getItem("PartnerLogin")).id;
const currentUser = computed(() => store.state.user.currentUser);
const navLinks = ref([
  // { name: "Thông tin cá nhân", path: "/user/profile" },
  { name: "Thông tin doanh nghiệp", path: "/user/dashboard" },
]);

onMounted(() => {
  store.dispatch("fetchUserById", userId);
});
</script>
  
  <style scoped>
.container-slider {
  display: flex;
}
.sidebar {
  width: 402px;
  background: white;
  padding: 25px;
  border-right: 1px solid #eee;
  padding-top: 3rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 30px;
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.user-name {
  font-size: 20px;
}
.user-text {
  font-size: 17px;
  color: #666;
}

.nav-menu .nav-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  margin: 4px 0;
  border-radius: 8px;
  cursor: pointer;
  gap: 12px;
  color: #374151;
}

.nav-item.active {
  background-color: #fef2f2;
  color: #dc2626;
}

.nav-item span {
  font-size: 17px;
}

.icon-wrapper svg {
  width: 20px;
  height: 20px;
}

.content {
  flex: 1;
  padding: 24px;
}
</style>
  