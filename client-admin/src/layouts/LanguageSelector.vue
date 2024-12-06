<template>
    <div class="relative p-4">
      <button
        @click="toggleDropdown"
        class="bg-white text-gray-900 rounded p-2 flex items-center w-32 justify-between"
      >
        <span>{{ getLanguageName(selectedLanguage) }}</span>
        <i :class="`fas ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`"></i>
      </button>
  
      <div
        v-if="isOpen"
        class="absolute bottom-full mb-2 w-32 bg-white border border-gray-300 rounded shadow-lg"
      >
        <ul>
          <li
            v-for="(lang, code) in languages"
            :key="code"
            @click="selectLanguage(code)"
            class="p-2 hover:bg-gray-100 cursor-pointer"
          >
            {{ lang }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import "@fortawesome/fontawesome-free/css/all.css";
  
  const selectedLanguage = ref("english");
  const isOpen = ref(false);
  
  const languages = {
    english: "English",
    vietnamese: "Vietnamese",
    japanese: "Japanese",
  };
  
  const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
  };
  
  const selectLanguage = (lang) => {
    selectedLanguage.value = lang;
    isOpen.value = false;
  };
  
  const getLanguageName = (code) => languages[code] || "Unknown";
  </script>
  
  <style scoped>
  </style>
  