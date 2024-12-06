<template>
  <div class="sidebar" :class="{ collapsed: isCollapsed }">
    <div class="menu-items">
      <div
        class="menu-item"
        v-for="link in navLinks"
        :key="link.path"
        :class="{ active: route.path === link.path }"
        @click="handleMenuItemClick(link.path)"
      >
        <svg
          v-if="link.icon === 'user'"
          viewBox="64 64 896 896"
          focusable="false"
          data-icon="user"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"
          ></path>
        </svg>
        <svg
          v-if="link.icon === 'cv'"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-book-minus w-4 h-4"
        >
          <path
            d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
          ></path>
          <path d="M9 10h6"></path>
        </svg>
        <svg
          v-if="link.icon === 'cv-lang'"
          fill-rule="evenodd"
          viewBox="64 64 896 896"
          focusable="false"
          data-icon="alipay-circle"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            d="M512 64c247.42 0 448 200.58 448 448S759.42 960 512 960 64 759.42 64 512 264.58 64 512 64m32.5 168c-69.67 0-86.06 16.84-86.72 39.08l-.02 1.43v46.62H291.45c-9.92 0-14.28 23.05-14.27 39.3 0 2.7 2.08 4.93 4.77 4.93h175.81v58.3h-116.5c-9.96 0-14.3 23.76-14.27 39.47a4.77 4.77 0 004.77 4.76h233.45c-4.53 41.06-15.43 77.59-30.72 109.32l-1.22 2.5-.32-.28c-60.24-28.47-120.43-52.57-194.4-52.57l-2.62.01c-84.98 1.11-144.71 56.5-145.91 127.04l-.02 1.22.02 2.13c1.24 70.4 63.56 126.45 148.52 126.45 61.25 0 116.38-16.85 163.46-45.02a138.58 138.58 0 0014.07-7.96 345.6 345.6 0 0050.3-41.16l9.45 6.35 12.46 8.32c57.53 38.26 113.76 72.62 169.86 79.27a142.62 142.62 0 0018.31 1.16c43.02 0 55-52.68 57.39-95.51l.14-2.84c.4-8.46-6.2-15.6-14.65-15.86-75.46-2.37-136.45-22.05-192-46.11l-6.27-2.75c35.15-56.8 56.66-121.81 57.15-186.66l.09-1.08c.4-5.51-4-10.2-9.52-10.2H549.33v-58.3h165.73c9.92 0 14.28-22.12 14.27-39.31a4.85 4.85 0 00-4.78-4.92H549.32v-82.35a4.8 4.8 0 00-4.83-4.78M328 583.85c54.63 0 107.08 22.41 158.1 52.19l5.76 3.4c-103.57 119.84-247.17 95.9-261.72 26.37a66.89 66.89 0 01-1.14-9.83l-.06-2.34.02-.9c.97-40.12 45.33-68.9 99.04-68.9"
          ></path>
        </svg>
        <svg
          v-if="link.icon === 'enterprise'"
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
        <svg
          v-if="link.icon === 'job'"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-notebook-pen w-4 h-4"
        >
          <path
            d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"
          ></path>
          <path d="M2 6h4"></path>
          <path d="M2 10h4"></path>
          <path d="M2 14h4"></path>
          <path d="M2 18h4"></path>
          <path
            d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"
          ></path>
        </svg>
        <svg
          v-if="link.icon === 'certificate'"
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
            d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"
          ></path>
          <path d="m9 12 2 2 4-4"></path>
        </svg>
        <svg
          v-if="link.icon === 'interview'"
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
            d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"
          ></path>
          <path d="m9 12 2 2 4-4"></path>
        </svg>
        <span class="overflow-hidden text-ellipsis whitespace-nowrap">{{
          link.name
        }}</span>
      </div>
    </div>
    <div class="collapse-btn" @click="toggleCollapse">
      <i class="fas fa-chevron-left" :class="{ rotated: isCollapsed }"
        ><AkChevronLeftSmall
      /></i>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { AkChevronLeftSmall } from "@kalimahapps/vue-icons";

import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

const router = useRouter();

const handleMenuItemClick = (path) => {
  activeItem.value = path;
  router.push(path);
};

const route = useRoute();

const isCollapsed = ref(false);
const activeItem = ref(null);

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};

const navLinks = ref([
  { name: "Quản lý user", path: "/admin/user", icon: "user" },
  { name: "Quản lý CV", path: "/admin/cv", icon: "cv" },
  { name: "CV LANGUAGE MANAGER", path: "/admin/cvlang", icon: "cv-lang" },
  { name: "Quản lý JOB", path: "/admin/job", icon: "job" },
  { name: "ENTERPRISE", path: "/admin/enterprise", icon: "enterprise" },
  { name: "CERTIFICATE", path: "/admin/certificate", icon: "certificate" },
  { name: "INTERVIEW", path: "/admin/interview", icon: "interview" },
]);
</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  background: #1a237e;
  color: white;
  transition: all 0.3s ease;
  position: relative;
  padding: 1rem 0;
}

.collapsed {
  width: 60px;
}

.logo {
  padding: 1rem;
  text-align: center;
  margin-bottom: 2rem;
}

.logo img {
  width: 80px;
  height: auto;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ff4081;
  margin-top: 0.5rem;
}

.slogan {
  font-size: 0.8rem;
  color: #b0bec5;
}

.menu-items {
  padding: 0 0.5rem;
}

.menu-item {
  padding: 0.8rem 1rem;
  margin: 0.2rem 0;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  color: #b0bec5;
  gap: 10px;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.menu-item.active {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.menu-item i {
  margin-right: 1rem;
  width: 20px;
  text-align: center;
}

.menu-item span {
  white-space: nowrap;
  opacity: 1;
  transition: opacity 0.3s ease;
}

.collapsed .menu-item span {
  opacity: 0;
  width: 0;
  display: none;
}

.has-submenu .menu-item-main {
  display: flex;
  align-items: center;
  width: 100%;
}

.arrow {
  margin-left: auto;
  transition: transform 0.3s ease;
}

.collapsed .arrow {
  display: none;
}
.menu-item img {
  width: 10%;
  color: grey;
}
.collapse-btn {
  position: absolute;
  bottom: 1rem;
  right: -12px;
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #1a237e;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.collapse-btn i {
  transition: transform 0.3s ease;
}

.collapse-btn i.rotated {
  transform: rotate(180deg);
}

/* Animation for collapsing/expanding */
.collapsed .menu-item {
  padding: 0.8rem;
  justify-content: center;
}

.collapsed .menu-item i {
  margin-right: 0;
}

.menu-item.active {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-weight: bold;
  border-left: 4px solid #ff4081; /* Thêm viền để đánh dấu */
}
</style>
