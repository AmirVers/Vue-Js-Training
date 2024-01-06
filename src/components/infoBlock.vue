<script setup>
import { inject } from 'vue'
defineProps({
  imgUrl: String,
  title: String,
  info: String
})
const actions = inject('cart')
</script>

<template>
  <div class="flex flex-col items-center text-center w-72 mx-auto">
    <img class="mb-5" width="120" height="120" :src="imgUrl" :alt="title" />
    <h2 class="mb-2 text-2xl font-semibold">{{ title }}</h2>
    <p class="leading-6 text-gray-500">{{ info }}</p>
    <div>
      <button
        @click="actions.closeCart"
        class="mt-6 w-full transition text-center rounded-2xl bg-lime-500 text-white py-3 px-12 hover:bg-lime-600"
      >
        Вернуться назад
      </button>
    </div>
  </div>
</template>
