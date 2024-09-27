<template lang="">
  <div class="w-full h-full relative">
    <div ref="cvs" class="w-full h-full flex items-center justify-center">
      <template v-if="sketch">
        <P5Vue :sketch="sketch" v-if="sketch"></P5Vue>
        <!-- style="visibility:hidden" -->
        <slot></slot>
      </template>
      <t-loading v-else></t-loading>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, computed, onUnmounted, watch, defineEmits } from "vue";
import { useMsgStore } from "@/store";
import p5 from "p5";
import P5Vue from "@/components/P5";
import { HANDPOST_TYPES } from "@/defines";

const props = defineProps(["isDetecting"]);
const emit = defineEmits(["updatePose"]);
const cvs = ref();

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
    let latestStatus = "";
    let values = {};

    function resetValues() {
      values = {};
    }

    const updateStatus = (val) => {
      const status = val.status;
      if (!status) {
        return;
      }
      if (status === HANDPOST_TYPES.Disappear) {
        if (latestStatus === status) {
          return;
        }
        latestStatus = status;
        emit("updatePose", val);
        resetValues();
        return;
      }

      emit("updatePose", val);
      latestStatus = status;
    };

    const toggleDetection = (val) => {
      val
        ? handPose.detectStart(video, (res) => {
            hands = res;
          })
        : handPose.detectStop();
    };

    const handleHands = (hands) => {
      if (!hands.length) {
        updateStatus({
          status: HANDPOST_TYPES.Disappear
        });
        return;
      }

      let finger = hands[0].pinky_finger_tip;
      let thumb = hands[0].thumb_tip;
      let wrist = hands[0].wrist;
      if (!(finger && thumb)) {
        return;
      }

      let centerX = (finger.x + thumb.x) / 2;
      let centerY = (finger.y + thumb.y) / 2;
      // console.log(finger.x, finger.y)
      // Calculate the pinch "distance" between finger and thumb
      let pinch = p5.dist(finger.x, finger.y, thumb.x, thumb.y);
      // console.log(pinch)
      updateStatus({
        status: HANDPOST_TYPES.UpdatePose,
        value: {
          scale: pinch / w,
          rotate: {
            y: wrist.x / w,
            x: wrist.y / h
          }
        }
      });
      // This circle's size is controlled by a "pinch" gesture
      p5.noFill(0, 255, 0, 200);
      p5.stroke(0);
      p5.strokeWeight(2);
      p5.circle(centerX, centerY, pinch);
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
      handleHands(hands);
    };
  };
};

onMounted(() => {
  init();
});
onUnmounted(() => {});
</script>
<style lang=""></style>
