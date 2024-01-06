<script setup>
import Card from './card.vue'
defineProps({
  items: Array,
  isFavorites: Boolean
})
const emit = defineEmits(['addFavourite'], ['onClickAdd'])
</script>
<template>
  <div class="grid grid-cols-4 gap-5" v-auto-animate>
    <Card
      v-for="item in items"
      :key="item.id"
      :img-url="item.imageUrl"
      :title="item.title"
      :price="item.price"
      :isFavourite="item.isFavourite"
      :onClickFavourite="isFavorites ? null : () => emit('addFavourite', item)"
      :onClickAdd="isFavorites ? null : () => emit('onClickAdd', item)"
      :isAdded="item.isAdded"
    />
  </div>
</template>
