<template>
  <div class="header">
    <div class="header-left">
      <div class="logo">
        <img
          src="../../images/logo.png"
          alt="RK Jobs Logo"
          class="logo-image"
          @click="gotoHome"
        />
      </div>
      <div class="nav-links">
        <div class="nav-link job-dropdown" @click="toggleJobDropdown">
          Việc làm
          <div v-if="isJobDropdownOpen" class="dropdown-menu">
            <div class="dropdown-item" @click="viewSavedJobs">
              Việc làm đã lưu
            </div>
            <div class="dropdown-item" @click="viewAllJobs">
              Tất cả việc làm
            </div>
          </div>
        </div>
        <a class="nav-link" @click="userProfile">Hồ sơ & CV</a>
        <a class="nav-link" @click="aboutMe">Về chúng tôi</a>
        <a class="nav-link" @click="contact">Liên hệ</a>
      </div>
    </div>
    <div class="header-right">
      <div class="language-selector" @click="toggleDropdown">
        <img
          :src="
            selectedLanguage === 'VN'
              ? 'https://media.istockphoto.com/id/1215463190/vector/vietnam-flag.jpg?s=612x612&w=0&k=20&c=Xk--hZ18G0ze17OXJQya36AZW8iRWkSYl0KBwtnKaU4='
              : 'https://images.vexels.com/media/users/3/163966/isolated/preview/6ecbb5ec8c121c0699c9b9179d6b24aa-england-flag-language-icon-circle.png?w=360'
          "
          :alt="selectedLanguage"
          class="flag"
        />
        {{ selectedLanguage }}
        <div v-if="isDropdownOpen" class="dropdown-menu">
          <div class="dropdown-item" @click="handleLanguageChange('VN')">
            <img src="../../assets/VN.png" alt="VN" class="flag" />
            VN
          </div>

          <div class="dropdown-item" @click="handleLanguageChange('EN')">
            <img
              src="https://images.vexels.com/media/users/3/163966/isolated/preview/6ecbb5ec8c121c0699c9b9179d6b24aa-england-flag-language-icon-circle.png?w=360"
              alt="EN"
              class="flag"
            />
            EN
          </div>
        </div>
        <span class="arrow">
          <img src="../../images/arrow-down.png" alt="" />
        </span>
      </div>

      <div class="user-signOut" v-if="isUserLoggedIn">
        <span @click="toggleUserDropdown" class="username">
          {{ userLogin.userName || "Chào bạn!" }}
        </span>
        <div v-if="isUserDropdownOpen" class="user-dropdown">
          <div
            v-if="userRole === 'user'"
            class="dropdown-item"
            @click="goToProfile"
          >
            Thông tin cá nhân
          </div>
          <!-- Menu riêng cho Partner -->
          <div
            v-if="userRole === 'partner'"
            class="dropdown-item"
            @click="goToEnterprise"
          >
            Thông tin doanh nghiệp
          </div>
          <div class="dropdown-item" @click="handleLogout">Đăng xuất</div>
        </div>
      </div>

      <div v-else class="auth-buttons">
        <button @click="signUpUser" class="signup-button">Đăng ký</button>
        <button @click="loginUser" class="login-button">Đăng nhập</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const isDropdownOpen = ref(false);
const selectedLanguage = ref("VN");
const isJobDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const toggleJobDropdown = () => {
  isJobDropdownOpen.value = !isJobDropdownOpen.value;
};

const handleLanguageChange = (language) => {
  selectedLanguage.value = language;
  isDropdownOpen.value = false;
};

const signUpUser = () => {
  router.push("/registerUser");
};

const loginUser = () => {
  router.push("/loginUser");
};

const userLogin =
  JSON.parse(localStorage.getItem("UserLogin")) ||
  JSON.parse(localStorage.getItem("PartnerLogin"));

const isUserLoggedIn = ref(userLogin !== null);

// Hàm đăng xuất
const handleLogout = () => {
  localStorage.removeItem("UserLogin");
  localStorage.removeItem("PartnerLogin");
  isUserLoggedIn.value = false;
  router.push("/loginUser");
};

const isUserDropdownOpen = ref(false);

const toggleUserDropdown = () => {
  isUserDropdownOpen.value = !isUserDropdownOpen.value;
};

const goToProfile = () => {
  router.push(userRole === "partner" ? "/partner/profile" : "/user/profile");
  isUserDropdownOpen.value = false;
};

// Xác định vai trò của người dùng
const userRole = userLogin?.role || null;

const gotoHome = () => {
  router.push("/");
};

const goToEnterprise = () => {
  router.push("/user/dashboard");
};

const userProfile = () => {
  router.push(userRole === "user" ? "/user/profile" : "/");
};

const aboutMe = () => {
  router.push("/aboutUs");
};

const contact = () => {
  router.push("/contact");
};

// New methods for job dropdown
const viewSavedJobs = () => {
  router.push("/jobSaved");
};

const viewAllJobs = () => {
  router.push("/jobList");
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  height: 80px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  top: 0;
  z-index: 50;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 100px;
}

.logo {
  position: relative;
  left: 32px;
}

.logo-image {
  height: 32px;
  width: 138px;
}

.arrow img {
  height: 16px;
  width: 16px;
}

.nav-links {
  display: flex;
  gap: 40px;
  font-weight: 500;
}

.nav-link {
  color: #333;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #9e1c3f;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
  right: 32px;
}

.language-selector {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
}

.flag {
  width: 25px;
  height: 19px;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  z-index: 10;
}

.dropdown-item {
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}

.auth-buttons {
  display: flex;
  gap: 10px;
}

.signup-button {
  padding: 8px 16px;
  border: 1px solid #666;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.signup-button:hover {
  background-color: #f0f0f0;
}

.login-button {
  padding: 8px 16px;
  background-color: #9e1c3f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #7e1632;
}

.user-signOut {
  display: flex;
  align-items: center;
  gap: 20px;
}

.logout-button {
  padding: 8px 16px;
  background-color: #9e1c3f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-button:hover {
  background-color: #7e1632;
}

.user-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  z-index: 10;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.user-dropdown .dropdown-item {
  cursor: pointer;
  transition: background-color 0.3s;
}

.user-dropdown .dropdown-item:hover {
  background-color: #f0f0f0;
}

.username {
  cursor: pointer;
  font-weight: bold;
}

/* Custom styles for Việc làm dropdown */
.job-dropdown {
  position: relative;
}

.job-dropdown .dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 200px;
  z-index: 10;
}

.job-dropdown .dropdown-item {
  padding: 8px;
  cursor: pointer;
}

.job-dropdown .dropdown-item:hover {
  background-color: #f0f0f0;
}
</style>
