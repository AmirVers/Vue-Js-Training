<script setup>
import { ref, watch, provide, computed } from 'vue'
import Header from './components/sneakersHeader.vue'

import Drawer from './components/Drawer.vue'

const cart = ref([])

const opened = ref(false)

const openCart = () => {
  opened.value = true
}

const closeCart = () => {
  opened.value = false
}
const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}
const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))
const vatPrice = computed(() => Math.round(totalPrice.value * 0.05))

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true }
)
provide('cart', {
  cart,
  openCart,
  closeCart,
  addToCart,
  removeFromCart
})
</script>

<template>
  <Drawer v-if="opened" :totalPrice="totalPrice" :vatPrice="vatPrice" />

  <div class="bg-white w-4/5 m-auto rounded-xl mt-14">
    <Header @onClickOpenCart="openCart" :totalPrice="totalPrice" />

    <div class="p-10">
      <router-view></router-view>
    </div>
  </div>
</template>
