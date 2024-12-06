import { createStore } from "vuex";
import user from "./admin/User";
import cv from "./admin/Cv";
import carousel from "./admin/Carousel";
import certify from "./admin/certificate";
import languages from "./admin/Language";
import enterprise from "./admin/Enterprise";
import interview from "./admin/Interview";
import job from "./admin/Job";
export default createStore({
  modules: {
    user,
    cv,
    carousel,
    certify,
    languages,
    enterprise,
    interview,
    job,
  },
});
