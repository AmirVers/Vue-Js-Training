<script setup>
const emit = defineEmits(['onClickOpenCart'])

defineProps({
  totalPrice: Number
})

const convertToTg = (price) => {
  return price * 5
}
</script>
<template>
  <header class="flex justify-between border-b border-slate-300 px-10 py-9">
    <router-link to="/"
      ><div class="flex items-center">
        <img src="/logo.png" alt="logo" class="w-10 mr-4" />
        <div>
          <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
          <p class="text-slate-500">Магазин лучших кроссовок</p>
        </div>
      </div></router-link
    >

    <ul class="flex items-center gap-10">
      <li
        @click="emit('onClickOpenCart')"
        class="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black"
      >
        <img src="/cart.svg" alt="cart" />
        <b>{{ convertToTg(totalPrice) }} тг.</b>
      </li>
      <router-link to="/favourites"
        ><li class="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black">
          <img src="/heart.svg" alt="heart" />
          <span>Закладки</span>
        </li></router-link
      >
      <router-link to="profile">
        <li class="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black">
          <img src="/profile.svg" alt="profile" />
          <span>Профиль</span>
        </li>
      </router-link>
    </ul>
  </header>
</template>
