<template>
  <div>
    <div ref="threejsCanvas" class="w-full h-full"></div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch, defineProps, nextTick } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
  loadModelParticles,
  moveParticels,
  resetModelParticles
} from "@/utils/particles";
import Stats from "three/examples/jsm/libs/stats.module";
import modelParticleConfig from "./modelParticle.config";
import { HANDPOST_TYPES } from "@/defines";

const threejsCanvas = ref(null);
const props = defineProps(["modelKey", "controls"]);
let scene,
  camera,
  renderer,
  particles,
  clock,
  controls,
  animationId,
  initialCameraFov;
let particlePositions,
  particleTargets,
  particleCount,
  canvasW,
  canvasH,
  speed = 1,
  currentModelKey;
let models = modelParticleConfig;

onMounted(async () => {
  // await initThree();
  // animate();
});

onUnmounted(() => {
  stop();
  if (renderer) {
    renderer.dispose();
    models = null;
  }
});

watch(
  () => props.modelKey,
  (val) => {
    if (val && val !== currentModelKey) {
      nextTick(async () => {
        if (!renderer) {
          await initThree();
          animate();
        } else {
          switchModel(val);
        }
      });
    } else {
      switchModel(null);
    }
  },
  {
    immediate: true
  }
);

watch(
  () => props.controls,
  (ctrl) => {
    const fov = initialCameraFov;
    // console.log(initialCameraFov)
    if (!ctrl.value) {
      console.log("RESET");
      camera.fov = initialCameraFov;
      controls.autoRotate = true;
      camera.updateProjectionMatrix();
      return;
    }

    if (controls.autoRotate) {
      controls.autoRotate = false;
    }
    console.log(ctrl.status, ctrl.value);
    switch (ctrl.status) {
      case HANDPOST_TYPES.UpdatePose:
        let { scale, rotate } = ctrl.value;
        camera.fov = fov * (1 - scale);
        
        // camera.lookAt(new THREE.Vector3(1 + rotate.x * 10, 1 + rotate.y * 10, 0))
        // camera.rotation.x += rotate.x *  90 * Math.PI / 180
       
        // 更新相机位置 */
        controls.update();
        camera.updateProjectionMatrix();
        // camera.updateMatrixWorld();

        break;
      /*  case HANDPOST_TYPES.Rotate: 
        let valx = 360 * ctrl.value[0]
        camera.rotation.y = THREE.MathUtils.degToRad(valx); 
        break; */
    }
  }
);

function setCamera() {
  const m = new THREE.PerspectiveCamera(75, 1, 0.1, 100);
  m.position.z = 3;
  m.position.x = 1;
  m.position.y = 1;
  return m;
}
function setControls(camera, renderer) {
  const c = new OrbitControls(camera, renderer.domElement);
  c.enableDamping = true;
  return c;
}

function initParticlesData(modelParticles) {
  particles = modelParticles.particles;
  particlePositions = modelParticles.particlePositions;
  particleTargets = modelParticles.particleTargets;
  particleCount = modelParticles.particleCount;
}

// List of model paths
let isAddedPartical = false;
async function switchModel(key) {
  if (!(key && models[key])) {
    stop();
    currentModelKey = "";
    return;
  }
  // stop();
  let res;
  if (!models[key].particlesCache) {
    models[key].particlesCache = await loadModelParticles(
      models[key],
      particlePositions
    );
  } else {
    models[key].particlesCache = resetModelParticles(
      models[key],
      particlePositions
    );
  }

  currentModelKey = key;
  scene.remove(particles);
  initParticlesData(models[key].particlesCache);
  scene.add(particles);
  /*   if (!isAddedPartical) {
    scene.add(particles); // Add the new particles
    isAddedPartical = true;
  } */
  models[key].controls && controls.target.set(...models[key].controls);
  if (models[key].speed) {
    speed = models[key].speed;
  }
  if (models[key].fov) {
    camera.fov = models[key].fov;
    camera.updateProjectionMatrix();
  }
  controls.autoRotate = !!models[key].autoRotate;
  models[key].cameraPos && camera.position.set(...models[key].cameraPos);
  initialCameraFov = camera.fov;

  animate();
}

async function initThree() {
  canvasW = threejsCanvas.value.clientWidth;
  canvasH = threejsCanvas.value.clientHeight;
  camera = setCamera();
  // Create scene, camera, and renderer
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(canvasW, canvasH);
  threejsCanvas.value.appendChild(renderer.domElement);
  clock = new THREE.Clock();
  controls = setControls(camera, renderer);
  await switchModel(props.modelKey);
}

function stop() {
  scene.clear();
  particles && scene.remove(particles);
  isAddedPartical = false;
  animationId && cancelAnimationFrame(animationId);
  particles = undefined;
}

function animate() {
  animationId = requestAnimationFrame(animate);
  handleMoveParticles();
  // updateParticles()
  controls.update();
  renderer.render(scene, camera);
}

function handleMoveParticles() {
  if (!particles) {
    return;
  }
  const moveSpeed = clock.getDelta() * speed;
  moveParticels(
    particleTargets,
    particlePositions,
    particleCount * 3,
    moveSpeed,
    (currentPosData) => {
      particlePositions = currentPosData;
      particles.geometry.attributes.position.needsUpdate = true;
    }
  );
}
</script>
