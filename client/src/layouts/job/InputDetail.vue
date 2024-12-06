<template>
  <div class="search-bar-container">
    <div class="search-bar">
      <!-- Position Search Input -->
      <div class="search-input-wrapper">
        <img
          src="../../images/searchRed.png"
          alt="Search"
          class="search-icon"
        />
        <input
          type="text"
          placeholder="Tên việc làm"
          v-model="searchPosition"
          class="search-input position-input"
        />
      </div>

      <!-- Industry Dropdown -->
      <div class="dropdown-wrapper">
        <img
          src="../../images/briefcase2.png"
          alt="Industry"
          class="dropdown-icon"
        />
        <select v-model="selectedIndustry" class="dropdown-select">
          <option value="">Tất cả ngành nghề</option>
          <!-- Add your industry options here -->
        </select>
        <img
          src="../../images/arrow-down.png"
          alt="Expand"
          class="chevron-icon"
        />
      </div>

      <!-- Location Dropdown -->
      <div class="dropdown-wrapper">
        <img
          src="../../images/location.png"
          alt="Location"
          class="dropdown-icon"
        />
        <select v-model="selectedLocation" class="dropdown-select">
          <option value="">Tất cả địa điểm</option>
          <!-- Add your location options here -->
        </select>
        <img
          src="../../images/arrow-down.png"
          alt="Expand"
          class="chevron-icon"
        />
      </div>

      <!-- Search Button -->
      <button class="search-button" @click="handleSearch">Tìm kiếm</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
</script>

<style scoped>
.search-bar-container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: white;
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.search-input-wrapper {
  flex: 2;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
}

.dropdown-wrapper {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
}

.search-icon,
.dropdown-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

.chevron-icon {
  width: 16px;
  height: 16px;
  position: absolute;
  right: 12px;
  pointer-events: none;
}

.search-input,
.dropdown-select {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  color: #374151;
}

.dropdown-select {
  appearance: none;
  padding-right: 24px; /* Space for chevron icon */
  cursor: pointer;
}

.search-button {
  padding: 12px 24px;
  background-color: #9f1239;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;
}

.search-button:hover {
  background-color: #881337;
}

/* Placeholder styles */
::placeholder {
  color: #9ca3af;
}

/* Responsive Design */
@media (max-width: 768px) {
  .search-bar {
    flex-direction: column;
    gap: 8px;
    padding: 12px;
  }

  .search-input-wrapper,
  .dropdown-wrapper {
    width: 100%;
  }

  .search-button {
    width: 100%;
  }
}
</style>