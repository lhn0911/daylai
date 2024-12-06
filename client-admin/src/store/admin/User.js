import {
  getAllUser,
  getUserById,
  updateUser,
  createUser,
  deleteUser,
} from "@/services/userServices";

const user = {
  state: {
    users: [],
    currentUser: null,
  },
  getters: {
    allUsers: (state) => state.users,
    currentUser: (state) => state.currentUser,
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    updateUserMutation(state, updatedUser) {
      const index = state.users.findIndex((user) => user.id === updatedUser.id);
      if (index !== -1) {
        state.users.splice(index, 1, updatedUser);
      }
    },
    deleteUserMutation(state, id) {
      state.users = state.users.filter((user) => user.id !== id);
    },
  },
  actions: {
    async fetchAllUsers({ commit }) {
      try {
        const users = await getAllUser();
        commit("setUsers", users);
      } catch (error) {
        console.error("Không lấy được user:", error);
      }
    },
    async fetchUserById({ commit }, id) {
      try {
        const user = await getUserById(id);
        commit("setCurrentUser", user);
      } catch (error) {
        console.error("Không lấy được user:", error);
      }
    },
    async createUser({ dispatch }, userData) {
      try {
        await createUser(userData);
        await dispatch("fetchAllUsers");
      } catch (error) {
        console.error("Không thêm được user:", error);
      }
    },
    async updateUser({ commit }, userData) {
      try {
        await updateUser(userData);
        commit("updateUserMutation", userData);
      } catch (error) {
        console.error("Không lấy được user để sửa:", error);
      }
    },
    async deleteUser({ commit }, id) {
      try {
        await deleteUser(id);
        commit("deleteUserMutation", id);
      } catch (error) {
        console.log("khong lấy duoc id de xoa", error);
      }
    },
  },
};

export default user;
