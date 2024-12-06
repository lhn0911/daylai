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
