import {
  getAllInterviewBookings,
  getInterviewBookingById,
  updateInterviewBooking,
  addInterviewBooking,
  deleteInterviewBooking,
} from "@/services/InterviewBookingServices";

const interviewBooking = {
  namespaced: true,

  state: {
    interviewBookings: [],
    currentInterviewBooking: null,
  },

  mutations: {
    setInterviewBookings(state, interviewBookings) {
      state.interviewBookings = interviewBookings;
    },
    setCurrentInterviewBooking(state, interviewBooking) {
      state.currentInterviewBooking = interviewBooking;
    },
    updateInterviewBookingMutation(state, updatedInterviewBooking) {
      const index = state.interviewBookings.findIndex(
        (interview) => interview.id === updatedInterviewBooking.id
      );
      if (index !== -1) {
        state.interviewBookings.splice(index, 1, updatedInterviewBooking);
      }
    },
    addInterviewBookingMutation(state, newInterviewBooking) {
      state.interviewBookings.push(newInterviewBooking);
    },
    deleteInterviewBookingMutation(state, id) {
      state.interviewBookings = state.interviewBookings.filter(
        (interview) => interview.id !== id
      );
    },
  },

  actions: {
    async fetchAllInterviewBookings({ commit }) {
      try {
        const interviewBookings = await getAllInterviewBookings();
        commit("setInterviewBookings", interviewBookings);
      } catch (error) {
        console.log("Không lấy được interview booking", error);
      }
    },
    async fetchInterviewBookingById({ commit }, id) {
      try {
        const interviewBooking = await getInterviewBookingById(id);
        commit("setCurrentInterviewBooking", interviewBooking);
      } catch (error) {
        console.log("Không lấy được interview booking", error);
      }
    },
    async addInterviewBooking({ commit }, interviewData) {
      try {
        const newInterviewBooking = await addInterviewBooking(interviewData);
        commit("addInterviewBookingMutation", newInterviewBooking);
      } catch (error) {
        console.log("Không thêm được interview booking", error);
      }
    },
    async updateInterviewBooking({ commit }, interviewData) {
      try {
        const updatedInterviewBooking = await updateInterviewBooking(
          interviewData
        );
        commit("updateInterviewBookingMutation", updatedInterviewBooking);
      } catch (error) {
        console.log("Lỗi không update được interview booking", error);
      }
    },
    async deleteInterviewBooking({ commit }, id) {
      try {
        await deleteInterviewBooking(id);
        commit("deleteInterviewBookingMutation", id);
      } catch (error) {
        console.log("Lỗi không xóa được interview booking", error);
      }
    },
  },

  getters: {
    allInterviewBookings: (state) => state.interviewBookings,
    currentInterviewBooking: (state) => state.currentInterviewBooking,
  },
};

export default interviewBooking;
