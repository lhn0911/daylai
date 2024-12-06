import baseUrl from "../../api";
export async function getAllJobs() {
  try {
    const response = await baseUrl.get("/job");
    const openJobs = response.data.filter(
      (job) => job.status === "đã xác nhận"
    );
    return openJobs;
  } catch (error) {
    console.log("Error fetching jobs", error);
    throw new Error("khong lay duoc cong viec");
  }
}

export async function getJobByLevel() {
  const res = await getAllJobs();
  const levelJobs = res.filter(
    (job) => Array.isArray(job.levels) && job.levels.includes("Senior")
  );
  return levelJobs;
}

export async function getAllJobsNoFilter() {
  try {
    const response = await baseUrl.get("/job");
    return response.data;
  } catch (error) {
    console.log("Error fetching jobs", error);
    throw new Error("khong lay duoc cong viec");
  }
}

export async function getJobById(id) {
  try {
    const response = await baseUrl.get(`/job/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error fetching candidates by id", error);
    throw new Error("khong lay duoc cong viec theo id");
  }
}
export async function getSavedJobs() {
  try {
    const res = await getAllJobs();
    const savedJob = res.filter((job) => job.isSaved === true);
    return savedJob;
  } catch (error) {
    console.log(error);
  }
}
export async function deleteJob(id) {
  try {
    const response = await baseUrl.delete(`/job/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error deleting job", error);
    throw new Error("khong xoa duoc cong viec");
  }
}
