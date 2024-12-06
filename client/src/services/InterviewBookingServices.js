import baseUrl from "../../api";

// Lấy tất cả các buổi phỏng vấn
export async function getAllInterviewBookings() {
  try {
    const response = await baseUrl.get("/interviewBooking");
    console.log("interviewBooking sv", response.data);
    return response.data;
  } catch (err) {
    console.log("Lỗi lấy interview booking", err);
    throw new Error("Không lấy được interview booking");
  }
}

// Lấy buổi phỏng vấn theo ID
export async function getInterviewBookingById(id) {
  try {
    const response = await baseUrl.get(`/interviewBooking/${id}`);
    return response.data;
  } catch (err) {
    console.log("Lỗi khi lấy interview booking", err);
    throw new Error("Không thấy được interview booking");
  }
}

// Cập nhật thông tin buổi phỏng vấn
export async function updateInterviewBooking(interviewData) {
  try {
    await baseUrl.patch(`/interviewBooking/${interviewData.id}`, {
      date: interviewData.date,
      time: interviewData.time,
      interviewMethod: interviewData.interviewMethod,
      meetingLink: interviewData.meetingLink,
      meetingStartTime: interviewData.meetingStartTime,
    });
  } catch (err) {
    console.log("Lỗi sửa interview booking", err);
    throw new Error("Không sửa được interview booking");
  }
}
// Thêm buổi phỏng vấn mới
export async function addInterviewBooking(interviewData) {
  try {
    await baseUrl.post("/interviewBooking", interviewData);
  } catch (error) {
    console.log("Lỗi thêm interview booking", error);
    throw new Error("Không thêm được interview booking");
  }
}

// Xóa buổi phỏng vấn
export async function deleteInterviewBooking(id) {
  try {
    await baseUrl.delete(`/interviewBooking/${id}`);
  } catch (error) {
    console.log("Lỗi xóa interview booking", error);
    throw new Error("Không xóa được interview booking");
  }
}
