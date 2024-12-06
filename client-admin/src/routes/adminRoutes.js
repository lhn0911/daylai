import AdminLayout from "@/layouts/AdminLayout.vue";
import CVManager from "@/views/CVManager.vue";
import User from "@/views/UserManager.vue";
import CertificateManager from "@/views/CertificateManager.vue";
import Enterprise from "@/views/Enterprise.vue";
import InterviewManager from "@/views/InterviewManager.vue";
import JobManager from "@/views/JobManager.vue";
import LanguageManager from "@/views/LanguageManager.vue";
import LoginAdmin from "@/views/auth/LoginAdmin.vue";
const adminRoutes = [
  {
    path: "/admin",
    component: AdminLayout,
    children: [
      {
        path: "user",
        component: User,
        name: "user",
      },
      {
        path: "cv",
        component: CVManager,
      },
      {
        path: "certificate",
        component: CertificateManager,
      },
      {
        path: "enterprise",
        component: Enterprise,
      },
      {
        path: "interview",
        component: InterviewManager,
      },
      {
        path: "job",
        component: JobManager,
      },
      {
        path: "cvlang",
        component: LanguageManager,
      }
    ],
  },
  {
    path: "/loginAdmin",
    component: LoginAdmin,
  }
];

export default adminRoutes;
