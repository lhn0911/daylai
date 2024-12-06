import baseUrl from "../../api";

export async function getCarousel(){
    const response = await baseUrl.get("/carousel");
    return response.data
}
export async function deleteCarousel(id){
    await baseUrl.delete(`/carousel/${id}`);
}
export async function createCarousel(carouselData){
    await baseUrl.post("/carousel", carouselData);
}
export async function updateCarousel(id){
    await baseUrl.patch(`/carousel/${id}`);
}