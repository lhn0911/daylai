import {
  getAllCandidates,
  getCandidateById,
  getCandidateByYear,
} from "@/services/candidateServices";

const candidate = {
  state: {
    candidates: [],
    selectedCandidate: null,
  },

  getters: {
    allCandidates: (state) => state.candidates,
    selectedCandidate: (state) => state.selectedCandidate,
  },

  mutations: {
    setCandidates(state, candidates) {
      state.candidates = candidates;
    },
    setSelectedCandidate(state, candidate) {
      state.selectedCandidate = candidate;
    },
  },

  actions: {
    async fetchCandidates({ commit }) {
      try {
        const candidates = await getAllCandidates();
        commit("setCandidates", candidates);
      } catch (error) {
        console.error("loi ko lay dc:", error);
      }
    },
    async fetchCandidateById({ commit }, id) {
      try {
        const candidate = await getCandidateById(id);
        commit("setSelectedCandidate", candidate);
      } catch (error) {
        console.error("khong lay duoc theo id:", error);
        commit("setSelectedCandidate", null);
      }
    },
    async fetchCandidateByYear({ commit }) {
      try {
        const candidateLevel = await getCandidateByYear();
        commit("setCandidates", candidateLevel);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
export default candidate;
