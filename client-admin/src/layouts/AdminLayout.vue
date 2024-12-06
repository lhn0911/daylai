<template>
  <div class="flex">
    <Sidebar />
    <div class="flex-1 flex flex-col">
      <Header />
      <main class="bg-gray-100 h-[calc(100vh-64px)] p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "@/layouts/Sidebar.vue";
import Header from "@/layouts/Header.vue";
</script>

<style scoped>

</style>
