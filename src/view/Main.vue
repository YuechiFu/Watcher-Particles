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

    <div>
      <div class="w-full fixed right-0 bottom-4 flex justify-center">
        <t-alert v-if="tip">{{ tip }}</t-alert>
      </div>
      <div class="flex flex-wrap items-center justify-center text-active">
        <span class="mr-1">Handpose</span>
        <t-switch v-model="isDetecting"></t-switch>
        <div
          id="handpose_camera_status"
          class="relative w-15 h-15 ml-10 flex items-center text-active"
        ></div>
      </div>
    </div>

    <div>
      <HandPose
        class="mt-20 w-640 h-480"
        v-if="isDetecting"
        :is-detecting="isDetecting"
        @update-pose="handleUpdateHandpose"
      >
        <template v-slot:default="{ isLoading, isDetecting, isCameraReady }">
          <teleport to="#handpose_camera_status" v-if="isDetecting">
            <div class="text-white" v-if="isLoading">
              <t-loading inherit-color size="19px"></t-loading>
            </div>
            <div
              class="w-15 h-15 rounded-full video_icon border-active border relative"
              v-if="isCameraReady"
            ></div>
          </teleport>
        </template>
      </HandPose>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
import ModelParticles from "@/view/ModelParticles.vue";
import HandPose from "@/components/HandPose";
import { HANDPOST_TYPES } from "@/defines";
import { useMsgStore } from "@/store";
const currentModelKey = ref("watcher");
const displayMode = ref(0);
const msgStore = useMsgStore();
const isDetecting = ref(false);
const controls = ref(null);
const tip = ref("");
const changeModel = (val) => {
  currentModelKey.value = val;
};
let closeDelayTT;
const handleUpdateHandpose = (val) => {
  if (val.status === HANDPOST_TYPES.Disappear) {
    console.log("Closed after 5s");
    setTimeout(() => {
      tip.value = "Hands Disappear. Camera will be closed after 3s";
      closeDelayTT = setTimeout(() => {
        isDetecting.value = false;
      }, 3000);
    }, 2000);
  } else {
    closeDelayTT && clearTimeout(closeDelayTT);
    tip.value = "";
  }
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
      if (!isDetecting.value) {
        isDetecting.value = true;
      }
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
  &:after {
    content: "";
    position: absolute;
    top: 3px;
    left: 3px;
    width: calc(100% - 6px);
    height: calc(100% - 6px);
    border-radius: 50%;
    animation: vAni linear 1.5s infinite alternate;
    background-color: var(--brand-color);
  }
}
</style>
