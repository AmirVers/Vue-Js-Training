<script setup>
import { reactive, watch, ref, onMounted, inject, toRaw } from 'vue'
import cardList from '../components/cardList.vue'
import axios from 'axios'

const { cart, addToCart, removeFromCart } = inject('cart')
const items = ref([])

const cartManupalitons = (obj) => {
  const isFind = cart.value.find((cartItem) => cartItem.id === obj.id)
  return Boolean(isFind)
}

const getFavourites = async () => {
  const response = await axios.get(`https://a3aa9529fde18524.mokky.dev/favourite`)
  const favourites = response.data

  return favourites
}

const findFavourite = (favourites, item) => {
  return favourites.find((favourite) => favourite.parentId === item.id)
}

const onClickCartAction = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

const addFavourite = async (item) => {
  try {
    if (!item.isFavourite) {
      const obj = {
        parentId: item.id,
        item
      }

      item.isFavourite = true

      const { data } = await axios.post(`https://a3aa9529fde18524.mokky.dev/favourite`, obj)

      item.favouriteId = data.id
    } else {
      item.isFavourite = false
      await axios.delete(`https://a3aa9529fde18524.mokky.dev/favourite/${item.favouriteId}`)
      item.favouriteId = null
    }
  } catch (err) {
    console.log(err)
  }
}

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }
    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }
    const { data } = await axios.get(`https://a3aa9529fde18524.mokky.dev/items`, {
      params
    })

    const localCart = localStorage.getItem('cart')
    cart.value = localCart ? toRaw(JSON.parse(localCart)) : []

    const favourites = await getFavourites()
    items.value = data.map((item) => {
      const favourite = findFavourite(favourites, item)
      const isAdded = cartManupalitons(item)
      return {
        ...item,
        isFavourite: Boolean(favourite),
        favouriteId: null,
        isAdded: isAdded
      }
    })
  } catch (err) {
    console.log(err)
  }
}

const fetchFavourite = async () => {
  try {
    const favourites = await getFavourites()
    items.value = items.value.map((item) => {
      const favourite = findFavourite(favourites, item)

      if (!favourite) {
        return {
          ...item,
          isFavourite: false,
          favouriteId: null
        }
      }

      return {
        ...item,
        isFavourite: true,
        favouriteId: favourite.id
      }
    })
  } catch (err) {
    console.log(err)
  }
}
const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}
const onChangeSearchQuery = (event) => {
  filters.searchQuery = event.target.value
}

onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []

  await fetchItems()
  await fetchFavourite()

  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
})

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }))
})

watch(filters, fetchItems)
</script>

<template>
  <div class="flex justify-between items-center">
    <h2 class="text-3xl font-bold mb-10">Все кроссовки</h2>

    <div class="flex gap-4">
      <select
        @change="onChangeSelect"
        class="py-2 px-3 border rounded-md outline-none appearance-none"
      >
        <option value="title">По названию</option>
        <option value="price">По цене (дешевые)</option>
        <option value="-price">По цене (дорогие)</option>
      </select>
      <div class="relative">
        <img class="absolute top-3 left-4" src="/search.svg" alt="search" />
        <input
          @input="onChangeSearchQuery"
          class="outline-none border border-slate-200 py-2 pl-11 pr-5 rounded-xl focus:border-gray-500"
          type="text"
          placeholder="Поиск..."
        />
      </div>
    </div>
  </div>

  <cardList :items="items" @addFavourite="addFavourite" @onClickAdd="onClickCartAction" />
</template>
