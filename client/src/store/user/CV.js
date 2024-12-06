import {
  getAllCvs,
  createCv,
  updateCv,
  deleteCv,
  getAllLanguages,
} from "@/services/CVServices";

const cv = {
  state: {
    cvs: [],
    currentCv: null,
    languages: [],
  },
  getters: {
    allCvs: (state) => state.cvs,
    currentCv: (state) => state.currentCv,
    allLanguages: (state) => state.languages,
    getLanguageById: (state) => (id) => {
      return state.languages.find((lang) => lang.id === id);
    },
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
    setLanguages(state, languages) {
      state.languages = languages;
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
    async createCv({ commit }, cvData) {
      try {
        const newCv = await createCv(cvData);
        commit("addCv", newCv);
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
    async fetchAllLanguages({ commit }) {
      try {
        const languages = await getAllLanguages();
        commit("setLanguages", languages);
      } catch (error) {
        console.error("Không lấy được danh sách ngôn ngữ:", error);
      }
    },
  },
};

export default cv;
