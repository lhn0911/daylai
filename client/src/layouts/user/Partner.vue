<template>
  <div class="partner-section">
    <div class="title">Đối tác tuyển dụng</div>
    <div class="partners-grid">
      <div v-for="(logo, index) in partnerLogos" :key="index.id" class="partner-logo">
        <img :src="logo.src" :alt="logo.alt" class="logo-image" />
      </div>
    </div>
    
  </div>
</template>

<script setup>
const partnerLogos = [
  { id:1 ,src: "./src/images/Usm.png" },
  { id:2 ,src: "./src/images/Studione.png", alt: "Fujikin" },
  { id:3 ,src: "./src/images/Sunloft.png", alt: "Studio Ne63" },
  { id:4, src: "./src/images/systena.png", alt: "Sunloft" },
  { id:5, src: "./src/images/Fujikin.png"},
  { id:6, src: "./src/images/Cloud.png", alt: "Systena" },
];


</script>

<style scoped>
.partner-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 336px;
  padding: 5rem 7.5rem;
  gap: 3rem;
}

.title {
  color: black;
  font-size: 2rem;
  font-weight: 600;
  font-family: 'SF Pro Display', sans-serif;
  line-height: 2.5rem;
  text-align: center;
}

.partners-grid {
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
}

.partner-logo {
  width: 173px;
  height: 88px;
  padding: 0.5rem 0.8rem;
  background-color: #f8f9fa;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-image {
  width: 147.33px;
  height: 73.66px;
}
</style>
