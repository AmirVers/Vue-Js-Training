<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import cardList from '../components/cardList.vue'

const favourites = ref([])
const isEmpty = ref(true)
const isLoading = ref(true)

onMounted(async () => {
  try {
    const { data } = await axios.get('https://a3aa9529fde18524.mokky.dev/favourite')
    favourites.value = data.map((obj) => obj.item)
    isEmpty.value = favourites.value.length === 0
  } catch (err) {
    console.log(err)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div>
    <div v-if="isLoading" class="flex text-center items-center justify-center">
      <p class="text-3xl text-red-400 font-bold">Loading...</p>
    </div>
    <div v-else>
      <div
        v-if="isEmpty"
        class="flex flex-col items-center h-screen justify-center -translate-y-28"
      >
        <div class="flex flex-col items-center text-center">
          <img width="70" height="70" src="/emoji-1.png" alt="sad" />
          <h2 class="text-xl font-semibold">Закладок нет :(</h2>
          <h3>Вы ничего не добавляли в закладки</h3>
        </div>
        <router-link to="/"
          ><button
            class="mt-6 transition text-center rounded-2xl bg-lime-500 text-white py-3 px-12 hover:bg-lime-600"
          >
            Вернуться назад
          </button></router-link
        >
      </div>
      <div v-else class="flex items-center">
        <router-link to="/"
          ><svg
            class="opacity-50 cursor-pointer transition rotate-180 mb-3 ml-4 border-2 border-gray-200 rounded-xl p-2 hover:opacity-100"
            width="34"
            height="34"
            viewBox="0 0 7 12"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 0.999999L6 6L1 11"
              stroke="#C8C8C8"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            /></svg
        ></router-link>
        <h2 class="text-3xl font-semibold mb-4 pl-4">Мои закладки</h2>
      </div>
      <cardList :items="favourites" @onClickAdd="onClickCartAction" is-favorites />
    </div>
  </div>
</template>
