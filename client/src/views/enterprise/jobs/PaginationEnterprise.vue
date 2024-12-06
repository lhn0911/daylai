<template>
  <div class="container">
    <div class="icon-container">
      <div
        class="icon"
        :class="{ active: currentIndex === 0 }"
        @click="currentIndex = 0"
      >
        1
      </div>
      <div
        class="icon"
        :class="{ active: currentIndex === 1 }"
        @click="currentIndex = 1"
      >
        2
      </div>
      <div
        class="icon"
        :class="{ active: currentIndex === 2 }"
        @click="currentIndex = 2"
      >
        ...
      </div>
      <div
        class="icon"
        :class="{ active: currentIndex === 3 }"
        @click="currentIndex = 3"
      >
        8
      </div>
      <div
        class="icon"
        :class="{ active: currentIndex === 4 }"
        @click="currentIndex = 4"
      >
        9
      </div>
      <div
        class="icon"
        :class="{ active: currentIndex === 5 }"
        @click="currentIndex = 5"
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15 18l-6-6 6-6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div
        class="icon"
        :class="{ active: currentIndex === 6 }"
        @click="currentIndex = 6"
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9 18l6-6-6-6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { ref } from "vue";
const currentIndex = ref(0);

// currentIndex
</script>
  
  <style scoped>
.container {
  display: flex;
  justify-content: end;
  align-items: end;
}

.icon-container {
  display: flex;
  gap: 16px;
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #f0f0f0;
  color: #333;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.icon.active {
  background-color: rgba(248, 233, 234, 1);
  color: rgba(171, 31, 36, 1);
}

.icon svg {
  width: 16px;
  height: 16px;
}
</style>