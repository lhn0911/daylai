<template>
  <div v-if="isVisible" class="overlay">
    <div class="modal">
      <h2>Lịch phỏng vấn</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="date">Ngày phỏng vấn</label>
          <input v-model="editedInterview.date" type="date" id="date" />
        </div>
        <div class="form-group">
          <label for="time">Thời gian</label>
          <input v-model="editedInterview.time" type="time" id="time" />
        </div>
        <div class="form-group">
          <label for="interviewMethod">Cách thức phỏng vấn</label>
          <select
            v-model="editedInterview.interviewMethod"
            id="interviewMethod"
          >
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
        </div>
        <div class="form-group">
          <label for="meetingLink">Link cuộc họp</label>
          <input
            v-model="editedInterview.meetingLink"
            type="url"
            id="meetingLink"
            placeholder="http://meeting..."
          />
        </div>
        <div class="button-group">
          <button type="button" @click="closeEdit" class="cancel-btn">
            Hủy
          </button>
          <button type="submit" class="save-btn">Cập nhật</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex"; // Import Vuex store

const props = defineProps({
  initialInterview: {
    type: Object,
    required: true,
  },
  isVisible: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const store = useStore();
const editedInterview = ref({ ...props.initialInterview });

/*
watch(() => props.initialInterview, (newInterview) => {
  // Chuyển đổi meetingStartTime thành ngày và giờ
  const startTime = new Date(newInterview.meetingStartTime);
  editedInterview.value = {
    ...newInterview,
    date: startTime.toISOString().split('T')[0], // YYYY-MM-DD
    time: startTime.toTimeString().slice(0, 5) // HH:MM
  }; 
});

// Hàm gửi dữ liệu khi form được submit
const submitForm = async () => {h 
  const updatedData = {
    id: editedInterview.value.id,
    date: editedInterview.value.date,
    time: editedInterview.value.time,
    interviewMethod: editedInterview.value.interviewMethod,
    meetingLink: editedInterview.value.meetingLink,
    meetingStartTime: `${editedInterview.value.date}T${editedInterview.value.time}:00Z`, 
  };

  await store.dispatch("interviewBooking/updateInterviewBooking", updatedData);
  emit("close"); // Gửi sự kiện đóng modal
};
*/
const submitForm = async () => {
  const updatedData = {
    id: editedInterview.value.id,
    date: editedInterview.value.date,
    time: editedInterview.value.time,
    interviewMethod: editedInterview.value.interviewMethod,
    meetingLink: editedInterview.value.meetingLink,
    meetingStartTime: `${editedInterview.value.date}T${editedInterview.value.time}:00Z`,
  };

  await store.dispatch("interviewBooking/updateInterviewBooking", updatedData);
  store.dispatch("interviewBooking/fetchAllInterviewBookings", updatedData);

  // Emit the save event
  emit("close");
};

const closeEdit = () => {
  emit("close");
};
</script>
  
  <style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 450px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.form-group {
  margin-bottom: 15px;
}

input,
select {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.button-group {
  display: flex;
  justify-content: flex-end;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.save-btn {
  background-color: #d32f2f;
  color: white;
}

.cancel-btn {
  background-color: #e0e0e0;
  color: #333;
  margin-right: 10px;
}
</style>
