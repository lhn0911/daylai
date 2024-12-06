import EnterpriseLayout from "@/layouts/enterprise/EnterpriseLayout.vue";
import BookingInterview from "@/views/enterprise/interviews/BookingInterview.vue";
import AddJobEnterprise from "@/views/enterprise/jobs/AddJobEnterprise.vue";
import EditJobEnterprise from "@/views/enterprise/jobs/EditJobEnterprise.vue";
import JobsEnterprise from "@/views/enterprise/jobs/JobsEnterprise.vue";
import ProfileEnterprise from "@/views/enterprise/ProfileEnterprise.vue";
import UpdateProfileEnterprise from "@/views/enterprise/UpdateProfileEnterprise.vue";

const enterpriseRouters = [
  {
    path: "/enterprise",
    redirect: "enterprise/basic-info",
    component: EnterpriseLayout,
    children: [
      {
        path: "interviews",
        component: BookingInterview,
      },
      {
        path: "basic-info",
        component: ProfileEnterprise,
      },
      {
        path: "jobs",
        component: JobsEnterprise,
      },
      {
        path: "edit-job/:jobId",
        name: "edit-job",
        component: EditJobEnterprise,
      },
      {
        path: "update-basic-info",
        name: "update-basic-info",
        component: UpdateProfileEnterprise,
      },
      {
        path: "add-job",
        name: "add-job",
        component: AddJobEnterprise,
      },
    ],
  },
];

export default enterpriseRouters;
