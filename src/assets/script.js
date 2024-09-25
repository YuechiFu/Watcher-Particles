let scene,
  camera,
  renderer,
  model,
  parts = [];

function init() {
  const container = document.getElementById('canvas_container');

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
  // Light
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 10, 7.5);
  scene.add(light);
  // loader
  const loader = new THREE.FBXLoader();
  loader.load('watcher.fbx', function (object) {
    model = object;
    model.position.set(0, 0, 0);
    model.scale.set(0.1, 0.1, 0.1);
    scene.add(model);
    console.log('Model loaded');
    extractParts(model);
  });

  // window.addEventListener('resize', onWindowResize, false);
  animate();
}

function extractParts(model) {
  model.traverse(child => {
    if (child.isMesh) {
      parts.push(child);
      // Store the original position
      child.userData.originalPosition = child.position.clone();
    }
  });
}

function onWindowResize() {
  const container = document.getElementById('canvas_container');
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

function onScroll(e) {
  // const scrollY = window.scrollY;
  // const scrollPercent = scrollY / (document.body.scrollHeight - window.innerHeight);
  const scrollPercent = e.progress;
  const firstPart = 2 / 3;
  const secondPart = 1 / 3;
  const explodeStart = firstPart;

  if (model) {
    if (scrollPercent <= firstPart) {
      // Rotate the model during the first 2/3 of the scroll
      model.rotation.y = (scrollPercent / firstPart) * Math.PI * 2; // Adjust rotation speed as needed
      console.log('Model rotation:', model.rotation.y);

      // Ensure parts are at their original position when rotating
      parts.forEach(part => {
        part.position.copy(part.userData.originalPosition);
      });

      // Ensure the camera is at the original position when rotating
      camera.position.set(0, 1, 10);
      camera.lookAt(scene.position);
    } else {
      // Explode the model during the last 1/3 of the scroll
      const explodePercent = (scrollPercent - explodeStart) / secondPart;
      const explodeFactor = explodePercent * 20; // Adjust factor as needed

      // Rotate the model to the side view before explosion
      model.rotation.set(0, Math.PI / 2, 0);

      parts.forEach((part, index) => {
        part.position.set(
          part.userData.originalPosition.x + index * explodeFactor,
          part.userData.originalPosition.y, // Keep the original Y position
          part.userData.originalPosition.z + index * explodeFactor - 100
        );
      });

      // Adjust the camera angle for side view
      camera.position.set(10, 1, 10);
      camera.lookAt(scene.position);
    }
  }
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

const handleScrollS1 = e => {
  if (!model) return;
  model.rotation.y = e.progress * Math.PI * 2; // Adjust rotation speed as needed
  console.log('Model rotation:', model.rotation.y);

  // Ensure parts are at their original position when rotating
  parts.forEach(part => {
    part.position.copy(part.userData.originalPosition);
  });

  // Ensure the camera is at the original position when rotating
  camera.position.set(0, 1, 10);
  camera.lookAt(scene.position);
};

const handleScrollS2 = e => {
  if (!model) return;
  const explodeFactor = e.progress * 20; // Adjust factor as needed

  // Rotate the model to the side view before explosion
  model.rotation.set(0, Math.PI / 2, 0);

  parts.forEach((part, index) => {
    part.position.set(
      part.userData.originalPosition.x + index * explodeFactor,
      part.userData.originalPosition.y, // Keep the original Y position
      part.userData.originalPosition.z + index * explodeFactor - 100
    );
  });

  // Adjust the camera angle for side view
  camera.position.set(10, 1, 10);
  camera.lookAt(scene.position);
};

const initScrollMagic = () => {
  var controller = new ScrollMagic.Controller();
  // create a scene

  var s1 = new ScrollMagic.Scene({
    triggerElement: '#s1_trigger',
    reverse: true,
    duration: window.innerHeight, // the scene should last for a scroll distance of 100px
    offset: 0, // start this scene after scrolling for 50px
    triggerHook: 0,
  })
    .setPin('#canvas_container') // pins the element for the the scene's duration

    .addTo(controller)
    .on('start', e => {
      !scene && init();
    })
    .on('progress', handleScrollS1)
    .on('leave', () => {})
    // .addIndicators({ name: 'Model Animation ' });
  var s2 = new ScrollMagic.Scene({
    triggerElement: '#s2_trigger',
    reverse: true,
    duration: window.innerHeight * 2, // the scene should last for a scroll distance of 100px
    offset: 0, // start this scene after scrolling for 50px
    triggerHook: 0,
  })
    .setPin('#canvas_container') // pins the element for the the scene's duration
    .addTo(controller)
    .on('progress', handleScrollS2)
    // .addIndicators({ name: 'Model Mesh Split' });
};
initScrollMagic();
// init();
