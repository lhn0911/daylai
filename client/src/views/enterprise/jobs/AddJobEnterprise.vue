<template>
  <div>
    <!-- Modal Add Job -->
    <div class="p-6 w-[90%] mx-auto bg-white rounded-lg shadow-md">
      <div class="flex items-center gap-1">
        <button @click="closeModal" class="mt-[5px]">
          <iconify-icon
            icon="weui:back-filled"
            style="color: #2d2c2c"
          ></iconify-icon>
        </button>
        <h2 class="text-xl font-bold">Thêm công việc mới</h2>
      </div>

      <form @submit.prevent="addJob">
        <!-- Form Title -->
        <div class="mb-6">
          <label class="font-medium mb-1 flex items-center gap-1">
            <iconify-icon
              icon="bxs:edit-alt"
              style="color: #bc2228"
            ></iconify-icon>
            <p>Tiêu đề tuyển dụng</p>
          </label>
          <div class="flex items-center">
            <span
              class="iconify mr-2 text-gray-500"
              data-icon="mdi:briefcase-outline"
            ></span>
            <input
              type="text"
              class="w-full border border-gray-300 rounded-lg p-2"
              v-model="jobForm.title"
              placeholder="Tên nội dung tuyển dụng"
            />
          </div>
        </div>

        <!-- Form Other Fields -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label class="block font-medium mb-1">Số lượng tuyển</label>
            <input
              type="number"
              class="w-full border border-gray-300 rounded-lg p-2"
              v-model="jobForm.quantity"
              placeholder="Số Lượng"
            />
          </div>
          <div>
            <label class="block font-medium mb-1">Kinh nghiệm</label>
            <select
              class="w-full border border-gray-300 rounded-lg p-2"
              v-model="jobForm.exp"
            >
              <option value="">Chọn kinh nghiệm</option>
              <option v-for="exp in experiences" :key="exp" :value="exp">
                {{ exp }}
              </option>
            </select>
          </div>
        </div>

        <!-- Giới tính -->
        <div class="mb-6">
          <label class="block font-medium mb-1">Giới tính</label>
          <select
            class="w-full border border-gray-300 rounded-lg p-2"
            v-model="jobForm.gender"
          >
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Khác">Không yêu cầu</option>
          </select>
        </div>

        <!-- Cấp Bậc -->
        <div class="mb-6">
          <label class="block font-medium mb-1">Loại công việc</label>
          <div class="flex flex-col">
            <div v-for="level in levels" :key="level" class="flex items-center">
              <input type="checkbox" :value="level" v-model="selectedLevels" />
              <label>{{ level }}</label>
            </div>
          </div>
        </div>

        <!-- Salary and Location -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label class="block font-medium mb-1">Loại tiền tệ</label>
            <select
              class="w-full border border-gray-300 rounded-lg p-2"
              v-model="jobForm.currencyType"
            >
              <option value="VND">VNĐ</option>
              <option value="USD">USD</option>
            </select>
          </div>
          <div>
            <label class="block font-medium mb-1">Mức Lương</label>
            <input
              type="text"
              class="w-full border border-gray-300 rounded-lg p-2"
              v-model="jobForm.salary"
              placeholder="Nhập mức lương"
            />
          </div>
        </div>

        <!-- Job Description -->
        <div class="mb-6">
          <label class="font-medium mb-1 flex items-center gap-1">
            <iconify-icon
              icon="bxs:edit-alt"
              style="color: #bc2228"
            ></iconify-icon>
            <p>Mô tả công việc</p>
          </label>
          <div class="flex items-center">
            <span
              class="iconify mr-2 text-gray-500"
              data-icon="mdi:briefcase-outline"
            ></span>
            <input
              type="text"
              class="w-full border border-gray-300 rounded-lg p-2"
              v-model="jobForm.requirements"
              placeholder="Mô tả nội dung tuyển dụng"
            />
          </div>
        </div>

        <!-- Job Requirements -->
        <div class="mb-6">
          <label class="font-medium mb-1 flex items-center gap-1">
            <iconify-icon
              icon="bxs:edit-alt"
              style="color: #bc2228"
            ></iconify-icon>
            <p>Yêu cầu công việc</p>
          </label>
          <div class="flex items-center">
            <span
              class="iconify mr-2 text-gray-500"
              data-icon="mdi:briefcase-outline"
            ></span>
            <input
              type="text"
              class="w-full border border-gray-300 rounded-lg p-2"
              v-model="jobForm.des"
              placeholder="Yêu cầu nội dung tuyển dụng"
            />
          </div>
        </div>

        <!-- Benefits -->
        <div class="mb-6">
          <label class="font-medium mb-1 flex items-center gap-1">
            <iconify-icon
              icon="bxs:edit-alt"
              style="color: #bc2228"
            ></iconify-icon>
            <p>Quyền lợi</p>
          </label>
          <div class="flex items-center">
            <span
              class="iconify mr-2 text-gray-500"
              data-icon="mdi:briefcase-outline"
            ></span>
            <input
              type="text"
              class="w-full border border-gray-300 rounded-lg p-2"
              v-model="jobForm.benefits"
              placeholder="Yêu cầu nội dung tuyển dụng"
            />
          </div>
        </div>

        <!-- Working Hours -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label class="block font-medium mb-1">Thời gian làm việc</label>
            <input
              type="text"
              class="w-full border border-gray-300 rounded-lg p-2"
              v-model="jobForm.workingHours"
              placeholder="Nhập thời gian làm việc"
            />
          </div>
        </div>

        <!-- Application Deadline -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label class="block font-medium mb-1">Hạn nhận CV</label>
            <input
              type="date"
              class="w-full border border-gray-300 rounded-lg p-2"
              v-model="jobForm.expiredAt"
              placeholder="Nhập thời gian làm việc"
            />
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex gap-2 pt-[30px] justify-end">
          <button
            class="w-[161px] bg-[#DDDDDD] text-[#111111] font-semibold p-2 rounded-lg hover:bg-blue-600"
            @click="closeModal"
          >
            <span
              class="iconify mr-2"
              data-icon="mdi:content-save-outline"
            ></span>
            Huỷ
          </button>
          <button
            type="submit"
            class="w-[213px] bg-[#AB1F24] text-white font-semibold p-2 rounded-lg hover:bg-blue-600"
          >
            <span
              class="iconify mr-2"
              data-icon="mdi:content-save-outline"
            ></span>
            Thêm Công Việc
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import router from "@/routes";
import enterprise from "@/store/enterprise/Enterprise";
import { ref } from "vue";
import { useStore } from "vuex";
import Swal from "sweetalert2"; // Make sure to install sweetalert2 via npm

const store = useStore();
const enterpriseId = JSON.parse(localStorage.getItem("enterpriseId"));

// Existing data remains the same
const experiences = ["1 year", "2 years", "3 years", "5 years"];
const levels = ["Internship", "Fresher", "Junior", "Senior", "Middle"];

const jobForm = ref({
  enterpriseId: enterpriseId,
  title: "",
  salary: "",
  exp: "",
  image: "",
  gender: "",
  quantity: "",
  currencyType: "",
  workingHours: "",
  expiredAt: "",
  requirements: "",
  des: "",
  type: "Toàn thời gian",
  benefits: "",
  location: "",
  remainingPositions: "",
  status: "chờ xác nhận",
  createAt: new Date().toISOString(),
  rank: "Nhân viên",
  isSaved: false,
});

const selectedLevels = ref([]);

function closeModal() {
  router.push("/enterprise/jobs");
}

// Validation function
function validateForm() {
  // Check required fields
  const requiredFields = [
    { field: "title", message: "Vui lòng nhập tiêu đề tuyển dụng" },
    { field: "quantity", message: "Vui lòng nhập số lượng tuyển" },
    { field: "exp", message: "Vui lòng chọn kinh nghiệm" },
    { field: "gender", message: "Vui lòng chọn giới tính" },
    { field: "currencyType", message: "Vui lòng chọn loại tiền tệ" },
    { field: "salary", message: "Vui lòng nhập mức lương" },
    { field: "requirements", message: "Vui lòng nhập mô tả công việc" },
    { field: "des", message: "Vui lòng nhập yêu cầu công việc" },
    { field: "benefits", message: "Vui lòng nhập quyền lợi" },
    { field: "workingHours", message: "Vui lòng nhập thời gian làm việc" },
    { field: "expiredAt", message: "Vui lòng chọn hạn nhận CV" },
  ];

  for (const { field, message } of requiredFields) {
    if (!jobForm.value[field]) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: message,
        confirmButtonText: "Đóng",
      });
      return false;
    }
  }

  // Check if at least one level is selected
  if (selectedLevels.value.length === 0) {
    Swal.fire({
      icon: "error",
      title: "Lỗi",
      text: "Vui lòng chọn ít nhất một loại công việc",
      confirmButtonText: "Đóng",
    });
    return false;
  }

  return true;
}

// Modified add job function with validation
async function addJob() {
  // Validate form before submission
  if (!validateForm()) {
    return;
  }

  // Confirm submission
  const result = await Swal.fire({
    icon: "question",
    title: "Xác nhận",
    text: "Bạn có chắc chắn muốn thêm công việc này?",
    showCancelButton: true,
    confirmButtonText: "Có, thêm ngay",
    cancelButtonText: "Huỷ",
  });

  // If user confirms
  if (result.isConfirmed) {
    try {
      const newJob = {
        ...jobForm.value,
        levels: selectedLevels.value,
      };

      // Dispatch action to add job
      await store.dispatch("addJob", newJob);

      // Show success message
      await Swal.fire({
        icon: "success",
        title: "Thành công",
        text: "Công việc đã được thêm mới thành công!",
        confirmButtonText: "Đóng",
      });

      // Navigate to jobs list
      router.push("/enterprise/jobs");
    } catch (error) {
      // Handle any errors during job submission
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Không thể thêm công việc. Vui lòng thử lại.",
        confirmButtonText: "Đóng",
      });
      console.error("Job submission error:", error);
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}

.header h1 {
  flex-grow: 1;
  text-align: center;
}

.content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.section {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 4px;
}

.section h2 {
  margin-top: 0;
}

.row {
  display: flex;
  gap: 1rem;
}

.field {
  flex: 1;
}

.field label {
  display: block;
  margin-bottom: 0.5rem;
}

.field input,
.field select,
.field textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.footer button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.footer button.primary {
  background-color: #007bff;
  color: #fff;
}
</style>