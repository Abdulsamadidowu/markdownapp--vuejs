import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import MarkdownApp from './components/MarkdownApp.vue'
import ErrorTest from './components/ErrorTest.vue'
import NotFound from './components/NotFound.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: MarkdownApp },
    { path: '/error-test', component: ErrorTest },
    { path: '/:pathMatch(.*)*', component: NotFound }
  ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')