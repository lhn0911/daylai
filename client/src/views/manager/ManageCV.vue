<template>
  <div class="cv-upload-container">
    <div class="header">
      <h2 class="title">CV đã tải lên</h2>
      <button class="upload-btn" @click="showUploadModal = true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        Tải CV lên
      </button>
    </div>
    <p class="subtitle">Hãy xem và cập nhật CV mới nhất của bạn.</p>

    <!-- Render danh sách CV của người dùng đăng nhập -->
    <div class="cv-grid">
      <div v-for="cv in userCvs" :key="cv?.id" class="cv-card">
        <div class="cv-content">
          <div class="cv-header1">
            <h3 class="cv-title">
              [CV] Front-End Developer - {{ cv?.userId }}.PDF
            </h3>
            <p class="cv-date">Cập nhật lần cuối: {{ cv?.update_at }}</p>
            <p class="cv-language">
              Ngôn ngữ: {{ getLanguageName(cv?.languageId) }}
            </p>
            <p class="cv-title">Tiêu đề: {{ cv?.title }}</p>
          </div>
          <div class="cv-actions">
            <button class="action-btn" @click="viewCv(cv?.pdfUrl)">
              Xem CV
            </button>
            <button class="action-btn" @click="downloadCv(cv?.pdfUrl)">
              Tải xuống
            </button>
            <button class="delete-btn" @click="removeCv(cv?.id)">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.51184 1.85843L7.61483 2.46701V2.65188C6.52602 2.6024 5.43717 2.59241 4.3495 2.63561L4.37324 2.49095L4.47817 1.85137C4.52148 1.58877 4.55692 1.43762 4.64368 1.33072C4.70272 1.25798 4.85469 1.125 5.33983 1.125H6.64983C7.13093 1.125 7.28507 1.26141 7.3468 1.33894C7.43632 1.45137 7.47078 1.6066 7.51135 1.85546L7.51134 1.85546L7.51184 1.85843ZM1.51362 3.11261C1.51337 3.11264 1.51311 3.11266 1.51286 3.11269L1.51362 3.11261Z"
                  fill="white"
                  stroke="white"
                />
                <path
                  d="M9.61585 4.07C9.49585 3.945 9.33085 3.875 9.16085 3.875H2.84085C2.67085 3.875 2.50085 3.945 2.38585 4.07C2.27085 4.195 2.20585 4.365 2.21585 4.54L2.52585 9.67C2.58085 10.43 2.65085 11.38 4.39585 11.38H7.60585C9.35085 11.38 9.42085 10.435 9.47585 9.67L9.78585 4.545C9.79585 4.365 9.73085 4.195 9.61585 4.07ZM6.83085 8.875H5.16585C4.96085 8.875 4.79085 8.705 4.79085 8.5C4.79085 8.295 4.96085 8.125 5.16585 8.125H6.83085C7.03585 8.125 7.20585 8.295 7.20585 8.5C7.20585 8.705 7.03585 8.875 6.83085 8.875ZM7.25085 6.875H4.75085C4.54585 6.875 4.37585 6.705 4.37585 6.5C4.37585 6.295 4.54585 6.125 4.75085 6.125H7.25085C7.45585 6.125 7.62585 6.295 7.62585 6.5C7.62585 6.705 7.45585 6.875 7.25085 6.875Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Upload Modal -->
    <div v-if="showUploadModal" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <h3 class="modal-title">Tải CV của bạn lên</h3>
          <button class="modal-close" @click="closeModal">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div class="modal-content">
          <div class="form-group">
            <label>PDF Tài liệu</label>
            <div class="file-input-container">
              <button class="file-select-btn" @click="triggerFileInput">
                Chọn tệp
              </button>
              <span class="file-name">{{
                selectedFileName || "Không có tệp nào được chọn"
              }}</span>
              <input
                type="file"
                ref="fileInputRef"
                class="file-input"
                @change="handleFileChange"
                accept=".pdf"
                hidden
              />
            </div>
          </div>

          <div class="form-group">
            <label>Ngôn ngữ</label>
            <select v-model="selectedLanguage" class="language-select">
              <option value="">Chọn ngôn ngữ</option>
              <option
                v-for="lang in languages"
                :key="lang.id"
                :value="lang.id"
                v-show="lang.status === 'active'"
              >
                {{ lang.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label>Tiêu đề</label>
            <input
              type="text"
              v-model="cvTitle"
              class="title-input"
              placeholder="Nhập tiêu đề CV"
            />
          </div>

          <button
            class="upload-submit-btn"
            @click="uploadFile"
            :disabled="!selectedFile || !selectedLanguage || !cvTitle"
          >
            Tải lên
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../firebase/config";
import Swal from "sweetalert2";

const store = useStore();
const showUploadModal = ref(false);
const selectedFile = ref(null);
const selectedFileName = ref("");
const selectedLanguage = ref("");
const cvTitle = ref("");
const fileInputRef = ref(null);
const d = new Date();
const languages = computed(() => store.getters.allLanguages);
const cvs = computed(() => store.getters.allCvs);

const getLanguageName = (languageId) => {
  const language = languages.value.find((lang) => lang.id === languageId);
  return language ? language.name : languageId;
};

const viewCv = (pdfUrl) => {
  window.open(pdfUrl, "_blank");
};

const downloadCv = (pdfUrl) => {
  const link = document.createElement("a");
  link.href = pdfUrl;
  link.download = "CV.pdf";
  link.click();
};

// Get logged-in user ID from local storage
const userLogin = JSON.parse(localStorage.getItem("UserLogin"));
const userId = userLogin ? userLogin.id : null;

// Filter CVs to display only those belonging to the logged-in user
const userCvs = computed(() => {
  return cvs.value.filter((cv) => cv?.userId === userId);
});

onMounted(async () => {
  await Promise.all([
    store.dispatch("fetchAllCvs"),
    store.dispatch("fetchAllLanguages"),
  ]);
});

const removeCv = (cvId) => {
  store.dispatch("deleteCv", cvId);
};

const triggerFileInput = () => {
  if (fileInputRef.value) {
    fileInputRef.value.click();
  }
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    selectedFileName.value = file.name;
  }
};

const uploadFile = async () => {
  if (selectedFile.value && selectedLanguage.value && cvTitle.value) {
    const filePath = `cvs/${selectedFile.value.name}`;
    const storageReference = storageRef(storage, filePath);

    try {
      const uploadResult = await uploadBytes(
        storageReference,
        selectedFile.value
      );
      const url = await getDownloadURL(uploadResult.ref);

      if (!userId) {
        Swal.fire({
          icon: "error",
          title: "Không tìm thấy người dùng",
          text: "Vui lòng đăng nhập lại.",
          showConfirmButton: true,
          confirmButtonText: "OK",
        });
        return;
      }

      const newCv = {
        pdfUrl: url,
        languageId: selectedLanguage.value,
        title: cvTitle.value,
        update_at: `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`,
        status: "active",
        enterpriseId: userId,
        userId: userId,
      };

      await store.dispatch("createCv", newCv);

      Swal.fire({
        icon: "success",
        title: "Tải lên thành công!",
        showConfirmButton: true,
        confirmButtonText: "OK",
      });
      await store.dispatch("fetchAllCvs");
      resetForm();
    } catch (error) {
      console.error("Lỗi tải lên:", error);
      Swal.fire({
        icon: "error",
        title: "Tải lên thất bại",
        text: "Vui lòng thử lại.",
        showConfirmButton: true,
        confirmButtonText: "OK",
      });
    }
  }
};

const resetForm = () => {
  selectedFile.value = null;
  selectedFileName.value = "";
  selectedLanguage.value = "";
  cvTitle.value = "";
  showUploadModal.value = false;
};

const closeModal = () => {
  resetForm();
};
</script>


<style scoped>
.cv-upload-container {
  padding: 20px;
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
}

.subtitle {
  color: #666;
  margin-bottom: 24px;
}

.upload-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #fef2f2;
  color: #dc2626;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}

.cv-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}

.cv-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.7)
    ),
    url("https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645-t.jpg");
  background-size: cover;
  background-position: center;
  min-height: 250px;
  padding: 20px;
  color: white;
}

.cv-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.cv-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  margin-bottom: 8px;
}

.cv-date {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 4px;
}

.cv-language {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
}
.cv-actions {
  display: flex;
  gap: 8px;
  margin-top: 20px;
}

.action-btn {
  flex: 1;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.delete-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.5rem;
  transition: background-color 0.2s;
}

.delete-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  margin: 20px;
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111;
}

.modal-close {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 4px;
}

.modal-content {
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-weight: 500;
  margin-bottom: 8px;
  color: #111;
}

.file-input-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.file-select-btn {
  background-color: #f3f4f6;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}

.file-name {
  color: #666;
  font-size: 0.875rem;
}

.language-select,
.title-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 0.875rem;
  color: #111;
}

.language-select:focus,
.title-input:focus {
  outline: none;
  border-color: #dc2626;
  ring: 2px solid #fecaca;
}

.upload-submit-btn {
  width: 100%;
  background-color: #dc2626;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.upload-submit-btn:hover {
  background-color: #b91c1c;
}

.upload-submit-btn:disabled {
  background-color: #e5e7eb;
  cursor: not-allowed;
}
</style>