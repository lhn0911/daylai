import baseUrl from "../../api";

export async function getAllUser() {
  try {
    const response = await baseUrl.get("/users");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    a;
    throw new Error("Không lấy được user");
  }
}

export async function getUserById(id) {
  try {
    const response = await baseUrl.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi lấy user:", error);
    throw new Error("Không lấy được user");
  }
}

export async function updateUser({ id, ...updateData }) {
  try {
    await baseUrl.patch(`/users/${id}`, updateData);
  } catch (error) {
    console.error("Lỗi sửa user:", error);
    throw new Error("Không lấy được user để sửa");
  }
}

export async function createUser(userData) {
  try {
    await baseUrl.post("/users", userData);
  } catch (error) {
    console.error("Lỗi thêm user:", error);
    throw new Error("Không thêm được user");
  }
}
