<template>
  <div>
    <div class="sticky top-0 left-0 font-mst z-10 w-full shrink-0 bg-zinc-950">
      <div
        class="max1080:flex-wrap py-10 flex justify-between px-10 relative max1080:pr-45 mb-10"
      >
        <div class="hidden max1080:flex items-center absolute top-3 right-2">
          <t-button
            class="t-demo-collapse-btn"
            variant="text"
            shape="circle"
            @click="collapsed = !collapsed"
          >
            <template #icon
              ><t-icon :name="collapsed ? 'view-list' : 'close'" size="22px"
            /></template>
          </t-button>
        </div>
        <div
          class="h-auto flex-wrap flex items-center justify-ceneter grow rounded-md"
          v-show="!collapsed && routes.length > 1"
        >
          <router-link
            v-for="item of routes[0].children"
            class="px-8 min-h-35 mx-10 max1080:mb-10 max1080:w-full rounded-md text-16 flex items-center"
            :class="{ ' text-lime-300 bg-lime-950': route.name === item.name }"
            :to="item.path"
          >
            {{ item.name }}
          </router-link>
        </div>
        <div
          class="focus-within:border-active grow max-w-600 overflow-hidden pl-10 box-border flex items-center pr-10 border border-zinc-600 rounded-full"
        >
          <input
            clearable
            class="block w-full outline-none border-none px-10 h-40 bg-transparent"
            v-model="wsAddr"
            placeholder="WebSocket URL"
            @change="handleWs(false)"
          />
          <div class="flex items-center">
            <t-switch v-model="isConnected" @change="handleWs" />
          </div>
        </div>
      </div>
    </div>

    <router-view class="p-10"></router-view>
  </div>
</template>
<script setup>
import { routes } from "@/router";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { useThemeStore, useMsgStore } from "@/store";

const route = useRoute();
useThemeStore().setThemeMode("dark");
const msgStore = useMsgStore();
const collapsed = ref(false);
let currentWs = null;
let isConnected = ref(false);

const options = [
  "http://localhost:10887",
];
const wsAddr = ref(
  msgStore.ws || (location.hostname === "https://moon.dsaiioado.site/" ? "https://moon.dsaiioado.site/notify" : options[0])
);

const initWs = (addr) => {
  const ws = new WebSocket(addr);
  ws.addEventListener("open", () => {
    isConnected.value = true;
    console.log(wsAddr.value);
    msgStore.setHistoryWs(wsAddr.value);
  });
  ws.addEventListener("error", (e) => {
    isConnected.value = false;
  });
  ws.addEventListener("close", () => {
    isConnected.value = false;
  });
  ws.onmessage = (res) => {
    try {
      res = JSON.parse(res.data);
      res = res.content.events;
      console.log(res);
      if (res.img) {
        msgStore.receiveMsg(res);
      }
    } catch (err) {
      console.log(err);
      return;
    }
  };
  return ws;
};

const handleWs = (open) => {
  // isConnected.value = open;
  if (currentWs && !open) {
    currentWs.close();
    return;
  }
  if (wsAddr.value) {
    currentWs = initWs(wsAddr.value);
  }
};

onMounted(() => {
  handleWs();
});
</script>
