

<template>
    <div ref="canvas" class="p5_canvas" :id="id"></div>
  </template>
<script setup lang="ts">
import { ref, onMounted,  onUnmounted } from "vue"
import p5 from "p5"
const canvas = ref()
const { sketch } = defineProps(["sketch"])

const id = `p5_canvas_${new Date().getTime().toString()}`

onMounted(() => {
  const newP5 = new p5(sketch, canvas.value)
})

</script>
<style lang="scss">
.p5_canvas{
    video,canvas{
       object-fit: contain;
    }
}
</style>
