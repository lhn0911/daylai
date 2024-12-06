<template>
  <div class="banner">
    <div class="text-container">
      <h1 class="banner-title">Ứng viên nổi bật</h1>
      <div class="text-bottom">
        Rikkei Jobs - đồng hành trên phát triển con đường sự nghiệp của bạn.
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.banner {
  width: 100%;
  height: 435px;
  background: linear-gradient(
      0deg,
      rgba(25, 16, 58, 0.6) -56.78%,
      rgba(25, 16, 58, 0.5) 157.76%
    ),
    url("../../images/bannerCandidate.png") center center / cover no-repeat;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-container {
  text-align: center;
  width: 100%;
  /* max-width: 800px; */
}

.banner-title {
  color: white;
  font-size: 42px;
  font-weight: bold;
}
.text-bottom {
  color: rgba(255, 255, 255, 1);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  text-align: center;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}
</style>
