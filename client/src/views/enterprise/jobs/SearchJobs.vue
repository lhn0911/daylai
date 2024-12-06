<template>
  <div class="container112">
    <div class="search-container">
      <button>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.58464 17.5C13.9569 17.5 17.5013 13.9556 17.5013 9.58332C17.5013 5.21107 13.9569 1.66666 9.58464 1.66666C5.21238 1.66666 1.66797 5.21107 1.66797 9.58332C1.66797 13.9556 5.21238 17.5 9.58464 17.5Z"
            stroke="#BC2228"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M18.3346 18.3333L16.668 16.6667"
            stroke="#BC2228"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <input
        type="text"
        placeholder="Tìm kiếm tin tuyển dụng theo tiêu đề hoặc mã tin"
      />
    </div>
    <router-link to="/enterprise/add-job">
      <button class="add-form" @click="addEnterprise">
        <span>
          <i class="fa fa-plus-circle" aria-hidden="true"></i>
        </span>
        Thêm công việc
      </button>
    </router-link>
  </div>
</template>
  
  <script setup>
</script>
  
  <style scoped>
.container112 {
  /* width: 1000px; */
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 200px;
  /* width: 100%; */
}
.search-container {
  display: flex;
  justify-content: start;
  align-items: center;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 8px 12px;
  width: 600px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* width: 100%; */
  max-width: 500px;
  border: 1px solid #ccc;
  margin: 0 auto;
}
.add-form {
  background-color: #f8e9ea;
  color: #dc2626;
  display: flex;
  align-items: center;
  height: 59px;
  /* width: 100%; */
  justify-content: end;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;
}
.search-container svg {
  margin-right: 8px;
}

.search-container input {
  width: 100%;
  padding: 10px;

  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: all 0.3s ease;
  background-color: #f9f9f9;
}

.search-container input:focus {
  border-color: #bc2228;
  box-shadow: 0 0 5px rgba(188, 34, 40, 0.3);
}

.search-container input::placeholder {
  color: #888;
}
</style>
