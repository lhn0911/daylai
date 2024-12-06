import baseUrl from "../../api";
// api lay tat ca cong ty
export async function getAllEnterprise() {
  try {
    const response = await baseUrl.get("/enterprise");
    console.log("enterprise sv", response.data);
    return response.data;
  } catch (err) {
    console.log("Lỗi lấy enterprise", err);
    throw new Error("Không lấy được enterprise");
  }
}
// api lay thong tin cong ty theo id
export async function getEnterpriseById(id) {
  try {
    const response = await baseUrl.get(`/enterprise/${id}`);
    return response.data;
  } catch (err) {
    console.log("lỗi khi lấy enterprise", err);
    throw new Error("Không thấy được enterprise");
  }
}
// api update thong tin 1 cong ty
export async function updateEnterprise(id, updateDataEnterprise) {
  try {
    const response = await baseUrl.patch(
      `/enterprise/${id}`,
      updateDataEnterprise
    );
    return response.data;
  } catch (err) {
    console.log("Lỗi sửa enterprise", err);
    throw new Error("Không sửa được enterprise");
  }
}

// api them cong ty moi
export async function addEnterprise(enterpriseData) {
  try {
    await baseUrl.post("/enterprise", enterpriseData);
  } catch (error) {
    console.log("Lỗi thêm enterprise", error);
    throw new Error("Không thêm được enterprise");
  }
}
