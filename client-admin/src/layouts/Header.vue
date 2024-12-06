<template>
  <header
    class="bg-white text-red-600 h-16 px-6 flex items-center justify-between shadow"
  >
    <h1 class="text-xl font-bold">Rikkei Job Manager System</h1>
    <div class="flex items-center space-x-4" v-if="isAdminLogin">
      <span class="text-gray-600">hi, <strong>Admin</strong></span>
      <div>
        <img
          class="w-16 h-16"
          src="https://static.vecteezy.com/system/resources/previews/009/734/564/non_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg"
          alt=""
        />
      </div>
      <button @click="logOut" class="bg-red-500 text-white px-4 py-1 rounded">Log out</button>
    </div>
    <div class="flex items-center space-x-4" v-else>
      <div>
        <img
          class="w-16 h-16"
          src="https://static.vecteezy.com/system/resources/previews/009/734/564/non_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg"
          alt=""
        />
      </div>
      <button @click="signIn"  class="bg-red-500 text-white px-4 py-1 rounded">Sign in</button>
    </div>
  </header>
</template>

<script setup>
import {ref, onMounted } from "vue"
import {useRouter} from 'vue-router'
const router = useRouter();

  const admin = JSON.parse(localStorage.getItem('adminLogin'));
  if (!admin) {
    router.push('/loginAdmin'); 
  }
  const isAdminLogin = ref(admin !==null);



const logOut = () => {
  localStorage.removeItem("adminLogin");
  isAdminLogin.value = false;
  router.push("/loginAdmin");
}
const signIn = () => {
  router.push("/loginAdmin");
}
</script>

<style scoped></style>
