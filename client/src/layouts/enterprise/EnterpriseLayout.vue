
<template>
  <div class="">
    <HeaderEnterprise />

    <div class="flex">
      <SliderEnterprise />
      <div class="flex-1 flex flex-col">
        <main class="bg-gray-100 p-6">
          <router-view />
        </main>
      </div>
    </div>
    <FooterEnterprise />
  </div>
</template>
  
  <script setup>
import PaginationEnterprise from "@/views/enterprise/jobs/PaginationEnterprise.vue";
import FooterEnterprise from "./FooterEnterprise.vue";
import HeaderEnterprise from "./HeaderEnterprise.vue";
import SliderEnterprise from "./SliderEnterprise.vue";
</script>
  
  <style scoped>
/* Add any additional styling here */
</style>