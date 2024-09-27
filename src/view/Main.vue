<template lang="">
  <div class="flex flex-col justify-center items-center mt-20">
    <div
      class="w-500 border max-w-full aspect-square rounded-full bg-zinc-900 overflow-hidden"
    >
      <ModelParticles
        class="w-full h-full"
        v-if="displayMode === 0"
        :controls="controls"
        :model-key="currentModelKey"
      ></ModelParticles>
      <ModelAnimation v-else :model-key="currentModelKey"></ModelAnimation>
    </div>

    <div class="flex justify-center my-20">
      <t-select v-model="currentModelKey" @change="(val) => changeModel(val)">
        <t-option value="cat" class="">cat</t-option>
        <t-option value="watcher">watcher</t-option>
      </t-select>
      <!-- <t-select class="ml-10" v-model="displayMode">
        <t-option :value="0" label="Partical" class="">Partical</t-option>
        <t-option :value="1" label="Model">Model</t-option>
      </t-select> -->
    </div>
    <div class="flex items-center justify-center">
      <span class="mr-1">Handpose</span> <t-switch v-model="isDetecting"></t-switch>
    </div>

    <div class="mt-20 w-640 h-480">
      <HandPose  v-if="isDetecting" :is-detecting="isDetecting" @update-pose="handleUpdateHandpose">
        <div
            class="bg-active w-15 h-15 rounded-full absolute top-0 right-0 video_icon"
          ></div>
      </HandPose>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
import ModelParticles from "@/view/ModelParticles.vue";
import HandPose from "@/components/HandPose";
import { useMsgStore } from "@/store";
const currentModelKey = ref("watcher");
const displayMode = ref(0);
const msgStore = useMsgStore();
const isDetecting = ref(false);
const controls = ref(null);
const changeModel = (val) => {
  currentModelKey.value = val;
};

const handleUpdateHandpose = (val) => {
  if (!val.value) {
    controls.value = {
      value: ""
    };
    return;
  }
  controls.value = val;
};

watch(
  () => msgStore.LATEST_MSG,
  (val) => {
    if (val.text) {
      changeModel(val.text);
      isDetecting.value = ! isDetecting.value
     
    }
  }
);
</script>
<style lang="scss" scoped>
@keyframes vAni {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
}
.video_icon {
  animation: vAni linear 3s infinite alternate;
}
</style>
