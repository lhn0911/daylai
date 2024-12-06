import {
  getAllEnterprise,
  getEnterpriseById,
  updateEnterprise,
  addEnterprise,
  deleteEnterprise,
} from "@/services/enterpriseServices";

const enterprise = {
  state: {
    enterprises: [],
    currentEnterprise: null,
  },
  getters: {
    allEnterprise: (state) => state.enterprises,
    currentEnterprise: (state) => state.currentEnterprise,
  },
  mutations: {
    setEnterprises(state, enterprises) {
      state.enterprises = enterprises;
    },
    setCurrentEnterprise(state, enterprise) {
      state.currentEnterprise = enterprise;
    },
    updateEnterpriseMutation(state, updatedEnterprise) {
      const index = state.enterprises.findIndex(
        (enterprise) => enterprise.id === updatedEnterprise.id
      );
      if (index !== -1) {
        state.enterprises.splice(index, 1, updatedEnterprise);
      }
    },
    deleteEnterpriseMutation(state, id) {
      state.enterprises = state.enterprises.filter(
        (enterprise) => enterprise.id !== id
      );
    },
  },
  actions: {
    async fetchAllEnterprise({ commit }) {
      try {
        const enterprises = await getAllEnterprise();
        commit("setEnterprises", enterprises);
      } catch (error) {
        console.log("Không lấy được doanh nghiệp", error);
      }
    },
    async fetchEnterpriseById({ commit }, id) {
      try {
        const enterprise = await getEnterpriseById(id);
        commit("setCurrentEnterprise", enterprise);
      } catch (error) {
        console.log("Không lấy được doanh nghiệp", error);
      }
    },
    async addEnterprise({ dispatch }, enterpriseData) {
      try {
        await addEnterprise(enterpriseData);
        await dispatch("fetchAllEnterprise");
      } catch (error) {
        console.log("Không thêm được doanh nghiệp", error);
      }
    },
    async updateEnterprise({ commit }, enterpriseData) {
      try {
        await updateEnterprise(enterpriseData);
        commit("updateEnterpriseMutation", enterpriseData);
      } catch (error) {
        console.log("Lỗi không cập nhật được doanh nghiệp", error);
      }
    },
    async deleteEnterprise({ commit }, id) {
      try {
        await deleteEnterprise(id);
        commit("deleteEnterpriseMutation", id);
      } catch (error) {
        console.log("Không xóa được doanh nghiệp", error);
      }
    },
  },
};

export default enterprise;
