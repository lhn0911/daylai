import HomePage from "@/layouts/candidate/HomePage.vue";
import HomePageDetail from "@/layouts/candidate/HomePageDetail.vue";
import AboutUs from "@/layouts/user/AboutUs.vue";
import Contact from "@/layouts/user/Contact.vue";
const candidateRouters = [
  {
    path: "/candidate",
    component: HomePage,
  },
  {
    path: "/candidateDetail/:id",
    name: "HomePageDetail",
    component: HomePageDetail,
  },
  {
    path: "/aboutUs",
    component: AboutUs,
  },
  {
    path: "/contact",
    component: Contact,
  },
];

export default candidateRouters;
