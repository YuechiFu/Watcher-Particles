<template lang="">
  <div>
    <div id="model_canvas" class="w-full h-700"></div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import Stats from "three/examples/jsm/libs/stats.module";

const el = ref();
onMounted(() => {
  let scene,
    camera,
    renderer,
    model,
    controls,
    parts = [];

  const stats = new Stats();
  document.body.appendChild(stats.dom);
  function onWindowResize() {
    const container = document.getElementById("canvas_container");
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
    render();
  }
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
    camera.position.set(0, 1, 10);
    camera.lookAt(scene.position);

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
    const container = document.getElementById("model_canvas");

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1, 10);
    // renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, 1, 0);

    // Light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 7.5);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight();
    scene.add(ambientLight);
    // loader
    const loader = new FBXLoader();
    loader.load("/landing/watcher.fbx", function (object) {
      model = object;
      model.position.set(0, 0, 0);
      model.scale.set(0.1, 0.1, 0.1);
      scene.add(model);
      extractParts(model);
    });

    window.addEventListener("resize", onWindowResize, false);

    animate();
  }

  function animate() {
    requestAnimationFrame(animate);
    // play()
    renderer.render(scene, camera);
    controls.update();
    stats.update();
  }

  
  init();
});
</script>
<style lang=""></style>
