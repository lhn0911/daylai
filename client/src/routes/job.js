import HomePage from "@/layouts/job/HomePage.vue";
import HomePageDetail from "@/layouts/job/HomePageDetail.vue";
import SavedJob from "@/layouts/user/SavedJob.vue";
const jobRouters = [
  {
    path: "/jobList",
    component: HomePage,
  },
  {
    path: "/jobDetail/:id",
    name: "HomePageDeatail",
    component: HomePageDetail,
  },
  {
    path: "/jobSaved",
    component: SavedJob,
  },
];

export default jobRouters;
