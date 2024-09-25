import { defineStore } from "pinia"
import { SystemThemeMode, ThemeModeAttr } from "@/defines"




const store = defineStore("theme", {
  state: () => {
    return {
      themeMode: SystemThemeMode.Dark, // 系统主题
    }
  },
  actions: {
    setThemeMode(theme) {
      if (theme) this.themeMode = theme
      let $root = document.documentElement
      $root.setAttribute(ThemeModeAttr, this.themeMode)
      this.themeMode === SystemThemeMode.Dark
        ? $root.classList.add(SystemThemeMode.Dark)
        : $root.classList.remove(SystemThemeMode.Dark)
    },
    // 切换主题
    toggleThemeMode() {
      this.setThemeMode(
        this.themeMode === SystemThemeMode.Dark ? SystemThemeMode.Light : SystemThemeMode.Dark
      )
    },
  }
  /*   persist: {
    paths: ["themeMode"]
  } */
})
export default store
