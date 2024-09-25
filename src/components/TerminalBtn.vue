<template lang="">
  <div
    class="fixed right-1 w-40 h-40 rounded-full bottom-10"
    v-show="!visibleXterm"
  >
    <t-button shape="circle" @click="togglerXterm(true)">
      <TerminalRectangle1Icon size="20" />
    </t-button>
  </div>
  <div
    class="w-auto max-w-800 bg-zinc-800 mx-auto p-10 rounded-2xl whitespace-nowrap overflow-hidden fixed bottom-3 right-3"
    v-show="visibleXterm"
  >
    <div class="pt-25">
      <div
        class="z-10 flex absolute right-1 top-1 h-25 w-25 items-center justify-center bg-zinc-900 rounded-full"
      >
        <t-button
          @click="togglerXterm(false)"
          shape="circle"
          theme="danger"
          variant="text"
          class="text-zinc-50"
          ><CloseCircleIcon size="18"
        /></t-button>
      </div>
      <SerialPortReader />
    </div>
  </div>
</template>
<script setup>
import { defineAsyncComponent, onMounted, ref } from "vue";
import {
  TerminalRectangle1Icon,
  CloseCircleIcon
} from "tdesign-icons-vue-next";
const SerialPortReader = defineAsyncComponent(() =>
  import("@/components/SerialPortReader.vue")
);
const visibleXterm = ref(false);
const togglerXterm = (val) => {
  visibleXterm.value = val;
};
</script>
<style lang=""></style>
