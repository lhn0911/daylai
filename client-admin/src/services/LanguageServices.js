import baseUrl from "../../api";
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

export async function addedLanguage(languageData) {
  try {
    await baseUrl.post("/languages", languageData);
  } catch (error) {
    console.log("khong them duoc ngon ngu", error);

  }
}
export async function updatedLanguage(id, data) {
  // dung destructering để hứng 
  try {
    await baseUrl.patch(`/languages/${id}`, data);
  } catch (error) {
    console.log("khong cap nhat duoc ngon ngu", error);
  }
}
export async function deletedLanguage(id) {
  try {
    await baseUrl.delete(`/languages/${id}`);
  } catch (error) {
    console.log("khong xoa duoc ngon ngu", error);

  }
}
export async function searchLanguageByName(name) {
  const res = await baseUrl.get(`/languages/?name_like=${name}`);
  return res.data;
}