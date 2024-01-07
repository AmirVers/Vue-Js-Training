<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import cardList from '../components/cardList.vue'

const orders = ref([])
const isLoading = ref(true)
const isEmpty = ref(true)

onMounted(async () => {
  try {
    const { data } = await axios.get('https://a3aa9529fde18524.mokky.dev/orders')
    console.log('data:', data)
    orders.value = data.flatMap((order) => order.items)
    isEmpty.value = orders.value.length === 0
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
          <img width="70" height="70" src="/emoji-2.png" alt="sad" />
          <h2 class="text-2xl font-semibold mt-5">У вас нет заказов</h2>
          <h3 class="mt-3 opacity-60 leading-6 tracking-wide">
            Вы нищеброд? <br />
            Оформите хотя бы один заказ
          </h3>
        </div>
        <router-link to="/"
          ><button
            class="mt-7 transition text-center rounded-2xl bg-lime-500 text-white py-3 px-12 hover:bg-lime-600"
          >
            Вернуться назад
          </button></router-link
        >
      </div>
      <div v-else class="flex items-center">
        <router-link to="/"
          ><svg
            class="opacity-50 cursor-pointer transition rotate-180 mb-6 ml-4 border-2 border-gray-200 rounded-xl p-2 hover:opacity-100"
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
        <h2 class="text-3xl font-bold mb-7 pl-4">Мои покупки</h2>
      </div>
      <cardList :items="orders" is-favorites />
    </div>
  </div>
</template>
