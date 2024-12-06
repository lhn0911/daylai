<template>
  <div class="banner-wrapper">
    <div class="banner-overlay"></div>
    <div class="banner-image">
      <img src="../../images/bannerJobHuman.png" alt="Banner human" />
    </div>
    <div class="banner-content">
      <h1 class="banner-title">Khởi đầy tiềm lực - Mở lối thành công!</h1>
      <p class="banner-subtitle">
        Rikkei Jobs - đồng hành trên phát triển con đường sự nghiệp của bạn.
      </p>

      <div class="features-container">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="feature-item"
        >
          <div class="feature-icon">
            <img :src="feature.icon" />
          </div>
          <span class="feature-text">{{ feature.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const features = ref([
  {
    icon: "./src/images/tick.png",
    text: "Lương cao",
  },
  {
    icon: "./src/images/tick.png",
    text: "Phúc lợi hấp dẫn",
  },
  {
    icon: "./src/images/tick.png",
    text: "Môi trường chuyên nghiệp",
  },
  {
    icon: "./src/images/tick.png",
    text: "Cơ hội thăng tiến",
  },
]);
</script>

<style scoped>
.banner-wrapper {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  font-family: Arial, sans-serif;
  background-image: url("../../images/bannerJob.png");
  background-size: cover;
  background-position: center;
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    0deg,
    rgba(25, 16, 58, 0.6) -56.78%,
    rgba(25, 16, 58, 0.5) 157.76%
  );
}

/* Add banner image styles */
.banner-image {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 1;
  height: 100%;
  display: flex;
  align-items: flex-end;
}

.banner-image img {
  height: 100%;
  object-fit: contain;
  max-width: 100%;
}

.banner-content {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 90px 20px;
  text-align: center;
  color: white;
}

.banner-title {
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 16px;
  line-height: 1.2;
}

.banner-subtitle {
  font-size: 20px;
  margin-bottom: 40px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 400;
}

.features-container {
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}

.feature-item {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 1);
  padding: 8px 24px;
  border-radius: 25px;
  backdrop-filter: blur(5px);
  transition: transform 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-2px);
}

.feature-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.feature-text {
  color: rgba(61, 61, 61, 1);
  font-size: 16px;
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 768px) {
  .banner-title {
    font-size: 32px;
  }

  .banner-subtitle {
    font-size: 18px;
  }

  .features-container {
    gap: 16px;
    flex-direction: column;
    align-items: center;
  }

  .feature-item {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }

  .banner-image {
    opacity: 0.5; /* Make image more transparent on mobile */
    right: 50%;
    transform: translateX(50%);
  }

  .banner-image img {
    height: 80%;
  }
}
</style>
