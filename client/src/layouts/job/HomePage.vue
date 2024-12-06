<template>
  <div>
    <HeaderEnterprise></HeaderEnterprise>
    <BannerJob></BannerJob>
    <br />
    <br />
    <!-- <Input></Input> -->
    <AllJobs></AllJobs>
    <FooterEnterprise></FooterEnterprise>
  </div>
</template>

<script setup>
import HeaderEnterprise from "../enterprise/HeaderEnterprise.vue";
import BannerJob from "./BannerJob.vue";
import Input from "./Input.vue";
import AllJobs from "./AllJobs.vue";
import FooterEnterprise from "../enterprise/FooterEnterprise.vue";
</script>

<style scoped>
</style>