<template>
  <div class="banner-footer">
    <div class="banner-title">
      <h2 class="title-text">Tại sao chọn chúng tôi?</h2>
    </div>

    <div class="stats-grid">
      <div v-for="(item, index) in stats" :key="index" class="stat-card">
        <div class="stat-label">{{ item.label }}</div>
        <div class="stat-value">{{ item.value }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const stats = [
  { label: "Số năm kinh nghiệm", value: "10+" },
  { label: "Khách hàng quốc tế", value: "500+" },
  { label: "Dự án thành công", value: "1000+" },
  { label: "Văn phòng và chi nhánh", value: "10" },
  { label: "Top công ty Công nghệ tại Việt Nam", value: "Top 3" },
  { label: "Tỷ lệ khách hàng hài lòng", value: "97%" },
];
</script>

<style scoped>
.banner-footer {
  /* width: 100%; */
  height: 486px;
  border: 1px solid black;
  background-image: url('../../images/banner2.png');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 2rem;
}

.banner-title {
  /* width: 100%; */
  display: flex;
  justify-content: center;
  position: relative;
  left: -270px;
  margin-bottom: 30px;
}

.title-text {
  color: white;
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.2;
  display: flex;
  align-items: center;
  font-family: 'SF Pro Display', sans-serif;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 1024px) {
  .stats-grid {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

.stat-card {
  width: 100%;
  height: 6rem;
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stat-label {
  color: #3d3d3d;
  font-size: 0.875rem;
  font-weight: 400;
  margin-bottom: 0.25rem;
  font-family: 'SF Pro Display', sans-serif;
}

.stat-value {
  color: #bc2228;
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.2;
  font-family: 'SF Pro Display', sans-serif;
}
</style>
