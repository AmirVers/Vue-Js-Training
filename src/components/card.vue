<script setup>
defineProps({
  imgUrl: String,
  title: String,
  price: Number,
  isFavourite: Boolean,
  isAdded: Boolean,
  onClickFavourite: Function,
  onClickAdd: Function
})

const convertToTg = (price) => {
  return price * 5
}
</script>

<template>
  <div
    class="relative border border-slate-100 transition rounded-3xl cursor-pointer p-8 hover:-translate-y-2 hover:shadow-xl"
  >
    <img
      v-if="onClickFavourite"
      :src="isFavourite ? '/like-2.svg' : '/like-1.svg'"
      alt="like"
      class="absolute top-7 left-5"
      @click="onClickFavourite"
    />
    <img :src="imgUrl" alt="sneakers" />
    <h2>{{ title }}</h2>
    <div class="flex justify-between mt-2">
      <div class="flex flex-col">
        <span class="text-slate-400 mb-1">Цена:</span>
        <b>{{ convertToTg(price) }} тг.</b>
      </div>
      <img
        v-if="onClickAdd"
        @click="onClickAdd"
        :src="isAdded ? '/checked.svg' : '/plus.svg'"
        alt="add"
      />
    </div>
  </div>
</template>
