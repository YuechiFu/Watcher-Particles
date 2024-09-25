<template lang="">
  <div class="flex flex-col justify-center items-center mt-20">
    <div
      class="w-500 border max-w-full aspect-square rounded-full bg-zinc-900 overflow-hidden"
    >
      <ModelParticles
        class="w-full h-full"
        :model-key="currentModelKey"
      ></ModelParticles>
    </div>

    <div class="flex justify-center w-200 mt-20">
      <t-select v-model="currentModelKey" @change="(val) => changeModel(val)">
        <t-option value="cat" class="">cat</t-option>
        <t-option value="watcher">watcher</t-option>
      </t-select>
    </div>
  </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref, watch, defineProps, nextTick } from "vue";
import ModelParticles from "@/view/ModelParticles.vue";
import { useMsgStore } from "@/store";
const currentModelKey = ref("watcher");
const msgStore = useMsgStore();
const changeModel = (val) => {
  currentModelKey.value = val;
};

watch(
  () => msgStore.LATEST_MSG,
  (val) => {
    if (val.text) {
      changeModel(val.text);
    }
  }
);
</script>
<style lang=""></style>
