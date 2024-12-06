import {
  getAllJobs,
  getJobById,
  getJobByLevel,
  getSavedJobs,
  getAllJobsNoFilter,
  deleteJob,
} from "@/services/JobsServices";
import baseUrl from "../../../api";

const job = {
  state: {
    jobs: [],
    currentJob: null,
  },
  getters: {},
  mutations: {
    setJobs(state, jobs) {
      state.jobs = jobs;
    },
    setCurrentJob(state, job) {
      state.currentJob = job;
    },
    addJob(state, job) {
      state.jobs.push(job);
    },
    updateJob(state, updatedJob) {
      const index = state.jobs.findIndex((job) => job.id === updatedJob.id);
      if (index !== -1) {
        state.jobs.splice(index, 1, updatedJob); // Replace the old job with the updated one
      }
    },
    deleteJob(state, jobId) {
      state.jobs = state.jobs.filter((job) => job.id !== jobId);
    },
  },
  actions: {
    async fetchAllJobs({ commit }) {
      try {
        const jobs = await getAllJobs();
        commit("setJobs", jobs);
      } catch (error) {
        console.log("khong lay dc job", error);
      }
    },
    async fetchAllJobsNofilter({ commit }) {
      try {
        const jobs = await getAllJobsNoFilter();
        commit("setJobs", jobs);
      } catch (error) {
        console.log("khong lay dc job", error);
      }
    },
    async fetchJobById({ commit }, id) {
      try {
        const job = await getJobById(id);
        commit("setCurrentJob", job);
      } catch (error) {}
    },
    async fetchJobByLevels({ commit }) {
      try {
        const levelJob = await getJobByLevel();
        commit("setJobs", levelJob);
      } catch (error) {
        console.log("khong lay duoc job theo level".error);
      }
    },
    async fetchSavedJob({ commit }) {
      try {
        const savedJob = await getSavedJobs();
        commit("setJobs", savedJob);
      } catch (error) {}
    },
    async addJob({ commit }, jobForm) {
      try {
        const response = await baseUrl.post("/job", jobForm);
        commit("addJob", response.data);
      } catch (error) {
        console.log("Error adding job", error);
      }
    },
    async updateJob({ commit }, updatedJob) {
      try {
        const response = await baseUrl.patch(
          `/job/${updatedJob.id}`,
          updatedJob
        );
        commit("updateJob", response.data);
      } catch (error) {
        console.log("Error updating job", error);
      }
    },
    async deleteJob({ commit }, jobId) {
      try {
        await deleteJob(jobId);
        commit("deleteJob", jobId);
      } catch (error) {
        console.log("Error deleting job", error);
      }
    },
  },
};
export default job;
