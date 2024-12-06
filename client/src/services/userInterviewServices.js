import baseUrl from "../../api";

// Lấy tất cả lịch phỏng vấn
export async function getAlluserInterview() {
  try {
    const response = await baseUrl.get("/interviewBooking");
    return response.data;
  } catch (error) {
    console.error("Lỗi lấy lịch phỏng vấn:", error);
    throw new Error("Không lấy được lịch phỏng vấn");
  }
}

// Thêm lịch phỏng vấn
export async function createInterview(interviewData) {
  try {
    await baseUrl.post("/interviewBooking", interviewData);
  } catch (error) {
    console.error("Lỗi thêm lịch phỏng vấn:", error);
    throw new Error("Không thêm được lịch phỏng vấn");
  }
}

// Cập nhật lịch phỏng vấn
export async function updateInterview({ id, ...interviewData }) {
  try {
    await baseUrl.patch(`/interviewBooking/${id}`, interviewData);
  } catch (error) {
    console.error("Lỗi cập nhật lịch phỏng vấn:", error);
    throw new Error("Không cập nhật được lịch phỏng vấn");
  }
}

// Xóa lịch phỏng vấn
export async function deleteInterview(id) {
  try {
    await baseUrl.delete(`/interviewBooking/${id}`);
  } catch (error) {
    console.error("Lỗi xóa lịch phỏng vấn:", error);
    throw new Error("Không xóa được lịch phỏng vấn");
  }
}

// Lấy chi tiết lịch phỏng vấn theo ID
export async function getInterviewById(id) {
  try {
    const response = await baseUrl.get(`/interviewBooking/${id}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi lấy chi tiết lịch phỏng vấn:", error);
    throw new Error("Không lấy được chi tiết lịch phỏng vấn");
  }
}
