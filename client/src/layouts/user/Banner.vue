<template>
  <div class="banner">
    <div class="text-container">
      <h1 class="banner-title">Tìm kiếm việc làm cùng Rikkei Jobs!</h1>
      <div class="search-container">
        <div class="search-input">
          <span class="material-symbols-outlined search-icon">
            <img height="20px" width="20px" src="../../images/search.png" alt="">
          </span>
          <input
            type="text"
            placeholder="Vị trí ứng tuyển"
            class="input-field"
          />
        </div>
        <div class="location-selector">
          <span class="material-symbols-outlined location-icon"
            >
            <img height="20px" width="20px" src="../../images/location.png" alt=""></span
          >
          Tất cả địa điểm
          <span class="material-symbols-outlined dropdown-icon"
            >
            <img height="20px" width="20px" src="../../images/arrow-down.png" alt="">
            </span
          >
        </div>
        <button class="search-button">Tìm kiếm</button>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.banner {
  width: 100%;
  height: 435px;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("../../images/banner.png") center center / cover no-repeat;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-container {
  text-align: center;
  width: 100%;
  /* max-width: 800px; */
  padding: 0 20px;
}

.banner-title {
  color: white;
  font-size: 42px;
  margin-bottom: 30px;
  font-weight: bold;
}

.search-container {
  display: flex;
  
  /* background-color: white; */
  border-radius: 8px;
  overflow: hidden;
  max-width: 800px;
  margin: 0 auto;
  gap:20px;
}

.search-input {
  display: flex;
  align-items: center;
  padding: 16px;
  flex: 1;
  font-size: 16px;
  gap: 10px;
  
  border-radius: 15px;
   background-color: white;
}

.search-icon {
  color: #666;
}

.input-field {
  border: none;
  outline: none;
  width: 100%;
  font-size: 16px;
}

.location-selector {
  display: flex;
  align-items: center;
  padding: 16px;
  border-left: 1px solid #ddd;
  gap: 8px;
   background-color: white;
     border-radius: 15px;

  min-width: 200px;
  cursor: pointer;
}

.location-icon,
.dropdown-icon {
  color: #666;
}

.search-button {
  background-color: #9e1c3f;
  color: white;
  border: none;
  padding: 8px 32px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
    border-radius: 15px;

}

.search-button:hover {
  background-color: #7e1632;
}
</style>
