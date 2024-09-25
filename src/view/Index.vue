<template lang="">
  <div class="flex items-center justify-center">
    <!-- <img style="transform:rotate(-90deg)" class="block aspect-square rounded-full object-contain" :src="latestMsg.img" alt=""> -->
    <!-- <img v-if="latestMsg && latestMsg.img" class="w-60 h-60" :src="latestMsg.img" alt=""> -->
    <div id="image_canvas" class="w-500 h-500"></div>
    <!-- <ModelAnimation></ModelAnimation> -->
  </div>
</template>
<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import TerminalBtn from "@/components/TerminalBtn";
import imageEffect from "@/utils/imageEffect";
import { useMsgStore } from "@/store";
const msgStore = useMsgStore();
const latestMsg = computed(() => msgStore.LATEST_MSG);

// imageEffect("#image_canvas", `data:image/png;base64,${image}`, 5, 5);
const updateImage = (image) => {};
let playId = null;
watch(
  () => msgStore.LATEST_MSG,
  (msg) => {
    console.log(msg);
    if (msg.img) {
      imageEffect("#image_canvas", `${msg.img}`, 1, 5);
    }
  }
);
onMounted(() => {
  msgStore.LATEST_MSG &&
    msgStore.LATEST_MSG.img &&
    imageEffect("#image_canvas", `${msgStore.LATEST_MSG.img}`, 1, 5);
});
</script>
<style lang="scss"></style>
