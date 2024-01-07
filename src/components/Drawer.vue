<script setup>
import DrawerHead from './DrawerHead.vue'
import CartList from './cartItemList.vue'
import InfoBlock from './infoBlock.vue'
import { ref, inject } from 'vue'
import axios from 'axios'

const props = defineProps({
  totalPrice: Number,
  vatPrice: Number
})
const { cart, closeCart } = inject('cart')
const orderId = ref(null)

const createOrder = async () => {
  try {
    const orderValue = {
      items: cart.value,
      totalPrice: props.totalPrice
    }
    const { data } = await axios.post('https://a3aa9529fde18524.mokky.dev/orders', orderValue)

    cart.value = []

    orderId.value = data.id

    setTimeout(() => {
      orderId.value = null
      closeCart()
    }, 2000)

    return data
  } catch (err) {
    console.log(err)
  }
}

const convertToTg = (price) => {
  return price * 5
}
</script>
<template>
  <div class="fixed top-0 left-0 w-full h-full bg-black z-10 opacity-60"></div>
  <div class="bg-white w-[25rem] h-full fixed right-0 top-0 z-20 p-9">
    <div class="fixed top-0 left-0 w-full h-full bg-black z-10 opacity-40"></div>
    <div class="bg-white w-[25rem] h-full fixed right-0 top-0 z-20 p-9">
      <DrawerHead :total-price="totalPrice" />
      <div v-if="!totalPrice || orderId" class="flex h-full items-center">
        <infoBlock
          v-if="!totalPrice && !orderId"
          imgUrl="/package-icon.png"
          title="Корзина пустая"
          info="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
        />
        <infoBlock
          v-if="orderId"
          imgUrl="/order-success-icon.png"
          title="Заказ оформлен!"
          :info="`Ваш заказ #${orderId} скоро будет передан курьерской доставке`"
        />
      </div>

      <CartList v-if="totalPrice" />

      <div v-if="totalPrice" class="flex flex-col gap-3 mt-6">
        <div class="flex gap-2">
          <span class="font-bold">Итого:</span>
          <div class="flex-1 mb-1 border-b border-dashed border-slate-300"></div>
          <b>{{ convertToTg(totalPrice) }} тг.</b>
        </div>
        <div class="flex gap-2">
          <span class="font-bold">Налог 5%</span>
          <div class="flex-1 mb-1 border-b border-dashed border-slate-300"></div>
          <b>{{ convertToTg(vatPrice) }} тг.</b>
        </div>
        <button
          @click="createOrder"
          class="mt-5 w-full transition text-center rounded-2xl bg-lime-500 text-white py-3 hover:bg-lime-600"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  </div>
</template>
