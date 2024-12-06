import { getAllJob, updateJob } from "@/services/jobServices";

const job = {
  state: {
    jobs: [],
  },
  getters: {
    allJobs: (state) => state.jobs,
  },
  mutations: {
    setJobs(state, jobs) {
      state.jobs = jobs;
    },
    updateJobMutation(state, updatedJob) {
      const index = state.jobs.findIndex((job) => job.id === updatedJob.id);
      if (index !== -1) {
        state.jobs.splice(index, 1, updatedJob);
      }
    },
    deleteJobMutation(state, jobId) {
      state.jobs = state.jobs.filter((job) => job.id !== jobId);
    },
  },
  actions: {
    async fetchAllJobs({ commit }) {
      try {
        const jobs = await getAllJob();
        commit("setJobs", jobs);
      } catch (error) {
        console.log("Không lấy được danh sách job", error);
      }
    },

    async updateJob({ commit, dispatch }, Jobdata) {
      try {
        await updateJob(Jobdata);
        commit("updateInterviewMutation", Jobdata);
        dispatch("fetchAllJobs");
      } catch (error) {
        console.error("Không cập nhật được Interview:", error);
      }
    },
  },
};

export default job;
