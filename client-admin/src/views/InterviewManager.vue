<template>
  <div class="cv-management">
    <nav class="ant-breadcrumb css-ni1kz0">
      <ol class="flex gap-1.5">
        <li>
          <span class="ant-breadcrumb-link">
            <span
              class="select-none italic font-bold cursor-pointer flex items-center gap-1 home-link"
            >
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
                class="lucide lucide-house w-4 h-4"
              >
                <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                <path
                  d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                ></path>
              </svg>
              HOME
            </span>
          </span>
        </li>
        <li class="ant-breadcrumb-separator">/</li>
        <li>
          <span class="ant-breadcrumb-link">
            <span
              class="select-none italic font-bold cursor-pointer flex items-center gap-1"
            >
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
                class="lucide lucide-book-minus w-4 h-4"
              >
                <path
                  d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
                ></path>
                <path d="M9 10h6"></path>
              </svg>
              INTERVIEW
            </span>
          </span>
        </li>
      </ol>
    </nav>

    <div class="search-bar">
      <input
        type="text"
        class="input"
        placeholder="Search enterprises..."
        v-model="searchQuery"
      />
      <input
        type="text"
        class="input"
        placeholder="Search candidates..."
        v-model="searchQuery"
      />
      <select class="input" v-model="statusFilter">
        <option value="">Filter by status</option>
        <option value="pending">Pending</option>
        <option value="enterprise-verified">Enterprise Verified</option>
        <option value="student-verified">Student Verified</option>
        <option value="waiting-for-interview">Waiting for Interview Day</option>
        <option value="interviewing">Interviewing</option>
        <option value="waiting-for-result">Waiting for Result</option>
        <option value="done">Done</option>
      </select>
      <button class="button" @click="clearFilters">Clear All Filters</button>
    </div>

    <div class="container">
      <h1>Interview Bookings</h1>
      <div class="booking-list">
        <div
          class="booking-item"
          v-for="booking in paginatedBookings"
          :key="booking.id"
        >
          <div class="booking-info">
            <p><strong>Job ID:</strong> {{ booking.jobId }}</p>
            <p><strong>Status:</strong> {{ booking.status }}</p>
            <p>
              <strong>Created At:</strong> {{ formatDate(booking.createAt) }}
            </p>
            <p>
              <strong>Meeting Link:</strong
              ><a :href="booking.meetingLink" target="_blank">{{
                booking.meetingLink
              }}</a>
            </p>
            <p>
              <strong>User:</strong
              >{{ getUser(booking.userId)?.name || "Loading user..." }}
            </p>
            <p>
              <strong>Enterprise:</strong
              >{{
                getEnterprise(booking.enterpriseId)?.name ||
                "Loading enterprise..."
              }}
            </p>
          </div>
          <button @click="toggleDetail(booking.id)">View Detail</button>
        </div>
      </div>

      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">
          Next
        </button>
      </div>

      <div
        v-if="activeBookingId !== null"
        class="modal-overlay"
        @click.self="toggleDetail(null)"
      >
        <div class="modal-content">
          <h3>Interview Detail</h3>
          <a-steps :current="currentStep" direction="vertical">
            <a-step
              v-for="(step, index) in steps"
              :key="index"
              :title="step.title"
              :description="step.description"
            >
              <template #icon>
                <component :is="step.icon" />
              </template>

              <template #description>
                <div>
                  111{{ step.time ? formatDate(step.time) : "Not updated" }}
                </div>
              </template>
            </a-step>
          </a-steps>

          <button
            @click="moveToNextStep"
            :disabled="!canMoveToNextStep"
            class="move-to-btn"
          >
            Move to: {{ steps[activeStep]?.name }}
          </button>

          <button @click="toggleDetail(null)">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script  setup>
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
// import { ASteps } from 'ant-design-vue';
const store = useStore();

const searchQuery = ref("");
const statusFilter = ref("");
const itemsPerPage = 4;
const currentPage = ref(1);
const activeBookingId = ref(null);

// Các bước trong tiến trình
import { h } from "vue";
import {
  HourglassOutlined,
  SolutionOutlined,
  UserOutlined,
  FileDoneOutlined,
  CarryOutOutlined,
  IssuesCloseOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons-vue";
import { Steps } from "ant-design-vue";
const ASteps = Steps;
const AStep = Steps.Step;
const currentStep = ref(3);
// Khai báo các biến mô tả
const descriptionPending =
  "Waiting for confirmation from enterprise and candidate";
const descriptionEnterpriseVerified =
  "Enterprise has confirmed the interview schedule";
const descriptionStudentVerified =
  "Candidate has confirmed the interview schedule";
const descriptionWaitUntilInterview = "Confirmed, waiting for interview day";
const descriptionInterview = "Interview in progress";
const descriptionWaitForResult = "Interview completed, waiting for results";
const descriptionDone = "Interview process completed";

// Đưa các thông tin vào mảng để truyền vào a-steps
const steps = [
  {
    title: "Pending",
    description: descriptionPending,
    icon: h(HourglassOutlined),
    timeKey: "pendingAt", // Cập nhật timeKey cho bước này
  },
  {
    title: "Enterprise Verified",
    description: descriptionEnterpriseVerified,
    icon: h(SolutionOutlined),
    timeKey: "verifiedEnterpriseAt",
  },
  {
    title: "Student Verified",
    description: descriptionStudentVerified,
    icon: h(UserOutlined),
    timeKey: "verifiedStudentAt",
  },
  {
    title: "Wait Until Interview Day",
    description: descriptionWaitUntilInterview,
    icon: h(CarryOutOutlined),
    timeKey: "waitUntilInterviewDayAt",
  },
  {
    title: "Interviewing",
    description: descriptionInterview,
    icon: h(FileDoneOutlined),
    timeKey: "interviewingAt",
  },
  {
    title: "Wait For Result",
    description: descriptionWaitForResult,
    icon: h(IssuesCloseOutlined),
    timeKey: "waitForResultAt",
  },
  {
    title: "Done",
    description: descriptionDone,
    icon: h(CheckCircleOutlined),
    timeKey: "doneAt",
  },
];

// Fetch interviews when the component mounts
onMounted(() => {
  store.dispatch("fetchAllInterviews").then(() => {
    const currentBooking = store.getters.allInterview[4]; // Giả sử bạn lấy booking đầu tiên (hoặc tìm booking tương ứng) tôi muốn lấy booking khi bấm vào view detail
    setCurrentStep(currentBooking);
  });
});
const setCurrentStep = (booking) => {
  let stepIndex = 0; // Default to the first step
  console.log("booking", booking);
  console.log("steps", steps);

  // Check each step and find the first step that has no time
  steps.forEach((step, index) => {
    if (!booking[step.timeKey]) {
      stepIndex = index;
      console.log("step.timeKey", step.timeKey);

      return; // Stop at the first step without time
    }
  });

  currentStep.value = stepIndex; // Set the current step to the first incomplete step
  console.log(currentStep);
};
// Use Vuex getter to access interviews
const bookings = computed(() => store.getters.allInterview);

// Fetch user and enterprise details directly from the store
const getUser = (userId) => store.getters.getUserById(userId);
const getEnterprise = (enterpriseId) =>
  store.getters.getEnterpriseById(enterpriseId);

// Computed property for filtered and paginated bookings
const filteredBookings = computed(() => {
  return bookings.value.filter(
    (booking) =>
      (!searchQuery.value || booking.jobId.includes(searchQuery.value)) &&
      (!statusFilter.value || booking.status === statusFilter.value)
  );
});

const totalPages = computed(() =>
  Math.ceil(filteredBookings.value.length / itemsPerPage)
);

const paginatedBookings = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredBookings.value.slice(start, end);
});

// Pagination methods
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

// Utility method to clear filters
const clearFilters = () => {
  searchQuery.value = "";
  statusFilter.value = "";
  currentPage.value = 1;
};

const toggleDetail = (bookingId) => {
  activeBookingId.value =
    activeBookingId.value === bookingId ? null : bookingId;
};

// Get active booking based on activeBookingId
const activeBooking = computed(() => {
  return (
    bookings.value.find((booking) => booking.id === activeBookingId.value) ||
    null
  );
});

// Set the active step based on the earliest null time
const activeStep = computed(() => {
  const stepIndex = steps.findIndex((step) => step.time === null);
  return stepIndex === -1 ? steps.length - 1 : stepIndex;
});

// Check if the next step is available
const canMoveToNextStep = computed(() => {
  return steps[activeStep.value - 1]?.time !== null; // Ensure previous step has time
});

// Function to move to the next step
const moveToNextStep = async () => {
  if (currentStep.value < steps.length) {
    const step = steps[currentStep.value];

    // Update time for the current step
    const time = new Date().toISOString();
    await store.dispatch("updateBookingStepTime", {
      bookingId: activeBookingId.value,
      stepName: step.title,
      time: time,
    });

    // Move to the next step
    currentStep.value++;
  }
};

// Format date utility function
const formatDate = (dateString) => {
  if (!dateString) return "Not updated";
  const date = new Date(dateString);
  return date.toLocaleString();
};
</script>


<style scoped>
.cv-management {
  padding: 20px;
}
.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
}
.search-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  margin-top: 30px;
}
.input {
  padding: 8px 12px;
  width: 30%;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}
.button {
  padding: 8px 16px;
  /* background-color: #007bff; */
  /* color: #fff; */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 150px;
  height: 40px;
}
.button:hover {
  background-color: #0056b3;
}
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.booking-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.booking-item {
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  gap: 1rem;
}

.pagination button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
}

.pagination button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensure modal appears above other content */
}

/* Modal Content */
.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.modal-content h3 {
  margin-bottom: 20px;
}

.modal-content ul {
  list-style-type: none;
  padding-left: 0;
}

.modal-content li {
  margin: 10px 0;
}

.modal-content button {
  align-self: flex-end;
  margin-top: 20px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal-content button:hover {
  background-color: #0056b3;
}
</style>


<!-- <template>
  <div class="cv-management">
    <nav class="ant-breadcrumb css-ni1kz0">
      <ol class="flex gap-1.5">
        <li>
          <span class="ant-breadcrumb-link">
            <span
              class="select-none italic font-bold cursor-pointer flex items-center gap-1 home-link"
            >
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
                class="lucide lucide-house w-4 h-4"
              >
                <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                <path
                  d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                ></path>
              </svg>
              HOME
            </span>
          </span>
        </li>
        <li class="ant-breadcrumb-separator">/</li>
        <li>
          <span class="ant-breadcrumb-link">
            <span
              class="select-none italic font-bold cursor-pointer flex items-center gap-1"
            >
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
                class="lucide lucide-book-minus w-4 h-4"
              >
                <path
                  d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
                ></path>
                <path d="M9 10h6"></path>
              </svg>
              INTERVIEW
            </span>
          </span>
        </li>
      </ol>
    </nav>

    <div class="search-bar">
      <input
        type="text"
        class="input"
        placeholder="Search enterprises..."
        v-model="searchQuery"
      />
      <input
        type="text"
        class="input"
        placeholder="Search candidates..."
        v-model="searchQuery"
      />
      <select class="input" v-model="statusFilter">
        <option value="">Filter by status</option>
        <option value="pending">Pending</option>
        <option value="enterprise-verified">Enterprise Verified</option>
        <option value="student-verified">Student Verified</option>
        <option value="waiting-for-interview">Waiting for Interview Day</option>
        <option value="interviewing">Interviewing</option>
        <option value="waiting-for-result">Waiting for Result</option>
        <option value="done">Done</option>
      </select>
      <button class="button" @click="clearFilters">Clear All Filters</button>
    </div>

    
    <div class="container">
      <h1>Interview Bookings</h1>
      <div class="booking-list">
        <div
          class="booking-item"
          v-for="booking in paginatedBookings"
          :key="booking.id"
        >
          <div class="booking-info">
            <p><strong>Job ID:</strong> {{ booking.jobId }}</p>
            <p><strong>Status:</strong> {{ booking.status }}</p>
            <p><strong>Created At:</strong> {{ formatDate(booking.createAt) }}</p>
            <p><strong>Meeting Link:</strong><a :href="booking.meetingLink" target="_blank">{{ booking.meetingLink }}</a></p>
            <p><strong>User:</strong>{{ getUser(booking.userId)?.name || "Loading user..." }}</p>
            <p><strong>Enterprise:</strong>{{ getEnterprise(booking.enterpriseId)?.name || "Loading enterprise..." }}</p>
          </div>
          <button @click="toggleDetail(booking.id)">View Detail</button>
        </div>
      </div>

      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>

       <div v-if="activeBookingId !== null" class="modal-overlay" @click.self="toggleDetail(null)">
        <div class="modal-content">
          <h3>Interview Detail</h3>
          <a-steps :current="currentStep" direction="vertical">
            <a-step v-for="(step, index) in steps" 
                    :key="index"
                    :title="step.title"
                    :description="step.description">
              <template #icon>
                <component :is="step.icon" />
              </template>
              <template #description>
              <div>{{ step.time ? formatDate(step.time) : 'Not updated' }}</div>
            </template>
            </a-step>
          </a-steps>  
     
          <button @click="moveToNextStep" :disabled="!canMoveToNextStep" class="move-to-btn">Move to: {{ steps[activeStep]?.name }}</button>

          <button @click="toggleDetail(null)">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script  setup>
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
// import { ASteps } from 'ant-design-vue';
const store = useStore();

const searchQuery = ref("");
const statusFilter = ref("");
const itemsPerPage = 4;
const currentPage = ref(1);
const activeBookingId = ref(null);

// Các bước trong tiến trình
import { h } from "vue";
import { HourglassOutlined, SolutionOutlined, UserOutlined, FileDoneOutlined,  CarryOutOutlined, IssuesCloseOutlined ,CheckCircleOutlined     } from "@ant-design/icons-vue";
import { Steps } from 'ant-design-vue'
const ASteps = Steps
const AStep = Steps.Step
const currentStep = ref(3)
// Khai báo các biến mô tả
const descriptionPending = "Waiting for confirmation from enterprise and candidate";
const descriptionEnterpriseVerified =
  "Enterprise has confirmed the interview schedule";
const descriptionStudentVerified =
  "Candidate has confirmed the interview schedule";
const descriptionWaitUntilInterview = "Confirmed, waiting for interview day";
const descriptionInterview = "Interview in progress";
const descriptionWaitForResult = "Interview completed, waiting for results";
const descriptionDone = "Interview process completed";

// Đưa các thông tin vào mảng để truyền vào a-steps
const steps = [
  {
    title: 'Pending',
    description: descriptionPending,
    icon: h(HourglassOutlined),
  },
  {
    title: 'Enterprise Verified',
    description: descriptionEnterpriseVerified,
    icon: h(SolutionOutlined),
  },
  {
    title: 'Student Verified',
    description: descriptionStudentVerified,
    icon: h(UserOutlined),
  },
  {
    title: 'Wait Until Interview Day',
    description: descriptionWaitUntilInterview,
    icon: h(CarryOutOutlined),
  },
  {
    title: 'Interviewing',
    description: descriptionInterview,
    icon: h(FileDoneOutlined),
  },
  {
    title: 'Wait For Result',
    description: descriptionWaitForResult,
    icon: h( IssuesCloseOutlined),
  },
  {
    title: 'Done',
    description: descriptionDone,
    icon: h(CheckCircleOutlined),
  },
];

// Fetch interviews when the component mounts
onMounted(() => {
  store.dispatch("fetchAllInterviews");
});

// Use Vuex getter to access interviews
const bookings = computed(() => store.getters.allInterview);

// Fetch user and enterprise details directly from the store
const getUser = (userId) => store.getters.getUserById(userId);
const getEnterprise = (enterpriseId) =>
  store.getters.getEnterpriseById(enterpriseId);

// Computed property for filtered and paginated bookings
const filteredBookings = computed(() => {
  return bookings.value.filter(
    (booking) =>
      (!searchQuery.value || booking.jobId.includes(searchQuery.value)) &&
      (!statusFilter.value || booking.status === statusFilter.value)
  );
});

const totalPages = computed(() =>
  Math.ceil(filteredBookings.value.length / itemsPerPage)
);

const paginatedBookings = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredBookings.value.slice(start, end);
});

// Pagination methods
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

// Utility method to clear filters
const clearFilters = () => {
  searchQuery.value = "";
  statusFilter.value = "";
  currentPage.value = 1;
};

const toggleDetail = (bookingId) => {
  activeBookingId.value =
    activeBookingId.value === bookingId ? null : bookingId;
};

// Get active booking based on activeBookingId
const activeBooking = computed(() => {
  return bookings.value.find(booking => booking.id === activeBookingId.value) || null;
});

// Set the active step based on the earliest null time
const activeStep = computed(() => {
  const stepIndex = steps.findIndex(step => step.time === null);
  return stepIndex === -1 ? steps.length - 1 : stepIndex;
});

// Check if the next step is available
const canMoveToNextStep = computed(() => {
  return steps[activeStep.value - 1]?.time !== null; // Ensure previous step has time
});

// Function to move to the next step
const moveToNextStep = async () => {
  if (activeStep.value < steps.length) {
    const nextStep = steps[activeStep.value];
    nextStep.time = new Date().toISOString();

    // Update time in DB (for example, using a mutation to save data)
    await store.dispatch("updateBookingStepTime", { bookingId: activeBookingId.value, stepName: nextStep.title, time: nextStep.time });

    // Proceed to the next step
    toggleDetail(null);
  }
};

// Format date utility function
const formatDate = (dateString) => {
  if (!dateString) return "Not updated";
  const date = new Date(dateString);
  return date.toLocaleString();
};
</script>


<style scoped>
.cv-management {
  padding: 20px;
}
.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
}
.search-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  margin-top: 30px;
}
.input {
  padding: 8px 12px;
  width: 30%;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}
.button {
  padding: 8px 16px;
  /* background-color: #007bff; */
  /* color: #fff; */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 150px;
  height: 40px;
}
.button:hover {
  background-color: #0056b3;
}
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.booking-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.booking-item {
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  gap: 1rem;
}

.pagination button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
}

.pagination button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensure modal appears above other content */
}

/* Modal Content */
.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.modal-content h3 {
  margin-bottom: 20px;
}

.modal-content ul {
  list-style-type: none;
  padding-left: 0;
}

.modal-content li {
  margin: 10px 0;
}

.modal-content button {
  align-self: flex-end;
  margin-top: 20px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal-content button:hover {
  background-color: #0056b3;
}
</style>

 -->
