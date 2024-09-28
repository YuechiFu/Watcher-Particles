<template lang="">
  <div class="relative">
    <div ref="cvs" class="w-full h-full flex items-center justify-center">
      <template v-show="isCameraReady" v-if="!isLoading">
        <P5Vue
          :sketch="sketch"
          v-if="sketch"
          :style="{ visibility: visible ? 'visible' : 'hidden' }"
        ></P5Vue>
      </template>
      <slot
        :isLoading="isLoading"
        :isDetecting="isDetecting"
        :isCameraReady="isCameraReady"
      >
        <t-loading v-if="isLoading"></t-loading>
      </slot>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, computed, onUnmounted, watch, defineEmits } from "vue";
import { useMsgStore } from "@/store";
import p5 from "p5";
import P5Vue from "@/components/P5";
import { HANDPOST_TYPES } from "@/defines";

const props = defineProps(["isDetecting", "visible"]);
const emit = defineEmits(["updatePose"]);

const cvs = ref();
const isCameraReady = ref(false);
const isLoading = ref(false);

let sketch = ref();
let stopTrack;
const init = async (el) => {
  if (!el) {
    return;
  }
  const w = el.clientWidth,
    h = el.clientHeight;
  let preDectecting = props.isDetecting;
  let handPose, video;
  isLoading.value = true;
  try {
    await new Promise((res, reject) => {
      ml5.handPose(function (hp, err) {
        handPose = hp;
        res(handPose);
        if (err) {
          reject(err);
        }
      });
    });
  } catch (err) {}
  isLoading.value = false;
  sketch.value = (p5) => {
    let hands = [];
    let latestStatus = "";

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
      
      let pinch = p5.dist(finger.x, finger.y, thumb.x, thumb.y);
      
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
      video = p5.createCapture("video", { flip: true }, function (stream) {
        isCameraReady.value = true;
        stopTrack = () => {
          const tracks = stream.getTracks();
          tracks.forEach((track) => {
            track.stop();
          });
          stopTrack = null;
          video = null;
        };
      });
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
  cvs.value && init(cvs.value);
});
onUnmounted(() => {
  stopTrack && stopTrack();
});
</script>
<style lang=""></style>
