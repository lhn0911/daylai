import baseUrl from "../../api";

export async function getAllCvs() {
  try {
    const response = await baseUrl.get("/cvs");
    return response.data;
  } catch (error) {
    console.error("Error fetching CVs:", error);
    throw new Error("Không lấy được danh sách CVs");
  }
}

export async function createCv(cvData) {
  try {
    await baseUrl.post("/cvs", cvData);
  } catch (error) {
    console.error("Lỗi thêm CV:", error);
    throw new Error("Không thêm được CV");
  }
}

export async function updateCv({ id, ...updateData }) {
  try {
    await baseUrl.patch(`/cvs/${id}`, updateData);
  } catch (error) {
    console.error("Lỗi cập nhật CV:", error);
    throw new Error("Không cập nhật được CV");
  }
}

export async function deleteCv(id) {
  try {
    await baseUrl.delete(`/cvs/${id}`);
  } catch (error) {
    console.error("Lỗi xóa CV:", error);
    throw new Error("Không xóa được CV");
  }
}

export async function getAllLanguages() {
  try {
    const response = await baseUrl.get("/languages");
    return response.data;
  } catch (error) {
    console.error("Error fetching languages:", error);
    throw new Error("Không lấy được danh sách ngôn ngữ");
  }
}

export async function getActiveLanguages() {
  try {
    const response = await baseUrl.get("/languages?status=active");
    return response.data;
  } catch (error) {
    console.error("Error fetching active languages:", error);
    throw new Error("Không lấy được danh sách ngôn ngữ hoạt động");
  }
}
