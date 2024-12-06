import baseUrl from "../../api";

export async function getAllUserCertificates() {
  try {
    const response = await baseUrl.get("/userCertificate");
    return response.data;
  } catch (error) {
    console.log("Không lấy được danh sách chứng chỉ người dùng:", error);
    throw new Error("Không lấy được danh sách chứng chỉ người dùng");
  }
}

export async function createUserCertificate(userCertificate) {
  try {
    await baseUrl.post("/userCertificate", userCertificate);
  } catch (error) {
    console.log("Không thêm được chứng chỉ người dùng:", error);
    throw new Error("Không thêm được chứng chỉ người dùng");
  }
}

export async function updateUserCertificate({ id, ...updateData }) {
  try {
    await baseUrl.patch(`/userCertificate/${id}`, updateData);
  } catch (error) {
    console.error("Lỗi sửa chứng chỉ người dùng:", error);
    throw new Error("Không sửa được chứng chỉ người dùng");
  }
}

export async function deleteUserCertificate(id) {
  try {
    await baseUrl.delete(`/userCertificate/${id}`);
  } catch (error) {
    console.log("Không xóa được chứng chỉ người dùng:", error);
    throw new Error("Không xóa được chứng chỉ người dùng");
  }
}



export async function getAllCertificateTypes() {
  try {
    const response = await baseUrl.get("/certificate");
    return response.data;
  } catch (error) {
    console.log("Không lấy được danh sách loại chứng chỉ:", error);
    throw new Error("Không lấy được danh sách loại chứng chỉ");
  }
}

export async function getCertificateTypeById(id) {
  try {
    const response = await baseUrl.get(`/certificate/${id}`);
    return response.data;
  } catch (error) {
    console.log(`Không lấy được loại chứng chỉ với ID ${id}`, error);
    throw new Error(`Không lấy được loại chứng chỉ với ID ${id}`);
  }
}

export async function createCertificateType(certificateType) {
  try {
    await baseUrl.post("/certificate", certificateType);
  } catch (error) {
    console.log("Không thêm được loại chứng chỉ:", error);
    throw new Error("Không thêm được loại chứng chỉ");
  }
}
export async function updateCertificate({ id, ...updateData }) {
  try {
    await baseUrl.patch(`/certificate/${id}`, updateData);
  } catch (error) {
    console.error("Lỗi sửa chứng :", error);
    throw new Error("Không sửa được chứng ");
  }
}
export async function deleteCertificate(id){
  try {
    await baseUrl.delete(`/certificate/${id}`);
  } catch (error) {
    console.log(error);
    
  }
}
