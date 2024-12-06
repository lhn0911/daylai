import { createStore } from "vuex";
import user from "./user/User";
import enterprise from "./enterprise/Enterprise";
import certify from "./user/Certify";
import candidate from "./user/Candidate";
import cv from "./user/CV";
import interviewBooking from "./enterprise/InterviewBooking";
import job from "./user/Job";
import interview from "./user/Interview";
export default createStore({
  modules: {
    user,
    enterprise,
    certify,
    candidate,
    cv,
    interviewBooking,
    job,
    interview,
  },
});
