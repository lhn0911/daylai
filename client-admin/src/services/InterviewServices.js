import baseUrl from "../../api";

export async function getAllInterviews() {
  try {
    const response = await baseUrl.get("/interviewBooking");
    return response.data;
  } catch (error) {
    console.error("Error fetching interview:", error);
    throw new Error("Không lấy được danh sách interview");
  }
}

export async function moveToStatusAdmin({ id, ...updateData }) {
  try {
    await baseUrl.patch(`/interviewBooking/${id}`, updateData);
  } catch (err) {
    console.log("lỗi cập nhật status", err);
    throw new Error("Không cập nhật được status interview");
  }
}

export async function updateInterview({ id, ...updateData }) {
  try {
    await baseUrl.patch(`/interviewBooking/${id}`, updateData);
  } catch (error) {
    console.error("Lỗi cập nhật interview:", error);
    throw new Error("Không cập nhật được interview");
  }
}
