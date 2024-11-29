<template lang="">
  <div class="model_fbx_display">
    <div ref="$el" class="w-full h-500"></div>
  </div>
</template>
<script setup>
import { ref, onMounted, watch, defineProps, nextTick } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import Stats from "three/examples/jsm/libs/stats.module";

import modelParticleConfig from "@/modelParticle.config";
const props = defineProps(["modelKey"]);
const $el = ref();
let models = modelParticleConfig;
let curentModel = "";
let scene,
  camera,
  renderer,
  model,
  controls,
  parts = [];
watch(
  () => props.modelKey,
  (val) => {
    if (val) {
      nextTick(() => {
        scene && scene.clear()
        initModel(models[val].file);
      });
    }
  },
  {
    immediate: true
  }
);
function initModel(modelFile) {
  /*  function onWindowResize() {
    const container = $el.value;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.position.set(0,0,-10);
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
    render();
  } */
  function extractParts(model) {
    model.traverse((child) => {
      if (child.isMesh) {
        parts.push(child);
        child.userData.originalPosition = child.position.clone();
      }
    });
  }

  const play = () => {
    if (!model) return;
    model.rotation.y = 0.3 * Math.PI * 2; // Adjust rotation speed as needed
    console.log("Model rotation:", model.rotation.y);

    // Ensure parts are at their original position when rotating
    parts.forEach((part) => {
      part.position.copy(part.userData.originalPosition);
    });

    // Ensure the camera is at the original position when rotating
    // camera.position.set(-10,-10,-0);
    // camera.lookAt(scene.position);

    // a2

    // Rotate the model to the side view before explosion
    model.rotation.set(0, Math.PI / 2, 0);

    parts.forEach((part, index) => {
      part.position.set(
        part.userData.originalPosition.x + index * 1,
        part.userData.originalPosition.y, // Keep the original Y position
        part.userData.originalPosition.z + index * 1 - 100
      );
    });

    // Adjust the camera angle for side view
    camera.position.set(10, 1, 10);
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  };

  function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      75,
      $el.value.clientWidth / $el.value.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, -1.2);

    // renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize($el.value.clientWidth, $el.value.clientHeight);
    $el.value.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, 0, 0);

    // Light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    // loader
    const loader = new FBXLoader();
    loader.load(modelFile, function (object) {
      model = object;
      // model.position.set(0, 0, 0);
      model.scale.set(0.015, 0.015, 0.015);
      scene.add(model);
      // extractParts(model);
    });

    // window.addEventListener("resize", onWindowResize, false);

    animate();
  }

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
    // play()
    // stats.update();
  }

  init();
}
onMounted(() => {});
</script>
<style lang=""></style>
