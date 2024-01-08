import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'

import Home from './pages/Home.vue'
import Favourites from './pages/Favourites.vue'
import Profile from './pages/Profile.vue'
import moreThan3 from './pages/moreThan3.vue'

const app = createApp(App)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/favourites', name: 'Favourites', component: Favourites },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/tooBig', name: 'moreThan3', component: moreThan3 }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
app.use(autoAnimatePlugin)
app.use(router)

app.mount('#app')
