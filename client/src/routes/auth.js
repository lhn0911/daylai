import LoginUser from "@/views/auth/LoginUser.vue";
import RegisterUser from "@/views/auth/RegisterUser.vue";

const authRoutes = [
  {
    path: "/loginUser",
    component: LoginUser,
  },
  {
    path: "/registerUser",
    component: RegisterUser,
  },
];

export default authRoutes;
