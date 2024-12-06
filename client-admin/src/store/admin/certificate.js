import {
    getAllUserCertificates,
    createUserCertificate,
    updateUserCertificate,
    deleteUserCertificate,
    getAllCertificateTypes,
    createCertificateType,
    updateCertificate,
    deleteCertificate
  } from "@/services/CertificateServices";
  
  const certify = {
    state: {
      userCertificates: [],
      certificateTypes: [],
    },
  
    getters: {
      allUserCertificates: (state) => state.userCertificates,
      allCertificateTypes: (state) => state.certificateTypes,
      certificateTypeById: (state) => (id) =>
        state.certificateTypes.find((type) => type.id === id),
    },
  
    mutations: {
      setUserCertificates(state, userCertificates) {
        state.userCertificates = userCertificates;
      },
      addUserCertificate(state, newCertificate) {
        const index = state.userCertificates.findIndex(
          (certificate) => certificate.id === newCertificate.id
        );
        if (index !== -1) {
          state.userCertificates.splice(index, 1, newCertificate);
        } else {
          state.userCertificates.push(newCertificate);
        }
      },
      updateUserCertificate(state, updatedCertificate) {
        const index = state.userCertificates.findIndex(
          (certificate) => certificate.id === updatedCertificate.id
        );
        if (index !== -1) {
          state.userCertificates.splice(index, 1, updatedCertificate);
        }
      },
      removeUserCertificate(state, id) {
        state.userCertificates = state.userCertificates.filter(
          (certificate) => certificate.id !== id
        );
      },
      setCertificateTypes(state, certificateTypes) {
        state.certificateTypes = certificateTypes;
      },
      addCertificateType(state, newType) {
        state.certificateTypes.push(newType);
      },
      updateCertificate(state, updatedCert) {
        const index = state.certificateTypes.findIndex(
          (cert) => cert.id === updatedCert.id
        );
        if (index !== -1) {
          state.certificateTypes.splice(index, 1, updatedCert);
        }
      },
      deleteCertificate(state,id){
        state.certificateTypes = state.certificateTypes.filter((cer) => cer.id !== id)
      }
    },
  
    actions: {
      async fetchAllUserCertificates({ commit }) {
        try {
          const userCertificates = await getAllUserCertificates();
          commit("setUserCertificates", userCertificates);
        } catch (error) {
          console.log("Không lấy được danh sách chứng chỉ người dùng:", error);
        }
      },
  
      async fetchAllCertificateTypes({ commit }) {
        try {
          const types = await getAllCertificateTypes();
          commit("setCertificateTypes", types);
        } catch (error) {
          console.log("Không lấy được danh sách loại chứng chỉ:", error);
        }
      },
  
      async addUserCertificate({ commit, dispatch }, userCertificate) {
        try {
          await createUserCertificate(userCertificate);
          commit("addUserCertificate", userCertificate);
          await dispatch("fetchAllUserCertificates");
        } catch (error) {
          console.error("Không thêm được chứng chỉ người dùng:", error);
        }
      },
  
      async updateUserCertificate({ dispatch }, updatedCertificate) {
        try {
          await updateUserCertificate(updatedCertificate);
          await dispatch("fetchAllUserCertificates");
        } catch (error) {
          console.error("Không sửa được chứng chỉ người dùng:", error);
        }
      },
  
      async deleteUserCertificate({ dispatch }, id) {
        try {
          await deleteUserCertificate(id);
          await dispatch("fetchAllUserCertificates");
        } catch (error) {
          console.log("Không xóa được chứng chỉ người dùng:", error);
        }
      },
  
      async addCertificateType({ dispatch }, certificateType) {
        try {
          await createCertificateType(certificateType);
          await dispatch("fetchAllCertificateTypes");
        } catch (error) {
          console.error("Không thêm được loại chứng chỉ:", error);
        }
      },

      async updateCertificate({ commit }, updatedCert) {
        try {
          await updateCertificate(updatedCert);  
          commit("updateCertificate", updatedCert);  
        } catch (error) {
          console.error("Failed to update certificate:", error);
        }
      },
      async deleteCertificate({commit},id){
        try {
          await deleteCertificate(id);
          commit("deleteCertificate", id);
        } catch (error) {
          console.log(error);
          
        }
      }
    },
  };
  
  export default certify;
  