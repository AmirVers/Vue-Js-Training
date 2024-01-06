<script setup>
import { inject } from 'vue'
import cartItem from './cartItem.vue'

const { cart, removeFromCart } = inject('cart')
</script>
<template>
  <div v-auto-animate class="flex flex-col gap-5">
    <cartItem
      v-for="item in cart"
      :key="item.id"
      :price="item.price"
      :imgUrl="item.imageUrl"
      :title="item.title"
      @onClickRemove="() => removeFromCart(item)"
    />
  </div>
</template>
