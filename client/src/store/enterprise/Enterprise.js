import {
  getAllEnterprise,
  getEnterpriseById,
  updateEnterprise,
  addEnterprise,
} from "@/services/enterpriseServices";
import axios from "axios";
const enterprise = {
  state: {
    enterprises: [],
    currentEnterprise: null,
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
  },
  actions: {
    // lay tat ca cong ty
    async fetchAllEnterprise({ commit }) {
      try {
        const enterprises = await getAllEnterprise();
        commit("setEnterprises", enterprises);
      } catch (error) {
        console.log("Không lấy được enterprise", error);
      }
    },
    // lay thong tin cong ty theo id
    async fetchEnterpriseById({ commit }, id) {
      try {
        const enterprise = await getEnterpriseById(id);
        commit("setCurrentEnterprise", enterprise);
        // localStorage.setItem('currentEnterprise', JSON.stringify(enterprise));
      } catch (error) {
        console.log("Không lấy được enterprise", error);
      }
    },
    // them cong ty
    async addEnterprise({ dispatch }, enterpriseData) {
      try {
        await addEnterprise(enterpriseData);
        await dispatch("fetchAllEnterprise");
      } catch (error) {
        console.log("Không thêm được enterprise", error);
      }
    },
    async updateEnterprise({ commit }, enterpriseData) {
      try {
        await updateEnterprise(enterpriseData);
        commit("updateEnterpriseMutation", enterpriseData);
      } catch (error) {
        console.log("Lỗi không update được enterprise", error);
      }
    },
    // cap nhat info company theo id
    async updateEnterpriseById({ commit }, updatedEnterprise) {
      try {
        const response = await updateEnterprise(
          updatedEnterprise.id,
          updatedEnterprise
        );
        commit("updateEnterpriseMutation", response); // Update the state with the response data
      } catch (error) {
        console.log("Error updating enterprise:", error);
      }
    },
  },
  getters: {
    allEnterprise: (state) => state.enterprises,
    currentEnterprise: (state) => state.currentEnterprise,
  },
};

export default enterprise;
