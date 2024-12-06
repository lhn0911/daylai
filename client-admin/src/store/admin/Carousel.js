import {
    getCarousel,
    updateCarousel,
    createCarousel,
    deleteCarousel,
} from "@/services/CarouselServices"
const carousel = {
    state:{
        carousels: [],
        currentCarousel: null,
    },
    getters:{},
    mutations: {
        setCarousel(state, carousels){
            state.carousels = carousels;
        },
        addCarousel(state, carousel){
            state.carousels.push(carousel);
        },
        updateCarouselMutation(state, updatedCarousel){
            const index = state.carousels.findIndex((carousel)=> carousel.id === updatedCarousel.id);
            if (index !== -1) {
                state.carousels.splice(index, 1, updatedCarousel);
              }
        },
        deleteCarouselMutation(state, id){
            state.carousels = state.carousels.filter((carousel)=> carousel.id !== id);
        }
    },
    actions:{
        async fetchAllCarousels({commit}){
            const carousels = await getCarousel();
            commit("setCarousel", carousels);
        },
        async createCarousel({commit}, carouselData) {
            const newCarousel = await createCarousel(carouselData);
            commit("addCarousel", newCarousel)
        },
        async updateCarousel({commit}, carouselData){
            await updateCarousel(carouselData);
            commit("updateCarouselMutation", carouselData)
        },
        async deleteCarousel({commit},id){
            await deleteCarousel(id);
            commit("deleteCarouselMutation",id)
        }
    }
}
export default carousel