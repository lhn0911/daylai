<template>
  <div v-if="jobDetail" class="container">
    <div class="container-header">
      <div class="header-text">
        <p style="color: #a7a7a7">Trang chủ</p>
        <img src="../../images/arrow-right.png" alt="Arrow" />
        <p style="color: #a7a7a7" class="color-header">Việc làm</p>
        <img src="../../images/arrow-right.png" alt="Arrow" />
        <b>{{ jobDetail.title }}</b>
      </div>
    </div>
    <div class="main-content">
      <div class="job-detail" v-if="jobDetail">
        <div class="job-card">
          <img :src="jobDetail.image" alt="Job Image" class="job-image" />
          <div class="job-content">
            <h2>{{ jobDetail.title }}</h2>
            <div class="job-levels">
              <span
                v-for="level in jobDetail.levels"
                :key="level"
                :class="`level-tag ${level.toLowerCase()}`"
              >
                {{ level }}
              </span>
            </div>
            <p>Hạn nộp hồ sơ: {{ jobDetail.expiredAt }}</p>
          </div>
          <div class="action-buttons">
            <button
              v-if="userLogin"
              @click="handleApply"
              class="apply-button"
              :disabled="isApplied"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.16689 5.26667L13.2419 2.90834C16.4169 1.85001 18.1419 3.58334 17.0919 6.75834L14.7336 13.8333C13.1502 18.5917 10.5502 18.5917 8.96689 13.8333L8.26689 11.7333L6.16689 11.0333C1.40856 9.45001 1.40856 6.85834 6.16689 5.26667Z"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.4248 11.375L11.4081 8.38333"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              {{ isApplied ? "Đã ứng tuyển" : "Ứng tuyển ngay" }}
            </button>
            <button
              @click="savedJob(jobDetail)"
              v-if="userLogin"
              class="save-button"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.5165 17.3417C10.2332 17.4417 9.7665 17.4417 9.48317 17.3417C7.0665 16.5167 1.6665 13.075 1.6665 7.24168C1.6665 4.66668 3.7415 2.58334 6.29984 2.58334C7.8165 2.58334 9.15817 3.31668 9.99984 4.45001C10.8415 3.31668 12.1915 2.58334 13.6998 2.58334C16.2582 2.58334 18.3332 4.66668 18.3332 7.24168C18.3332 13.075 12.9332 16.5167 10.5165 17.3417Z"
                  stroke="#676767"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Lưu tin
            </button>
          </div>
        </div>
        <div class="job-info" v-if="jobDetail">
          <h3 class="section-title">Chi tiết tin tuyển dụng</h3>
          <div class="container-info">
            <b>Thông tin chung</b>
            <div class="general-info">
              <div class="meta-item1">
                <div class="meta-row">
                  <div class="meta-detal">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17 3.5H7C4 3.5 2 5 2 8.5V15.5C2 19 4 20.5 7 20.5H17C20 20.5 22 19 22 15.5V8.5C22 5 20 3.5 17 3.5ZM6.25 14.5C6.25 14.91 5.91 15.25 5.5 15.25C5.09 15.25 4.75 14.91 4.75 14.5V9.5C4.75 9.09 5.09 8.75 5.5 8.75C5.91 8.75 6.25 9.09 6.25 9.5V14.5ZM12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 9 12 9C13.66 9 15 10.34 15 12C15 13.66 13.66 15 12 15ZM19.25 14.5C19.25 14.91 18.91 15.25 18.5 15.25C18.09 15.25 17.75 14.91 17.75 14.5V9.5C17.75 9.09 18.09 8.75 18.5 8.75C18.91 8.75 19.25 9.09 19.25 9.5V14.5Z"
                        fill="#BC2228"
                      />
                    </svg>
                  </div>
                  <div class="meta-text">
                    Mức lương <br /><b>{{ jobDetail.salary }} triệu</b>
                  </div>
                </div>
                <div class="meta-row">
                  <div class="meta-detal">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21.09 6.98C20.24 6.04 18.82 5.57 16.76 5.57H16.52V5.53C16.52 3.85 16.52 1.77 12.76 1.77H11.24C7.48004 1.77 7.48004 3.86 7.48004 5.53V5.58H7.24004C5.17004 5.58 3.76004 6.05 2.91004 6.99C1.92004 8.09 1.95004 9.57 2.05004 10.58L2.06004 10.65L2.13749 11.4633C2.15176 11.6131 2.23242 11.7483 2.35831 11.8307C2.59812 11.9877 2.99946 12.2463 3.24004 12.38C3.38004 12.47 3.53004 12.55 3.68004 12.63C5.39004 13.57 7.27004 14.2 9.18004 14.51C9.27004 15.45 9.68004 16.55 11.87 16.55C14.06 16.55 14.49 15.46 14.56 14.49C16.6 14.16 18.57 13.45 20.35 12.41C20.41 12.38 20.45 12.35 20.5 12.32C20.8968 12.0958 21.3083 11.8195 21.6835 11.5488C21.7965 11.4673 21.8688 11.3413 21.8842 11.2027L21.9 11.06L21.95 10.59C21.96 10.53 21.96 10.48 21.97 10.41C22.05 9.4 22.03 8.02 21.09 6.98ZM13.09 13.83C13.09 14.89 13.09 15.05 11.86 15.05C10.63 15.05 10.63 14.86 10.63 13.84V12.58H13.09V13.83ZM8.91004 5.57V5.53C8.91004 3.83 8.91004 3.2 11.24 3.2H12.76C15.09 3.2 15.09 3.84 15.09 5.53V5.58H8.91004V5.57Z"
                        fill="#BC2228"
                      />
                      <path
                        d="M20.8733 13.7342C21.2269 13.5659 21.6342 13.8462 21.5988 14.2362L21.2398 18.19C21.0298 20.19 20.2098 22.23 15.8098 22.23H8.18984C3.78984 22.23 2.96984 20.19 2.75984 18.2L2.41913 14.4522C2.38409 14.0667 2.78205 13.7867 3.13468 13.9463C4.2741 14.4618 6.37724 15.3764 7.67641 15.7167C7.84072 15.7597 7.97361 15.8773 8.04556 16.0312C8.65253 17.3293 9.96896 18.02 11.8698 18.02C13.752 18.02 15.085 17.3027 15.694 16.0014C15.766 15.8474 15.8991 15.7298 16.0635 15.6866C17.443 15.3236 19.6816 14.3012 20.8733 13.7342Z"
                        fill="#BC2228"
                      />
                    </svg>
                  </div>
                  <div class="meta-text">
                    Hình thức làm việc <br /><b>{{ jobDetail.type }}</b>
                  </div>
                </div>
                <div class="meta-row">
                  <div class="meta-detal">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17 3.5H7C4 3.5 2 5 2 8.5V15.5C2 19 4 20.5 7 20.5H17C20 20.5 22 19 22 15.5V8.5C22 5 20 3.5 17 3.5ZM6.25 14.5C6.25 14.91 5.91 15.25 5.5 15.25C5.09 15.25 4.75 14.91 4.75 14.5V9.5C4.75 9.09 5.09 8.75 5.5 8.75C5.91 8.75 6.25 9.09 6.25 9.5V14.5ZM12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 9 12 9C13.66 9 15 10.34 15 12C15 13.66 13.66 15 12 15ZM19.25 14.5C19.25 14.91 18.91 15.25 18.5 15.25C18.09 15.25 17.75 14.91 17.75 14.5V9.5C17.75 9.09 18.09 8.75 18.5 8.75C18.91 8.75 19.25 9.09 19.25 9.5V14.5Z"
                        fill="#BC2228"
                      />
                    </svg>
                  </div>
                  <div class="meta-text">
                    Giới tính <br /><b>{{ jobDetail.gender }}</b>
                  </div>
                </div>
              </div>

              <div class="meta-item1">
                <div class="meta-row">
                  <div class="meta-detal">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 2C6.38 2 4.25 4.13 4.25 6.75C4.25 9.32 6.26 11.4 8.88 11.49C8.96 11.48 9.04 11.48 9.1 11.49C9.12 11.49 9.13 11.49 9.15 11.49C9.16 11.49 9.16 11.49 9.17 11.49C11.73 11.4 13.74 9.32 13.75 6.75C13.75 4.13 11.62 2 9 2Z"
                        fill="#BC2228"
                      />
                      <path
                        d="M14.08 14.15C11.29 12.29 6.73996 12.29 3.92996 14.15C2.65996 15 1.95996 16.15 1.95996 17.38C1.95996 18.61 2.65996 19.75 3.91996 20.59C5.31996 21.53 7.15996 22 8.99996 22C10.84 22 12.68 21.53 14.08 20.59C15.34 19.74 16.04 18.6 16.04 17.36C16.03 16.13 15.34 14.99 14.08 14.15Z"
                        fill="#BC2228"
                      />
                      <path
                        d="M19.9899 7.34C20.1499 9.28 18.7699 10.98 16.8599 11.21C16.8499 11.21 16.8499 11.21 16.8399 11.21H16.8099C16.7499 11.21 16.6899 11.21 16.6399 11.23C15.6699 11.28 14.7799 10.97 14.1099 10.4C15.1399 9.48 15.7299 8.1 15.6099 6.6C15.5399 5.79 15.2599 5.05 14.8399 4.42C15.2199 4.23 15.6599 4.11 16.1099 4.07C18.0699 3.9 19.8199 5.36 19.9899 7.34Z"
                        fill="#BC2228"
                      />
                      <path
                        d="M21.9902 16.59C21.9102 17.56 21.2902 18.4 20.2502 18.97C19.2502 19.52 17.9902 19.78 16.7402 19.75C17.4602 19.1 17.8802 18.29 17.9602 17.43C18.0602 16.19 17.4702 15 16.2902 14.05C15.6202 13.52 14.8402 13.1 13.9902 12.79C16.2002 12.15 18.9802 12.58 20.6902 13.96C21.6102 14.7 22.0802 15.63 21.9902 16.59Z"
                        fill="#BC2228"
                      />
                    </svg>
                  </div>
                  <div class="meta-text">
                    Số lượng tuyển <br /><b>{{ jobDetail.quantity }} người</b>
                  </div>
                </div>
                <div class="meta-row">
                  <div class="meta-detal">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21.2502 18.47L19.6002 18.86C19.2302 18.95 18.9402 19.23 18.8602 19.6L18.5102 21.07C18.3202 21.87 17.3002 22.12 16.7702 21.49L13.7802 18.05C13.5402 17.77 13.6702 17.33 14.0302 17.24C15.8002 16.81 17.3902 15.82 18.5602 14.41C18.7502 14.18 19.0902 14.15 19.3002 14.36L21.5202 16.58C22.2802 17.34 22.0102 18.29 21.2502 18.47Z"
                        fill="#BC2228"
                      />
                      <path
                        d="M2.70016 18.47L4.35016 18.86C4.72016 18.95 5.01016 19.23 5.09016 19.6L5.44016 21.07C5.63016 21.87 6.65016 22.12 7.18016 21.49L10.1702 18.05C10.4102 17.77 10.2802 17.33 9.92016 17.24C8.15016 16.81 6.56016 15.82 5.39016 14.41C5.20016 14.18 4.86016 14.15 4.65016 14.36L2.43016 16.58C1.67016 17.34 1.94016 18.29 2.70016 18.47Z"
                        fill="#BC2228"
                      />
                      <path
                        d="M12 2C8.13 2 5 5.13 5 9C5 10.45 5.43 11.78 6.17 12.89C7.25 14.49 8.96 15.62 10.95 15.91C11.29 15.97 11.64 16 12 16C12.36 16 12.71 15.97 13.05 15.91C15.04 15.62 16.75 14.49 17.83 12.89C18.57 11.78 19 10.45 19 9C19 5.13 15.87 2 12 2ZM15.06 8.78L14.23 9.61C14.09 9.75 14.01 10.02 14.06 10.22L14.3 11.25C14.49 12.06 14.06 12.38 13.34 11.95L12.34 11.36C12.16 11.25 11.86 11.25 11.68 11.36L10.68 11.95C9.96 12.37 9.53 12.06 9.72 11.25L9.96 10.22C10 10.03 9.93 9.75 9.79 9.61L8.94 8.78C8.45 8.29 8.61 7.8 9.29 7.69L10.36 7.51C10.54 7.48 10.75 7.32 10.83 7.16L11.42 5.98C11.74 5.34 12.26 5.34 12.58 5.98L13.17 7.16C13.25 7.32 13.46 7.48 13.65 7.51L14.72 7.69C15.39 7.8 15.55 8.29 15.06 8.78Z"
                        fill="#BC2228"
                      />
                    </svg>
                  </div>
                  <div class="meta-text">
                    Cấp bậc <br /><b>{{ jobDetail.rank }}</b>
                  </div>
                </div>
                <div class="meta-row">
                  <div class="meta-detal">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.8099 5.49V6.23L14.2699 4.18C12.9299 3.41 11.0599 3.41 9.72994 4.18L6.18994 6.24V5.49C6.18994 3.24 7.41994 2 9.66994 2H14.3299C16.5799 2 17.8099 3.24 17.8099 5.49Z"
                        fill="#BC2228"
                      />
                      <path
                        d="M17.84 7.97L17.7 7.9L16.34 7.12L13.52 5.49C12.66 4.99 11.34 4.99 10.48 5.49L7.66 7.11L6.3 7.91L6.12 8C4.37 9.18 4.25 9.4 4.25 11.29V15.81C4.25 17.7 4.37 17.92 6.16 19.13L10.48 21.62C10.91 21.88 11.45 21.99 12 21.99C12.54 21.99 13.09 21.87 13.52 21.62L17.88 19.1C19.64 17.92 19.75 17.71 19.75 15.81V11.29C19.75 9.4 19.63 9.18 17.84 7.97ZM14.79 13.5L14.18 14.25C14.08 14.36 14.01 14.57 14.02 14.72L14.08 15.68C14.12 16.27 13.7 16.57 13.15 16.36L12.26 16C12.12 15.95 11.89 15.95 11.75 16L10.86 16.35C10.31 16.57 9.89 16.26 9.93 15.67L9.99 14.71C10 14.56 9.93 14.35 9.83 14.24L9.21 13.5C8.83 13.05 9 12.55 9.57 12.4L10.5 12.16C10.65 12.12 10.82 11.98 10.9 11.86L11.42 11.06C11.74 10.56 12.25 10.56 12.58 11.06L13.1 11.86C13.18 11.99 13.36 12.12 13.5 12.16L14.43 12.4C15 12.55 15.17 13.05 14.79 13.5Z"
                        fill="#BC2228"
                      />
                    </svg>
                  </div>
                  <div class="meta-text">
                    Kinh nghiệm: <br /><b>{{ jobDetail.exp }}</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Job Description -->
          <div class="mb-9" v-if="jobDetail">
            <h3 class="section-title">Mô tả công việc</h3>
            <li>{{ jobDetail.des }}</li>

            <!-- Job Requirements -->
            <h3 class="section-title">Yêu cầu ứng viên</h3>
            <li>{{ jobDetail.requirements }}</li>
            <!-- Job Benefits -->
            <h3 class="section-title">Quyền lợi</h3>
            <li>{{ jobDetail.benefits }}</li>
            <!-- Job Location -->
            <h3 class="section-title">Địa điểm làm việc</h3>
            <li>{{ jobDetail.location }}</li>

            <!-- Job Time -->
            <h3 class="section-title">Thời gian làm việc</h3>
            <li>Thứ 2 - Thứ 6 (8:00 đến 17:30)</li>
          </div>
          <div class="action-buttons">
            <button
              v-if="userLogin"
              @click="handleApply"
              class="apply-button"
              :disabled="isApplied"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.16689 5.26667L13.2419 2.90834C16.4169 1.85001 18.1419 3.58334 17.0919 6.75834L14.7336 13.8333C13.1502 18.5917 10.5502 18.5917 8.96689 13.8333L8.26689 11.7333L6.16689 11.0333C1.40856 9.45001 1.40856 6.85834 6.16689 5.26667Z"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.4248 11.375L11.4081 8.38333"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              {{ isApplied ? "Đã ứng tuyển" : "Ứng tuyển ngay" }}
            </button>
            <button v-if="userLogin" class="save-button">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.5165 17.3417C10.2332 17.4417 9.7665 17.4417 9.48317 17.3417C7.0665 16.5167 1.6665 13.075 1.6665 7.24168C1.6665 4.66668 3.7415 2.58334 6.29984 2.58334C7.8165 2.58334 9.15817 3.31668 9.99984 4.45001C10.8415 3.31668 12.1915 2.58334 13.6998 2.58334C16.2582 2.58334 18.3332 4.66668 18.3332 7.24168C18.3332 13.075 12.9332 16.5167 10.5165 17.3417Z"
                  stroke="#676767"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Lưu tin
            </button>
          </div>
        </div>
      </div>
      <!-- Related Jobs Section (Aligned to the right) -->
      <div class="related-jobs">
        <h3>Việc làm liên quan</h3>
        <div v-for="job in relatedJobs" :key="job.id" class="job-listings">
          <div class="job-card">
            <img :src="job.image" alt="Job Image" class="job-image" />
            <div class="job-content">
              <h4>{{ job.name }}</h4>
              <div class="job-levels">
                <span :class="`level-tag ${job.level.toLowerCase()}`">{{
                  job.level
                }}</span>
              </div>
              <div class="meta-info">
                <div class="meta-item">Lương: {{ job.salary }}</div>
                <div class="meta-item">Địa điểm: {{ job.location }}</div>
                <div class="meta-item">Hình thức: {{ job.type }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import Swal from "sweetalert2";
const store = useStore();
const route = useRoute();
const idFromUrl = route.params.id;
store.dispatch("fetchJobById", idFromUrl);

const jobDetail = computed(() => store.state.job.currentJob);
const relatedJobs = [
  {
    id: 2,
    image: "../../src/images/work1.png",
    name: "Sales IT làm việc tại Tokyo - Nagoya - Osaka",
    level: "Fresher",
    salary: "400 - 600 man",
    location: "Nhật Bản",
    type: "Toàn thời gian",
  },
  {
    id: 3,
    image: "../../src/images/work2.png",
    name: "SE/BrSE (Outsystem) làm việc tại Tokyo/Nagoya",
    level: "Junior",
    salary: "500 - 700 man",
    location: "Nhật Bản",
    type: "Toàn thời gian",
  },
  {
    id: 4,
    image: "../../src/images/work4.png",
    name: "Marketing Executive (Korea)",
    level: "Senior",
    salary: "$1000",
    location: "Nhật Bản",
    type: "Toàn thời gian",
  },
];

const isApplied = ref(false);

const userLogin = JSON.parse(localStorage.getItem("UserLogin"));
const handleApply = () => {
  const d = new Date();
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const time = `${hours}:${minutes}`;

  const interviewData = {
    id: Math.ceil(Math.random() * 1000000),
    enterpriseId: jobDetail.value.enterpriseId,
    userId: userLogin.id,
    jobId: jobDetail.value.id,
    status: "Pending",
    pendingAt: "",
    waitForResultAt: "",
    meetingEndTime: "",
    meetingStartTime: "",
    waitUntilInterviewDayAt: "",
    interviewingAt: "",
    doneAt: "",
    verifiedStudentAt: "",
    verifiedEnterpriseAt: "",
    cancelReason: "",
    cancelAt: "",
    meetingLink: "",
    time: time,
    date: d.getFullYear() + "/" + d.getMonth() + "/" + d.getDate(),
    createAt: new Date().toISOString(),
  };
  console.log("don ung tuyen cua user", interviewData);
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Your interview has been added",
    showConfirmButton: false,
    timer: 1500,
  });
  isApplied.value = true;
  store.dispatch("createInterview", interviewData);
};
const idSaved = ref(false);
const savedJob = (jobDetail) => {
  console.log(11111, jobDetail);
  jobDetail.isSaved = !jobDetail.isSaved.value;
  store.dispatch("updateJob", jobDetail);
};
</script>

<style scoped>
.container {
  max-width: 1365px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
}

/* Navigation Path */
.container-header {
  padding-bottom: 20px;
}

.header-text {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.color-header {
  color: #9f1239;
}

.main-content {
  display: flex;
  gap: 32px;
  margin-top: 20px;
}

/* Job Detail Section */
.job-detail {
  flex: 3;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.job-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 20px;
}

.job-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.job-content {
  flex: 1;
  margin-left: 20px;
}

.job-content h2 {
  font-size: 24px;
  margin-bottom: 8px;
}

.job-levels {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.level-tag {
  padding: 6px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}

.level-tag.fresher {
  background-color: #def7ec;
  color: #03543f;
}

.level-tag.junior {
  background-color: #e1effe;
  color: #1e429f;
}

.level-tag.middle {
  background-color: #fee2e2;
  color: #9b1c1c;
}

.level-tag.senior {
  background-color: #fef3c7;
  color: #92400e;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.apply-button,
.save-button {
  width: 160px;
  padding: 12px;
  font-size: 14px;
  border-radius: 6px;
}

.apply-button {
  background-color: #9f1239;
  color: white;
  border: none;
  display: flex;
  justify-content: center;
  gap: 5px;
  align-items: center;
}

.save-button {
  border: 1px solid black;
  background-color: white;
  display: flex;
  justify-content: center;
  gap: 5px;
  align-items: center;
}

.job-info {
  margin-top: 20px;
}

.general-info {
  display: flex;
  flex-wrap: wrap;
  gap: 450px;
  background-color: #fff6f7;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 10px;
  font-size: 14px;
}
.container-info {
  background-color: #fff6f7;
  padding: 16px;
  border-radius: 8px;
}
.meta-item {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
}

h3 {
  font-size: 18px;
  margin-top: 24px;
}

ul {
  margin-top: 10px;
  padding-left: 20px;
}

ul li {
  margin-bottom: 8px;
}

/* Related Jobs Section */
.related-jobs {
  flex: 1;
  max-width: 320px;
}

.related-jobs h3 {
  font-size: 18px;
  margin-bottom: 16px;
  color: #9f1239;
}

.job-listings {
  display: flex;
  gap: 12px;
  padding: 12px;
  background-color: white;
  margin-bottom: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.related-jobs .job-image {
  width: 60px;
  height: 60px;
}

.job-content h4 {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 4px;
}

.meta-info {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 12px;
}

.apply-button:hover {
  background-color: #b91c1c;
}

.save-button:hover {
  background-color: #f7f7f7;
}
.section-title {
  font-weight: 700;
}

.meta-item1 {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 16px; /* Khoảng cách giữa SVG và nội dung văn bản */
}

.meta-detal {
  padding: 12px;
  background-color: #f8e9ea;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
}
.meta-row svg {
  flex-shrink: 0; /* Đảm bảo SVG không bị co lại */
  width: 24px;
  height: 24px;
}

.meta-text {
  display: flex;
  flex-direction: column;
  justify-content: center; /* Căn giữa văn bản theo chiều dọc */
  font-size: 14px;
  line-height: 1.5;
  color: #333333;
}
</style>
