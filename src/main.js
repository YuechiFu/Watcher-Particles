import { createApp } from 'vue'
import { createPinia } from "pinia"
import { createPersistedState } from "pinia-plugin-persistedstate"
// 引入组件库的少量全局样式变量
import "tdesign-vue-next/es/style/index.css"
import "@/assets/style/index.css"
import '@/assets/style/index.css'
import App from "./App.vue"
import router from "./router"
import i18n from "./i18n"

const pinia = createPinia()
pinia.use(
  createPersistedState({ key: (stateName) => `${stateName}` })
)

const app = createApp(App)
app.use(pinia).use(i18n).use(router).mount("#app")
