<template lang="">
  <div class="flex flex-col justify-center items-center mt-20">
    <div
      class="w-500 border max-w-full aspect-square rounded-full bg-zinc-900 overflow-hidden"
    >
      <ModelParticles
        class="w-full h-full"
        v-if="displayMode === 0"
        :model-key="currentModelKey"
      ></ModelParticles>
      <ModelAnimation v-else :model-key="currentModelKey"></ModelAnimation>

      
    </div>

    <div class="flex justify-center mt-20">
      <t-select v-model="currentModelKey" @change="(val) => changeModel(val)">
        <t-option value="cat" class="">cat</t-option>
        <t-option value="watcher">watcher</t-option>
      </t-select>
      <t-select class="ml-10" v-model="displayMode" >
        <t-option :value="0" label="Partical" class="">Partical</t-option>
        <t-option :value="1" label="Model">Model</t-option>
      </t-select>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
import ModelParticles from "@/view/ModelParticles.vue";
import { useMsgStore } from "@/store";
const currentModelKey = ref("watcher");
const displayMode = ref('model')
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
