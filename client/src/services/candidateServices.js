import baseUrl from "../../api";
export async function getAllCandidates() {
  try {
    const response = await baseUrl.get("/users");
    const activeCandidates = response.data.filter(
      (user) => user.role === "user"
    );
    return activeCandidates;
  } catch (error) {
    console.error("Error fetching candidates:", error);
    throw new Error("Không lấy được ứng viên");
  }
}

export async function getCandidateById(id) {
  try {
    const response = await baseUrl.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching candidate by ID:", error);
    throw new Error("Không lấy được ứng viên");
  }
}

export async function getCandidateByYear() {
  try {
    const res = await getAllCandidates();
    const yearCandidate = res.filter(
      (candidate) => candidate.yearsOfExperience >= 3
    );
    return yearCandidate;
  } catch (error) {
    console.log("Khong lay duoc uong vien theo nam kinh nghiem");
  }
}
