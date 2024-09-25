<template>
  <div>
    <div class="sticky top-0 left-0 font-mst z-10 w-full shrink-0 bg-zinc-950">
      <div class="max768:flex-wrap py-10 flex justify-between">
        <div
          class="h-auto flex-wrap flex items-center justify-ceneter w-full rounded-md"
        >
          <div
            v-for="item of routes[0].children"
            class="px-8 min-h-35 mx-10 max768:mb-10 rounded-md  text-16 flex items-center"
            :class="{ ' text-sky-300 bg-sky-950': route.name === item.name }"
          >
            <router-link :to="item.path">{{ item.name }}</router-link>
          </div>
        </div>
        <div class="w-350 px-20 box-border flex items-center pr-10">
          <t-input clearable class="w-200" v-model="wsAddr" @change="handleWs(false)"></t-input>
          <div class="ml-10 w-100">
            <t-switch v-model="isConnected" @change="handleWs" />
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
    <TerminalBtn></TerminalBtn>
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
let currentWs = null;
let isConnected = ref(false);

const options = [
  "http://192.168.127.102:3000",
  "http://192.168.117.105:10887",
  "https://moon.oupp.site/ws",
  "http://10.10.43.42:10887"
];
const wsAddr = ref(
  msgStore.ws || (location.hostname === "moon.oupp.site" ? '' : options[1])
);


// https://moon.oupp.site/d2ebd48d-31e7-45e2-9414-d5714d33c999

const initWs = (addr) => {
  const ws = new WebSocket(addr);
  ws.addEventListener("open", () => {
    isConnected.value = true;
    console.log(wsAddr.value)
    msgStore.setHistoryWs(wsAddr.value)
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
  if(wsAddr.value){
    currentWs = initWs(wsAddr.value);
  }
};

onMounted(() => {
  handleWs();
});
</script>
