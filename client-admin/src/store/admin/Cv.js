import { getAllCvs, createCv, updateCv, deleteCv } from "@/services/CvServices";

const cv = {
  state: {
    cvs: [],
    currentCv: null,
  },
  getters: {
    allCvs: (state) => state.cvs,
    currentCv: (state) => state.currentCv,
  },
  mutations: {
    setCvs(state, cvs) {
      state.cvs = cvs;
    },
    setCurrentCv(state, cv) {
      state.currentCv = cv;
    },
    addCv(state, cv) {
      state.cvs.push(cv);
    },
    updateCvMutation(state, updatedCv) {
      const index = state.cvs.findIndex((cv) => cv.id === updatedCv.id);
      if (index !== -1) {
        state.cvs.splice(index, 1, updatedCv);
      }
    },
    deleteCvMutation(state, id) {
      state.cvs = state.cvs.filter((cv) => cv.id !== id);
    },
  },
  actions: {
    async fetchAllCvs({ commit }) {
      try {
        const cvs = await getAllCvs();
        commit("setCvs", cvs);
      } catch (error) {
        console.error("Không lấy được danh sách CVs:", error);
      }
    },
    async createCv({ commit, dispatch }, cvData) {
      try {
        const newCv = await createCv(cvData);
        commit("addCv", newCv);
        dispatch("fetchAllCvs");
      } catch (error) {
        console.error("Không thêm được CV:", error);
      }
    },
    async updateCv({ commit }, cvData) {
      try {
        await updateCv(cvData);
        commit("updateCvMutation", cvData);
      } catch (error) {
        console.error("Không cập nhật được CV:", error);
      }
    },
    async deleteCv({ commit }, id) {
      try {
        await deleteCv(id);
        commit("deleteCvMutation", id);
      } catch (error) {
        console.error("Không xóa được CV:", error);
      }
    },
  },
};

export default cv;
