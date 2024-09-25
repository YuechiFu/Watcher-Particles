<template lang="">
  <div>
    <div id="tsparticles" ref="el"></div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { tsParticles } from "@tsparticles/engine";
import { loadAll } from "@tsparticles/all";
import { loadFireworksPreset } from "@tsparticles/preset-fireworks";
import {loadCanvasMaskPlugin} from "tsparticles-plugin-canvas-mask"
import { useMsgStore } from "@/store";
import { f1} from "./firework.config";
const msgStore = useMsgStore();
const el = ref();
async function loadParticles(options) {
  await loadAll(tsParticles);
  const tsl = await tsParticles.load({ id: "tsparticles", options });
  return tsl;
}
let tsl = null;

const loadFireworks = async (config) => {
//   await loadFireworksPreset(tsParticles);
//   await loadCanvasMaskPlugin(tsParticles);
  tsl = await loadParticles(config);
  tsl.pause()
};
const currentConf = f1
let tt = null
let isPlaying = false
watch(
  () => msgStore.LATEST_MSG,
  (val) => {
    if(!isPlaying){
        !isPlaying && tsl && tsl.play()
        isPlaying = true
    }
    tt && clearTimeout(tt)
    tt = setTimeout(() => {
        tsl && tsl.stop()
        isPlaying = false
    }, 6000);
  }
);

onMounted(() => {
    loadFireworks(currentConf);
});
</script>
<style lang=""></style>
