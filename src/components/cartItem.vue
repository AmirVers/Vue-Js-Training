<script setup>
const emit = defineEmits(['onClickRemove'])

defineProps({
  id: Number,
  imgUrl: String,
  title: String,
  price: Number
})
const convertToTg = (price) => {
  return price * 5
}
</script>

<template>
  <div class="flex items-center border border-slate-200 p-4 rounded-xl gap-5">
    <img class="w-16 h-16" :src="imgUrl" :alt="title" />
    <div class="flex flex-col grow">
      <p>{{ title }}</p>

      <div class="flex justify-between mt-2">
        <b>{{ convertToTg(price) }} тг.</b>
        <img
          @click="emit('onClickRemove')"
          src="/close.svg"
          alt="close"
          class="opacity-40 cursor-pointer transition hover:opacity-100"
        />
      </div>
    </div>
  </div>
</template>
