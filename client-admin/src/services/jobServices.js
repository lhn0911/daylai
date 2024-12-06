import baseUrl from "../../api";

export async function getAllJob() {
  try {
    const response = await baseUrl.get("/job");
    return response.data;
  } catch (error) {
    console.error("Error fetching job:", error);
    throw new Error("Không lấy được danh sách job");
  }
}

export async function updateJob({ id, ...updateData }) {
  try {
    await baseUrl.patch(`/job/${id}`, updateData);
  } catch (error) {
    console.error("Lỗi cập nhật job:", error);
    throw new Error("Không cập nhật được job");
  }
}
