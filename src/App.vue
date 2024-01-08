<script setup>
import { ref, watch, provide, computed } from 'vue'
import { useRouter } from 'vue-router'
import Header from './components/sneakersHeader.vue'
import Drawer from './components/Drawer.vue'

const router = useRouter()

const cart = ref([])
const opened = ref(false)

const openCart = () => {
  opened.value = true
  document.body.classList.add('overflow-hidden')
}

const closeCart = () => {
  opened.value = false
  document.body.classList.remove('overflow-hidden')
}

const addToCart = (item) => {
  if (cart.value.length > 2) {
    router.push('/tooBig')

    item.isAdded = false
  } else {
    cart.value.push(item)
    item.isAdded = true
  }
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
  <div>
    <Drawer v-if="opened" :totalPrice="totalPrice" :vatPrice="vatPrice" />

    <div class="bg-white w-4/5 m-auto rounded-xl mt-14">
      <Header @onClickOpenCart="openCart" :totalPrice="totalPrice" />

      <div class="p-10">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
