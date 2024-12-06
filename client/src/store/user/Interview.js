import {
  getAlluserInterview,
  createInterview,
  updateInterview,
  deleteInterview,
  getInterviewById,
} from "@/services/userInterviewServices";

const interview = {
  state: {
    interviews: [],
    currentInterview: null,
  },
  getters: {
    allInterviews: (state) => state.interviews,
    currentInterview: (state) => state.currentInterview,
  },
  mutations: {
    setInterviews(state, interviews) {
      state.interviews = interviews;
    },
    setCurrentInterview(state, interview) {
      state.currentInterview = interview;
    },
    addInterview(state, newInterview) {
      state.interviews.push(newInterview);
    },
    updateInterview(state, updatedInterview) {
      const index = state.interviews.findIndex(
        (interview) => interview.id === updatedInterview.id
      );
      if (index !== -1) {
        state.interviews.splice(index, 1, updatedInterview);
      }
    },
    deleteInterview(state, id) {
      state.interviews = state.interviews.filter(
        (interview) => interview.id !== id
      );
    },
  },
  actions: {
    async fetchAllInterviews({ commit }) {
      try {
        const interviews = await getAlluserInterview();
        commit("setInterviews", interviews);
      } catch (error) {
        console.error("Không lấy được lịch phỏng vấn:", error);
      }
    },

    async fetchInterviewById({ commit }, id) {
      try {
        const interview = await getInterviewById(id);
        commit("setCurrentInterview", interview);
      } catch (error) {
        console.error("Không lấy được chi tiết lịch phỏng vấn:", error);
      }
    },

    async createInterview({ dispatch }, interviewData) {
      try {
        await createInterview(interviewData);
        await dispatch("fetchAllInterviews");
      } catch (error) {
        console.error("Không thêm được lịch phỏng vấn:", error);
      }
    },

    async updateInterview({ commit }, interviewData) {
      try {
        await updateInterview(interviewData);
        commit("updateInterview", interviewData);
      } catch (error) {
        console.error("Không cập nhật được lịch phỏng vấn:", error);
      }
    },

    async deleteInterview({ commit }, id) {
      try {
        await deleteInterview(id);
        commit("deleteInterview", id);
      } catch (error) {
        console.error("Không xóa được lịch phỏng vấn:", error);
      }
    },
  },
};

export default interview;
