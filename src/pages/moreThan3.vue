<script setup>
import { ref, onMounted } from 'vue'

const isLoading = ref(true)

onMounted(async () => {
  isLoading.value = false
})
</script>

<template>
  <div>
    <div v-if="isLoading" class="flex text-center items-center justify-center">
      <p class="text-3xl text-red-400 font-bold">Loading...</p>
    </div>

    <div class="flex flex-col items-center h-screen justify-center -translate-y-28">
      <div class="flex flex-col items-center border border-red-500 rounded-xl p-10">
        <img width="80" height="80" src="/stop.png" alt="stop" />
        <h2 class="text-3xl font-bold text-center mt-7 text-red-700 leading-10 tracking-wide">
          Нельзя ложить в корзину <br />
          больше 3 пар кроссовок
        </h2>
        <router-link to="/"
          ><button
            class="mt-8 transition text-center rounded-2xl bg-red-400 text-white py-3 px-12 hover:bg-red-500 hover:-translate-y-1"
          >
            Вернуться назад
          </button></router-link
        >
      </div>
    </div>
  </div>
</template>
