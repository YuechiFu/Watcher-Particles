<template lang="">
  <div id="container">
    <div class="flex items-center justify-center w-500 h-500">
      <canvas id="testCanvas" class="w-full h-full"></canvas>
    </div>
    <img
      v-if="latestMsg && latestMsg.img"
      :src="latestMsg.img"
      alt=""
      ref="$img"
      style="visibility: hidden"
    />
  </div>
</template>
<script setup>
import { ref, onMounted, computed, watch, nextTick } from "vue";
import PxLoader from "./pixel/PxLoader";
import Stats from "three/examples/jsm/libs/stats.module";
import Proton from "proton-engine";
import { useMsgStore } from "@/store";
const msgStore = useMsgStore();
const latestMsg = computed(() => msgStore.LATEST_MSG);
console.log(latestMsg.value);
const $img = ref();

let playId = null;
const play = (img) => {
  playId && cancelAnimationFrame(playId);
  let proton;
  let canvas;
  let context;
  let container;
  let renderer;
  let stats;
  let logoZone;
  let emitter;
  let imageDatas;
  let rect, rect2;
  let gravityBehaviour, randomBehaviour, gravityWellBehaviour;
  let rootIndex = 1;
  let crossBehaviour;

  main();

  function main() {
    canvas = document.getElementById("testCanvas");
    let w = canvas.clientWidth,
      h = canvas.clientHeight;

    let imgSize = {
      w: $img.value.clientWidth,
      h: $img.value.clientHeight
    };

    context = canvas.getContext("2d");
    // addStats();
    canvas.width = w;
    canvas.height = h;

    if (imgSize.w > canvas.w) {
      imgSize.w = canvas.w;
    }

    if (imgSize.h > canvas.h) {
      imgSize.h = canvas.h;
    }

    imageDatas = [];
    rect = new Proton.Rectangle(
      (w - imgSize.w) / 2,
      (h - imgSize.h) / 2,
      imgSize.w,
      imgSize.h
    );

    rect2 = new Proton.Rectangle(
      rect.x - 100,
      rect.y - 100,
      rect.width + 200,
      rect.height + 200
    );
    randomBehaviour = new Proton.RandomDrift(0, 0, 0.05);
    var rectZone = new Proton.RectZone(
      rect2.x,
      rect2.y,
      rect2.width,
      rect2.height
    );
    crossBehaviour = new Proton.CrossZone(rectZone, "bound");
    gravityWellBehaviour = new Proton.GravityWell(
      {
        x: w / 2,
        y: h / 2
      },
      0,
      0
    );

    // canvas.addEventListener('mousedown', mouseDownHandler, false);
    loadImage();
  }

  function addStats() {
    stats = new Stats();
    stats.setMode(2);
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0px";
    stats.domElement.style.top = "0px";
    document.getElementById("container").appendChild(stats.domElement);
  }

  function loadImage() {
    logoZone = [];
    var logo = [];
    var loader = new PxLoader();
    logo[0] = loader.addImage(img);

    loader.addCompletionListener(function () {
      for (var i = 0; i < logo.length; i++) {
        var imagedata = Proton.Util.getImageData(context, logo[i], rect);
        logoZone.push(new Proton.ImageZone(imagedata, rect.x, rect.y));
        imageDatas.push(imagedata);
      }
      createProton(rect);
      tick();
    });
    loader.start();
  }

  function createProton() {
    proton = new Proton();
    emitter = new Proton.Emitter();
    emitter.rate = new Proton.Rate(
      new Proton.Span(30000),
      new Proton.Span(0.1)
    );
    emitter.addInitialize(new Proton.Mass(1));
    emitter.addInitialize(
      new Proton.P(
        new Proton.RectZone(rect2.x, rect2.y, rect2.width, rect2.height)
      )
    );

    emitter.addBehaviour(randomBehaviour);
    emitter.addBehaviour(customToZoneBehaviour(logoZone[0], logoZone[0]));
    emitter.addBehaviour(crossBehaviour);
    emitter.addBehaviour(gravityWellBehaviour);

    emitter.emit("once");
    proton.addEmitter(emitter);

    renderer = new Proton.PixelRenderer(canvas);
    renderer.createImageData(rect2);
    proton.addRenderer(renderer);
  }

  function customToZoneBehaviour(zone1, zone2) {
    return {
      initialize: function (particle) {
        particle.R = Math.random() * 10;
        particle.Angle = Math.random() * Math.PI * 2;
        particle.speed = Math.random() * -2 + 1;
        particle.zones = [zone1.getPosition().clone()];
        particle.colors = getColor(particle.zones);
      },

      applyBehaviour: function (particle) {
        if (rootIndex % 2 != 0) {
          particle.v.clear();
          particle.Angle += particle.speed;
          var index = ((rootIndex % 4) + 1) / 2 - 1;
          var x =
            particle.zones[index].x + particle.R * Math.cos(particle.Angle);
          var y =
            particle.zones[index].y + particle.R * Math.sin(particle.Angle);

          particle.p.x += (x - particle.p.x) * 0.1;
          particle.p.y += (y - particle.p.y) * 0.1;
          particle.rgb.r = particle.colors[index].r;
          particle.rgb.g = particle.colors[index].g;
          particle.rgb.b = particle.colors[index].b;
        }
      }
    };
  }

  function getColor(posArr) {
    var arr = [];
    for (var i = 0; i < posArr.length; i++) {
      arr.push(logoZone[i].getColor(posArr[i].x, posArr[i].y));
    }
    return arr;
  }

  function mouseDownHandler(e) {
    rootIndex++;
    if (rootIndex % 2 == 0) {
      if (rootIndex % 4 == 2) randomBehaviour.reset(30, 30, 0.001);
      else
        gravityWellBehaviour.reset(
          {
            x: canvas.width / 2,
            y: canvas.height / 2
          },
          3000,
          500
        );
    } else {
      randomBehaviour.reset(0, 0, 0.001);
      gravityWellBehaviour.reset(
        {
          x: canvas.width / 2,
          y: canvas.height / 2
        },
        0,
        0
      );
    }
  }
  function tick() {
    playId = requestAnimationFrame(tick);
    proton.update();
    // stats.begin();
    // stats.end();
  }
};
//
watch(
  () => msgStore.LATEST_MSG,
  (val) => {
    val.img &&
      nextTick(() => {
        play(val.img);
      });
  }
);
onMounted(() => {
  nextTick(() => {
    msgStore.LATEST_MSG &&
      msgStore.LATEST_MSG.img &&
      play(msgStore.LATEST_MSG.img);
  });
});
</script>
<style lang=""></style>
