<template lang="">
  <div ref="cvs" class="w-full h-full flex items-center justify-center">
    <P5Vue :sketch="sketch" v-if="sketch"></P5Vue>
    <t-loading v-else></t-loading>
  </div>
</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import { useMsgStore } from "@/store";
import p5 from "p5";
import P5Vue from "@/components/P5";

const msgStore = useMsgStore();
const cvs = ref();
// const isDetecting = ref(true);
const isOpenCamera = ref(true);
const toggleCamera = (val) => {
  isOpenCamera.value = val === undefined ? !isOpenCamera.value : val;
};

const HANDPOST_TYPES = {
  ZoomOut: "ZoomOut",
  ZoomIn: "ZoomIn",
  Scale: "Scale",
  Left: "Left",
  Right: "Right",
  Up: "Up",
  Down: "Down"
};

/* const toggleDetecting = (val) => {
  isDetecting.value = val === undefined ? !isDetecting.value : val;
  isDetecting.value
    ? handPose.detectStart(video, gotHands)
    : handPose.detectStop();
}; */

let sketch = ref();

const init = async () => {
  const m = ml5.handPose();
  await m.loadModel();
  sketch.value = (p5) => {
    const w = cvs.value.clientWidth,
      h = cvs.value.clientHeight;
    let handPose = m;
    let video;
    let hands = [];

    p5.setup = function () {
      p5.createCanvas(w, h);
      video = p5.createCapture("video", { flip: true });
      video.size(w, h);
      video.hide();
      handPose.detectStart(video, gotHands);
    };
    function gotHands(results) {
      console.log(results);
      if(results && results.length){
        console.log(results[0].handedness)
      }
      hands = results;
    }
    p5.draw = function () {
      // Draw the webcam video
      p5.image(video, 0, 0, w, h);

      // Draw all the tracked hand points
      for (let i = 0; i < hands.length; i++) {
        let hand = hands[i];
        for (let j = 0; j < hand.keypoints.length; j++) {
          let keypoint = hand.keypoints[j];
          p5.fill(0, 255, 0);
          p5.noStroke();
          p5.circle(keypoint.x, keypoint.y, 10);
        }
      }
    };
  };
};

onMounted(() => {
  init();
});
</script>
<style lang=""></style>
