import baseUrl from "../../api";
export async function getAllEnterprise() {
  try {
    const response = await baseUrl.get("/enterprise");
    return response.data;
  } catch (err) {
    console.log("Lỗi lấy doanh nghiệp", err);
    throw new Error("Không lấy được doanh nghiệp");
  }
}
export async function getEnterpriseById(id) {
  try {
    const response = await baseUrl.get(`/enterprise/${id}`);
    return response.data;
  } catch (err) {
    console.log("lỗi khi lấy doanh nghiệp", err);
    throw new Error("Không thấy được doanh nghiệp");
  }
}

export async function updateEnterprise({ id, ...updateData }) {
  try {
    await baseUrl.patch(`/enterprise/${id}`, updateData);
  } catch (error) {
    console.error("Lỗi cập nhật doanh nghiệp:", error);
    throw new Error("Không cập nhật được doanh nghiệp");
  }
}

export async function addEnterprise(enterpriseData) {
  try {
    await baseUrl.post("/enterprise", enterpriseData);
  } catch (error) {
    console.log("Lỗi thêm doanh nghiệp", error);
    throw new Error("Không thêm được doanh nghiệp");
  }
}

export async function deleteEnterprise(id) {
  try {
    await baseUrl.delete(`/enterprise/${id}`);
  } catch (error) {
    console.error("Lỗi xóa doanh nghiệp", error);
    throw new Error("Không xóa được doanh nghiệp");
  }
}
