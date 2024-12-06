import {
  getAllLanguages,
  addedLanguage,
  updatedLanguage,
  deletedLanguage,
  searchLanguageByName,
} from "@/services/LanguageServices";

const languages = {
  state: {
    languages: [],
  },
  getters: {
    allLanguages: (state) => state.languages,
    getLanguageById: (state) => (id) => {
      return state.languages.find((lang) => lang.id === id);
    },
  },
  mutations: {
    setLanguages(state, languages) {
      state.languages = languages;
    },
    addLanguageMutations(state, language) {
      state.languages.push(language);
    },
    updateLanguageMutations(state, updatedLanguage) {
      const index = state.languages.findIndex(item => item.id === updatedLanguage.id);
      if (index !== -1) {
        state.languages[index] = updatedLanguage;
      }
    },
    deleteLanguageMutations(state, id) {
      state.languages = state.languages.filter(item => item.id !== id);
    }
  },
  actions: {
    async fetchAllLanguages({ commit }) {
      try {
        const languages = await getAllLanguages();
        commit("setLanguages", languages);
      } catch (error) {
        console.error("Không lấy được danh sách ngôn ngữ:", error);
      }
    },
    async addLanguage({ dispatch,commit }, dataLanguage) {
      const data = await addedLanguage(dataLanguage);
      await commit("addLanguageMutations", data);
      await dispatch("fetchAllLanguages")
    },
    async updatedLanguage({ commit }, dataLanguage) {
      await updatedLanguage(dataLanguage.id, dataLanguage);
      commit("updateLanguageMutations", dataLanguage)
    },
    async deleteLanguage({ commit }, id) {
      await deletedLanguage(id);
      commit("deleteLanguageMutations", id);
    },
    async searchLanguageByName({ commit }, name){
      const results = await searchLanguageByName(name);
      commit("setLanguages", results)
    }
  },
};


export default languages;
