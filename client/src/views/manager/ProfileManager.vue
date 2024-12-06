<template>
  <div>
    <div class="profile-container" v-if="user">
      <div class="profile-content">
        <!-- Profile Image Section -->
        <div class="profile-image-section">
          <b class="profile-image-title">Ảnh đại diện</b>
          <div class="profile-image-container" @click="showUpdateAvatarModal">
            <img :src="user.avatar" alt="Profile Photo" class="profile-photo" />
            <div class="profile-icon-container">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/ptit-k5.appspot.com/o/avarta.png?alt=media&token=ebb63796-12c9-44c4-ba02-f26c8831fcd4"
                alt=""
                class="profile-icon"
              />
            </div>
          </div>
        </div>

        <!-- Profile Form Section -->
        <div class="profile-form-section">
          <b class="profile-title">Cập nhật thông tin cá nhân</b>
          <p class="profile-manage">
            Quản lý thông tin hồ sơ để bảo mật tài khoản
          </p>
          <form class="profile-form" @submit.prevent="handleUpdate">
            <div class="form-profile">
              <div class="form-left">
                <label for="username">Tên đăng nhập</label>
                <div class="input-wrapper">
                  <input
                    type="text"
                    id="username"
                    v-model="user.userName"
                    disabled
                  />
                </div>

                <label for="email">Email</label>
                <div class="input-wrapper">
                  <input
                    type="email"
                    id="email"
                    v-model="user.email"
                    disabled
                  />
                </div>

                <label for="phone">Số điện thoại</label>
                <div class="input-wrapper">
                  <input
                    type="text"
                    id="phone"
                    v-model="user.phone"
                    @input="validatePhone"
                  />
                  <svg
                    class="input-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 14.6667H2C1.72667 14.6667 1.5 14.44 1.5 14.1667C1.5 13.8933 1.72667 13.6667 2 13.6667H14C14.2733 13.6667 14.5 13.8933 14.5 14.1667C14.5 14.44 14.2733 14.6667 14 14.6667Z"
                      fill="#2D2C2C"
                    />
                    <path
                      d="M12.6804 2.32C11.387 1.02667 10.1204 0.993336 8.79371 2.32L7.98704 3.12667C7.92037 3.19334 7.89371 3.3 7.92038 3.39334C8.42704 5.16 9.84038 6.57334 11.607 7.08C11.6337 7.08667 11.6604 7.09334 11.687 7.09334C11.7604 7.09334 11.827 7.06667 11.8804 7.01334L12.6804 6.20667C13.3404 5.55334 13.6604 4.92 13.6604 4.28C13.667 3.62 13.347 2.98 12.6804 2.32Z"
                      fill="#2D2C2C"
                    />
                    <path
                      d="M10.4075 7.68666C10.2142 7.59332 10.0275 7.49999 9.84753 7.39333C9.70086 7.30666 9.56086 7.21333 9.42086 7.11333C9.30753 7.03999 9.1742 6.93333 9.04753 6.82666C9.0342 6.81999 8.98753 6.77999 8.9342 6.72666C8.7142 6.53999 8.46753 6.29999 8.24753 6.03333C8.22753 6.01999 8.1942 5.97333 8.14753 5.91333C8.08086 5.83333 7.96753 5.69999 7.86753 5.54666C7.78753 5.44666 7.6942 5.29999 7.60753 5.15333C7.50086 4.97333 7.40753 4.79333 7.3142 4.60666C7.19182 4.34443 6.84765 4.26653 6.64304 4.47115L2.8942 8.21999C2.80753 8.30666 2.72753 8.47333 2.70753 8.58666L2.34753 11.14C2.28086 11.5933 2.40753 12.02 2.68753 12.3067C2.92753 12.54 3.26086 12.6667 3.62086 12.6667C3.70086 12.6667 3.78086 12.66 3.86086 12.6467L6.42086 12.2867C6.54086 12.2667 6.70753 12.1867 6.78753 12.1L10.5426 8.34497C10.7431 8.14444 10.6677 7.79942 10.4075 7.68666Z"
                      fill="#2D2C2C"
                    />
                  </svg>

                  <span v-if="phoneError" class="error-message"
                    >Số điện thoại không hợp lệ.</span
                  >
                </div>

                <label for="address">Địa chỉ</label>
                <div class="input-wrapper">
                  <input
                    type="text"
                    id="address"
                    v-model="user.address"
                    placeholder="Nhập địa chỉ của bạn"
                  />
                </div>

                <label for="yearsOfExperience">Số năm kinh nghiệm</label>
                <div class="input-wrapper">
                  <input
                    type="number"
                    id="yearsOfExperience"
                    v-model.number="user.yearsOfExperience"
                    min="0"
                    max="50"
                    placeholder="Nhập số năm kinh nghiệm"
                  />
                </div>
              </div>
              <div class="form-right">
                <label for="firstName">Họ</label>
                <div class="input-wrapper">
                  <input type="text" id="firstName" v-model="user.firstName" />
                </div>

                <label for="lastName">Tên</label>
                <div class="input-wrapper">
                  <input type="text" id="lastName" v-model="user.lastName" />
                </div>

                <label for="birthdate">Ngày sinh</label>
                <div class="input-wrapper">
                  <input
                    type="date"
                    id="birthdate"
                    v-model="user.birthdate"
                    @change="validateBirthdate"
                  />
                  <span v-if="birthdateError" class="error-message"
                    >Ngày sinh không hợp lệ.</span
                  >
                </div>

                <label for="gender">Giới tính</label>
                <div class="input-wrapper">
                  <select id="gender" v-model="user.gender">
                    <option>Nam</option>
                    <option>Nữ</option>
                    <option>Khác</option>
                  </select>
                </div>

                <label for="level">Trình độ</label>
                <div class="input-wrapper">
                  <select id="level" v-model="user.level">
                    <option value="">Chọn trình độ</option>
                    <option>Junior</option>
                    <option>Mid-level</option>
                    <option>Senior</option>
                    <option>Lead</option>
                    <option>Expert</option>
                  </select>
                </div>
              </div>
            </div>
            <label for="skills">Kỹ năng</label>
            <div class="input-wrapper">
              <input
                type="text"
                id="skills"
                v-model="user.skills"
                placeholder="Nhập kỹ năng chuyên môn"
              />
            </div>
            <div class="form-actions">
              <button type="button" class="cancel-btn" @click="handleCancel">
                Hủy
              </button>
              <button type="submit" class="update-btn">Cập nhật</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div v-else>
      <p>Đang tải thông tin người dùng...</p>
    </div>

    <div v-if="showAvatarModal" class="modal">
      <div class="modal-content">
        <span class="close-button" @click="showAvatarModal = false"
          >&times;</span
        >
        <h2>Cập nhật ảnh đại diện</h2>
        <div class="modal-body">
          <input
            type="file"
            ref="avatarFileInput"
            @change="handleFileChange"
            accept="image/*"
          />
          <button @click="updateAvatar" :disabled="!selectedAvatar">
            Cập nhật
          </button>
          <span v-if="selectedAvatar" class="selected-file-name">
            {{ selectedAvatar.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import Swal from "sweetalert2";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../firebase/config";

const store = useStore();
const userId = computed(() => {
  try {
    const userLogin = JSON.parse(localStorage.getItem("UserLogin"));
    return userLogin ? userLogin.id : null;
  } catch (error) {
    console.error("Error parsing user login:", error);
    return null;
  }
});

const user = computed(() => store.state.user.currentUser || {});

const showAvatarModal = ref(false);
const selectedAvatar = ref(null);
const phoneError = ref(false);
const birthdateError = ref(false);
const ageError = ref(false);

onMounted(() => {
  if (userId.value) {
    store.dispatch("fetchUserById", userId.value);
  }
});

const validatePhone = () => {
  phoneError.value = !user.value.phone || !/^\d{10}$/.test(user.value.phone);
};

const validateBirthdate = () => {
  const today = new Date();
  const birthdate = new Date(user.value.birthdate);
  birthdateError.value = birthdate >= today;
};

const calculateAge = () => {
  if (!user.value.birthdate) return 0;

  const today = new Date();
  const birthdate = new Date(user.value.birthdate);
  let age = today.getFullYear() - birthdate.getFullYear();
  const monthDiff = today.getMonth() - birthdate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthdate.getDate())
  ) {
    age--;
  }

  ageError.value = age < 18;
  return age;
};

const handleUpdate = () => {
  validatePhone();
  validateBirthdate();
  const age = calculateAge();
  const maxExperience = age >= 20 ? age - 20 : 0;

  if (phoneError.value || birthdateError.value || ageError.value) {
    Swal.fire({
      icon: "error",
      title: "Lỗi Nhập Liệu",
      text: phoneError.value
        ? "Số điện thoại không hợp lệ."
        : birthdateError.value
        ? "Ngày sinh không hợp lệ."
        : "Bạn phải đủ 18 tuổi.",
    });
    return;
  }

  if (user.value.yearsOfExperience > maxExperience) {
    Swal.fire({
      icon: "error",
      title: "Lỗi Nhập Liệu",
      text: `Số năm kinh nghiệm không hợp lệ. Bạn chỉ có thể có tối đa ${maxExperience} năm kinh nghiệm.`,
    });
    return;
  }

  Swal.fire({
    title: "Xác nhận cập nhật",
    text: "Bạn có chắc chắn muốn cập nhật thông tin?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Có, cập nhật",
    cancelButtonText: "Hủy",
  }).then((result) => {
    if (result.isConfirmed) {
      const updatedUser = {
        ...user.value,
        firstName: (user.value.firstName || "").trim(),
        lastName: (user.value.lastName || "").trim(),
        phone: (user.value.phone || "").trim(),
        address: (user.value.address || "").trim(),
        language: (user.value.language || "").trim(),
        level: user.value.level || "",
        skills: (user.value.skills || "").trim(),
        gender: user.value.gender || "",
        birthdate: user.value.birthdate || "",
        yearsOfExperience: user.value.yearsOfExperience || 0,
        age: age,
        updateAt: new Date().toLocaleDateString(),
      };

      store
        .dispatch("updateUser", updatedUser)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Cập nhật thành công!",
            text: "Thông tin của bạn đã được cập nhật.",
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Lỗi",
            text: "Không thể cập nhật thông tin. Vui lòng thử lại.",
          });
          console.error("Update error:", error);
        });
    }
  });
};

const showUpdateAvatarModal = () => {
  showAvatarModal.value = true;
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    selectedAvatar.value = file;
  } else {
    Swal.fire({
      icon: "error",
      title: "Lỗi",
      text: "Vui lòng chọn file ảnh hợp lệ.",
    });
  }
};

const updateAvatar = async () => {
  if (!selectedAvatar.value) {
    Swal.fire({
      icon: "error",
      title: "Lỗi",
      text: "Vui lòng chọn ảnh.",
    });
    return;
  }

  const filePath = `avatars/${Date.now()}_${selectedAvatar.value.name}`;
  const storageReference = storageRef(storage, filePath);

  try {
    const uploadResult = await uploadBytes(
      storageReference,
      selectedAvatar.value
    );
    const url = await getDownloadURL(uploadResult.ref);

    const updatedUser = {
      ...user.value,
      avatar: url,
      updateAt: new Date().toLocaleDateString(),
    };

    await store.dispatch("updateUser", updatedUser);

    showAvatarModal.value = false;
    selectedAvatar.value = null;

    Swal.fire({
      icon: "success",
      title: "Cập nhật thành công!",
      text: "Ảnh đại diện đã được cập nhật.",
    });
  } catch (error) {
    console.error("Avatar upload error:", error);
    Swal.fire({
      icon: "error",
      title: "Lỗi",
      text: "Không thể tải ảnh lên. Vui lòng thử lại.",
    });
  }
};

const handleCancel = () => {
  store.dispatch("fetchUserById", userId.value);
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
}

.profile-icon {
  position: absolute;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-left: 230px;
  margin-top: -50px;
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
  gap: 15px;
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
  width: 100%;
  padding: 8px;
  font-size: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
}

.input-icon {
  position: absolute;
  right: 10px;
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
  width: 45px;
  height: 45px;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
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
