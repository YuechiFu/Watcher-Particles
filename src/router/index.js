import { createRouter, createWebHashHistory, createWebHistory } from "vue-router"
import { ERouter } from "@/defines"
import i18n from "@/i18n"
const { t, tm } = i18n.global
import { MessagePlugin } from "tdesign-vue-next"


export const routes = [
  {
    path: "/",
    redirect: {name: 'Home'},
    children: [
      {
        path: '/',
        name: 'Home',
        component: async () => await import("@/view/Main.vue"),
        meta: {
          title: 'home',
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// set Page Tile
router.beforeEach((to, from, next) => {
  const title = to.meta.title
  if (title) {
    document.title = title
  }
  if (to.query.reference) {
    to.meta.backPage = {
      name: to.query.reference
    }
  }
  next()
})

export default router
