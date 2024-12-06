import { getAllInterviews, updateInterview  } from "@/services/InterviewServices";
import { getAllUser } from "@/services/userServices"
import { getAllEnterprise } from "@/services/enterpriseServices";
// Vuex store (interview.js)
const interview = {
  state: {
    interviews: [],
    currentInterview: null,
    users: [],
    enterprises: [], // Đảm bảo rằng bạn lưu trữ thông tin enterprises trong state
  },
  getters: {
    allInterview: (state) => state.interviews,
    currentInterview: (state) => state.currentInterview,
    getUserById: (state) => (userId) => {
      return state.users.find(user => user.id === userId);
    },
    getEnterpriseById: (state) => (enterpriseId) => {
      return state.enterprises.find(enterprise => enterprise.id === enterpriseId);
    },
  },
  mutations: {
    setInterviews(state, interviews) {
      state.interviews = interviews;
    },
    setUsers(state, users) {
      state.users = users;
    },
    setEnterprises(state, enterprises) {  // Mutation để thiết lập enterprises
      state.enterprises = enterprises;
    },
    setCurrentInterview(state, interview) {
      state.currentInterview = interview;
    },
    updateInterviewStatus(state, { id, status, timeKey }) {
      const interview = state.interviews.find((interview) => interview.id === id);
      if (interview) {
        interview.status = status;
        interview[timeKey] = new Date().toISOString();
      }
    },
    updateInterviewMutation(state, updatedInterview) {
      const index = state.interviews.findIndex((interview) => interview.id === updatedInterview.id);
      if (index !== -1) {
        state.interviews.splice(index, 1, updatedInterview);
      }
    },
  },
  actions: {
    async fetchAllInterviews({ commit }) {
      try {
        const interviews = await getAllInterviews();
        commit("setInterviews", interviews);
        const users = await getAllUser();
        commit("setUsers", users);
        const enterprises = await getAllEnterprise(); // Fetch enterprise data
        commit("setEnterprises", enterprises); // Save enterprises to store
      } catch (error) {
        console.error("Couldn't fetch interviews:", error);
      }
    },
    async updateInterviewStatus({ commit }, { id, currentStatus }) {
      const statusFlow = [
        'scheduled', 
        'pending', 
        'enterpriseVerified', 
        'studentVerified', 
        'waitingForInterviewDay', 
        'interviewing', 
        'waitingForResult', 
        'done'
      ];

      const nextStatusIndex = statusFlow.indexOf(currentStatus) + 1;
      const nextStatus = statusFlow[nextStatusIndex];
      
      if (nextStatus) {
        const timeKeyMap = {
          pending: 'pending',
          enterpriseVerified: 'verifiedEnterpriseAt',
          studentVerified: 'verifiedStudentAt',
          waitingForInterviewDay: 'waitUntilInterviewDayAt',
          interviewing: 'interviewingAt',
          waitingForResult: 'waitForResultAt',
          done: 'doneAt',
        };

        const timeKey = timeKeyMap[nextStatus];

        commit("updateInterviewStatus", { id, status: nextStatus, timeKey });

        try {
          await updateInterview({ id, status: nextStatus, [timeKey]: new Date().toISOString() });
        } catch (error) {
          console.error("Couldn't update interview status:", error);
        }
      }
    },
    async updateBookingStepTime({ commit }, { bookingId, stepName, time }) {
      try {
        const timeKeyMap = {
          pending: 'pendingAt',
          enterpriseVerified: 'verifiedEnterpriseAt',
          studentVerified: 'verifiedStudentAt',
          interviewing: 'interviewingAt',
          waitUntilInterviewDay: 'waitUntilInterviewDayAt',
          done: 'doneAt',
          waitForResult: 'waitForResultAt',
        };
  
        const timeKey = timeKeyMap[stepName];
  
        // Tạo dữ liệu cần cập nhật
        const updatedBooking = {
          id: bookingId,
          [timeKey]: time,
        };
  
        // Cập nhật booking trên backend
        await updateInterview(updatedBooking);
  
        // Commit mutation để cập nhật dữ liệu trong store
        commit("updateInterviewMutation", updatedBooking);
      } catch (error) {
        console.error("Couldn't update booking step time:", error);
      }
    },
  
    async updateInterview({ commit }, interviewData) {
      try {
        await updateInterview(interviewData);
        commit("updateInterviewMutation", interviewData);
      } catch (error) {
        console.error("Couldn't update interview:", error);
      }
    },
  },
};

export default interview;
