<template lang="">
  <div class="w-full h-full relative">
    <div ref="cvs" class="w-full h-full flex items-center justify-center">
      <P5Vue :sketch="sketch" v-if="sketch"></P5Vue>
      <t-loading v-else></t-loading>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, computed, onUnmounted, watch, defineEmits } from "vue";
import { useMsgStore } from "@/store";
import p5 from "p5";
import P5Vue from "@/components/P5";

const props = defineProps(["isDetecting"]);
const emit = defineEmits(['updatePose'])
const cvs = ref();

const HANDPOST_TYPES = {
  ZoomOut: "ZoomOut",
  ZoomIn: "ZoomIn",
  Scale: "Scale",
  Left: "Left",
  Right: "Right",
  Up: "Up",
  Down: "Down"
};

let sketch = ref();
const init = async () => {
  const w = cvs.value.clientWidth,
    h = cvs.value.clientHeight;
  let preDectecting = props.isDetecting;
  let handPose;
  await new Promise((res, reject) => {
    ml5.handPose(function (hp, err) {
      handPose = hp;
      res(handPose);
    });
  });
  sketch.value = (p5) => {
    let video;
    let hands = [];

    const toggleDetection = (val) => {
      val
        ? handPose.detectStart(video, (res) => {
            hands = res;
          })
        : handPose.detectStop();
    };
    p5.setup = function () {
      p5.createCanvas(w, h);
      video = p5.createCapture("video", { flip: true });
      video.size(w, h);
      video.hide();
      toggleDetection(preDectecting);
    };

    p5.draw = function () {
      p5.image(video, 0, 0, w, h);
      if (preDectecting !== props.isDetecting) {
        toggleDetection(props.isDetecting);
        preDectecting = props.isDetecting;
        if (!props.isDetecting) {
          return;
        }
      }

      if (hands.length > 0) {
        // Find the index finger tip and thumb tip
        let finger = hands[0].pinky_finger_tip;
        let thumb = hands[0].thumb_tip;
        if(!(finger && thumb)){return}

        // Draw circles at finger positions
        let centerX = (finger.x + thumb.x) / 2;
        let centerY = (finger.y + thumb.y) / 2;
        // console.log(finger.x, finger.y)
        // Calculate the pinch "distance" between finger and thumb
        let pinch = p5.dist(finger.x, finger.y, thumb.x, thumb.y);
        // console.log(pinch)
        emit('updatePose', {
          type: HANDPOST_TYPES.Scale,
          value: pinch
        })
        // This circle's size is controlled by a "pinch" gesture
        p5.fill(0, 255, 0, 200);
        p5.stroke(0);
        p5.strokeWeight(2);
        p5.circle(centerX, centerY, pinch);
      }

      /* for (let i = 0; i < hands.length; i++) {
        let hand = hands[i];
        for (let j = 0; j < hand.keypoints.length; j++) {
          let keypoint = hand.keypoints[j];
          p5.fill(209, 230, 29);
          p5.circle(keypoint.x, keypoint.y, 6);
        }
      } */
    };
  };
};

onMounted(() => {
  init();
});
onUnmounted(() => {});
</script>
<style lang=""></style>
