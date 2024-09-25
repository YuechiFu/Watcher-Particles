<template>
  <div ref="el" class="bg-zinc-900 overflow-hidden mx-auto block"></div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";

import Stats from "three/examples/jsm/libs/stats.module";
import Proton from "three.proton.js";
import { useMsgStore } from "@/store";
const msgStore = useMsgStore();

const el = ref(null);

let proton, emitter;
let canvasW, canvasH, scene, camera, renderer, clock, controls, stats, mesh;

async function initScene() {
  // 创建场景、摄像机和渲染器
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 1000;
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xffffff, 1, 10000);
  renderer = new THREE.WebGLRenderer();
  canvasW = el.value.clientWidth;
  canvasH = el.value.clientHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
  el.value.appendChild(renderer.domElement);

  // 初始化时钟
  clock = new THREE.Clock();

  var ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);

  var pointLight = new THREE.PointLight(0xffffff, 2, 1000, 1);
  pointLight.position.set(0, 200, 200);
  scene.add(pointLight);
}

function addOrbitControl() {
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.autoRotate = true;
  controls.target.set(0, 0, 0);
}

function addStats() {
  stats = new Stats();
  stats.showPanel(0);
  stats.dom.style.position = "absolute";
  stats.dom.style.left = "0px";
  stats.dom.style.top = "0px";
  el.value.appendChild(stats.dom);
}
function createEmitter() {
  emitter = new Proton.Emitter();
  emitter.rate = new Proton.Rate(
    new Proton.Span(4, 8),
    new Proton.Span(0.2, 0.5)
  );
  emitter.addInitialize(new Proton.Mass(1));
  emitter.addInitialize(new Proton.Radius(100));
  emitter.addInitialize(new Proton.Life(2, 4));
  emitter.addInitialize(
    new Proton.Velocity(400, new Proton.Vector3D(0, 1, 0), 60)
  );

  // //emitter.addBehaviour(new Proton.RandomDrift(30, 30, 30, .05));
  emitter.addBehaviour(new Proton.Rotate("random", "random"));
  emitter.addBehaviour(new Proton.Scale(1, 0.1));
  emitter.addBehaviour(new Proton.G(6));

  var zone = new Proton.BoxZone(600);
  zone.friction = 0.95;
  zone.max = 7;
  emitter.addBehaviour(new Proton.CrossZone(zone, "bound"));
  emitter.addBehaviour(
    new Proton.Color(0xff0000, "random", Infinity, Proton.easeOutQuart)
  );

  emitter.p.x = 0;
  emitter.p.y = 0;
  emitter.emit();

  Proton.Debug.drawZone(proton, scene, zone);
  return emitter;
}

async function modelToMesh(modelFile, gap) {
  const loader = new FBXLoader();
  loader.load(modelFile, (object) => {
    object.scale.set(0.0001);
    mesh = object;
    /* object.traverse((child) => {
      if (child.isMesh) {
        // mesh = new THREE.Mesh(child.geometry, new THREE.MeshBasicMaterial());
        // console.log(child.matrixWorld, geometry)
      }
    }); */
  });
}

async function loadModel(callback) {
  var material = new THREE.MeshNormalMaterial();
  var loader = new GLTFLoader();
  loader.load("/models/DamagedHelmet.gltf", function (gltf) {
    const scene = gltf.scene;
    console.log(scene);
    mesh = scene.children[0];
  });

  /*  loader.load("/models/suzane.json", function (geometry) {
    console.log(geometry)
    geometry.computeVertexNormals();
    mesh = new THREE.Mesh(geometry, material);
    callback();
  }); */
  /*   const geometry = new THREE.BufferGeometry();
  const res = await (await fetch("/models/suzane.json")).json()
  console.log(res)

  geometry.setAttribute( 'position', new THREE.BufferAttribute( res.vertices, 3 ) );
  geometry.computeVertexNormals(); */
  //   const geometry = new THREE.BoxGeometry(1, 1, 1);
  //   const geometry = new THREE.SphereGeometry(1, 16, 16);
  //   mesh = new THREE.Mesh(geometry, material);
  //   modelToMesh('/models/watcher.fbx')
  callback();
}
function initProton() {
  proton = new Proton();
  proton.addEmitter(createEmitter());

  //add custom renderer
  var renderer = new Proton.CustomRender();
  renderer.onParticleCreated = function (p) {
    //p.target = mesh.clone();
    p.target = this.targetPool.get(mesh);
    p.target.position.copy(p.p);
    scene.add(p.target);
  };

  renderer.onParticleUpdate = function (p) {
    p.target.position.copy(p.p);
    p.target.rotation.set(p.rotation.x, p.rotation.y, p.rotation.z);

    var scale = p.scale * 30;
    p.target.scale.set(scale, scale, scale);
  };

  renderer.onParticleDead = function (p) {
    this.targetPool.expire(p.target);
    scene.remove(p.target);
    p.target = null;
  };

  proton.addRender(renderer);
}
let isPause = true;
function animate() {
  
  stats.begin();
  requestAnimationFrame(animate);
  if(!isPause) render();
  stats.end();
}

var tha = 0;

function render() {
  proton.update();
  renderer.render(scene, camera);
  controls.update();
  Proton.Debug.renderInfo(proton, 3);
}

function initAll() {
  initScene();
  initProton();
  addStats();
  addOrbitControl();
  animate();
}

function init() {
  loadModel(initAll);
}
onMounted(() => {
  init();
});

onUnmounted(() => {
  if (renderer) {
    renderer.dispose();
  }
});

watch(
  () => msgStore.LATEST_MSG,
  (val) => {
    isPause = false;
    setTimeout(() => {
      isPause = true;
    }, 5000);
  }
);
</script>
