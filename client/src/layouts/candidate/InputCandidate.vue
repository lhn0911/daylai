<template>
  <div class="search-container">
    <div class="select-wrapper">
      <img src="../../images/briefcase2.png" alt="Location" />
      <select>
        <option value="">Vị trí</option>
      </select>
    </div>

    <div class="select-wrapper">
      <img src="../../images/personalcard.png" alt="User" />
      <select>
        <option value="">Tên ứng viên</option>
      </select>
    </div>

    <div class="select-wrapper">
      <img src="../../images/award.png" alt="Experience" />
      <select>
        <option value="">Kinh nghiệm làm việc</option>
      </select>
    </div>

    <button class="search-btn">Tìm kiếm</button>
  </div>
</template>

<script setup>
// Add your setup logic here when needed
</script>

<style scoped>
.search-container {
  display: flex;
  gap: 12px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.select-wrapper {
  position: relative;
  flex: 1;
}

.select-wrapper select {
  width: 100%;
  padding: 12px 35px 12px 40px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  appearance: none;
  background: white;
  font-size: 14px;
  cursor: pointer;
}

.select-wrapper::after {
  content: "";
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #666;
  pointer-events: none;
}

.select-wrapper img {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
}

.search-btn {
  padding: 12px 24px;
  background: #b32024;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
  white-space: nowrap;
}

.search-btn:hover {
  background: #8b1820;
}

/* Responsive */
@media (max-width: 768px) {
  .search-container {
    flex-direction: column;
  }

  .select-wrapper {
    width: 100%;
  }
}
</style>