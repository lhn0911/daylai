<template>
  <div class="">
    <HeaderEnterprise />

    <div class="">
      <SliderManager v-if="isUserLogin" />

      <SliderEnterpriseAll v-else-if="isPartnerLogin" />
    </div>

    <FooterEnterprise />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import FooterEnterprise from "../enterprise/FooterEnterprise.vue";
import HeaderEnterprise from "../enterprise/HeaderEnterprise.vue";
import SliderEnterpriseAll from "./SliderEnterpriseAll.vue";
import SliderManager from "./SliderManager.vue";

const isUserLogin = ref(false);
const isPartnerLogin = ref(false);

const checkLoginStatus = () => {
  const userLoginStatus = localStorage.getItem("UserLogin");
  const partnerLoginStatus = localStorage.getItem("PartnerLogin");

  if (userLoginStatus) {
    isUserLogin.value = true;
  } else if (partnerLoginStatus) {
    isPartnerLogin.value = true;
  }
};

onMounted(() => {
  checkLoginStatus();
});
</script>

<style scoped>
</style>
