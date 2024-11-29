

import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";


function getPositionWithGap(source, gap) {
  const arr = [];
  const totalSize = source.length;
  for (let i = 0; i < totalSize; i += 3 + gap * 3) {
    if (
      source[i] !== undefined &&
      source[i + 1] !== undefined &&
      source[i + 2] !== undefined
    ) {
      ``
      arr.push(source[i]);
      arr.push(source[i + 1]);
      arr.push(source[i + 2]);
    }
  }
  return arr;
}


export function generateRandomColor() {
  let color = "#";
  for (let i = 0; i < 6; i++) {
    const random = Math.floor(Math.random() * 16);
    color += random.toString(16);
  }
  return color;
}



function concatTypedArrays(...arrays) {
  let totalLength = arrays.reduce((acc, value) => acc + value.length, 0);
  let result = new Float32Array(totalLength);
  let offset = 0;

  for (let array of arrays) {
    result.set(array, offset);
    offset += array.length;
  }

  return result;
}


function spliceTypedArray(typedArray, start, deleteCount, ...items) {
  if (start < 0) {
    start = Math.max(typedArray.length + start, 0);
  } else {
    start = Math.min(start, typedArray.length);
  }

  if (deleteCount === undefined) {
    deleteCount = typedArray.length - start;
  }

  let newSize = typedArray.length + items.length - deleteCount;
  let splicedArray = new Float32Array(newSize);

  splicedArray.set(typedArray.subarray(0, start));

  splicedArray.set(items, start);

  splicedArray.set(typedArray.subarray(start + deleteCount), start + items.length);

  return splicedArray;
}

export function createRandomParticles(
  size,
  randomFn = () => [
    (Math.random() - 0.5) * 30,
    (Math.random() - 0.5) * 30,
    (Math.random() - 0.5) * 30
  ]
) {
  if (!size) { return [] }
  const arr = new Float32Array(size * 3);
  for (let i = 0; i < size; i++) {
    const values = randomFn()
    arr[i] = values[0],
      arr[i + 1] = values[1];
    arr[i + 2] = values[2];
  }
  return arr
}


export async function moveParticels(targetPosData, currentPosData, targetSize, speed, cb) {
  for (let i = 0; i < targetSize; i++) {
    const index = i
    const dx = targetPosData[index] - currentPosData[index];
    const dy = targetPosData[index + 1] - currentPosData[index + 1];
    const dz = targetPosData[index + 2] - currentPosData[index + 2];

    if (Math.abs(dx) > 0.01 || Math.abs(dy) > 0.01 || Math.abs(dz) > 0.01) {
      currentPosData[index] += dx * speed;
      currentPosData[index + 1] += dy * speed;
      currentPosData[index + 2] += dz * speed;
    } else {
      currentPosData[index] = targetPosData[index];
      currentPosData[index + 1] = targetPosData[index + 1];
      currentPosData[index + 2] = targetPosData[index + 2];
    }
  }
  cb && cb(currentPosData)
}



export async function loadModelParticles(modelConfig, currentParticles) {
  const modelFile = modelConfig.file
  const { gap, particleScale, particleSize, particleColor } = modelConfig
  if (!modelFile) {
    return;
  }
  const loader = new FBXLoader();
  return new Promise((resolve) => {
    loader.load(modelFile, (model) => {
      const geometries = [];
      model.traverse((child) => {
        if (child.isMesh) {
          const geometry = child.geometry;
          geometry.applyMatrix4(child.matrixWorld); // Apply world matrix
          geometries.push(geometry);
        }
      });

      const mergedGeometry = BufferGeometryUtils.mergeGeometries(
        geometries,
        false
      );
      particleScale ? mergedGeometry.scale(...particleScale) : mergedGeometry.scale(0.05, 0.05, 0.05)
      let vertices = getPositionWithGap(
        mergedGeometry.attributes.position.array,
        gap || 0
      );

      const particleCount = vertices.length / 3;//new Float32Array(vertices.length)
      const particleTargets = [...vertices];
      resolve(resetModelParticles({
        ...modelConfig,
        particlesCache: {
          particleTargets,
          particleCount,
        }
      }, currentParticles))
    });
  });
}



export function resetModelParticles(modelConfig, particlePositions) {
  const { particleSize, particleColor, particlesCache } = modelConfig
  if (!particlesCache) { return }
  const { particleCount, particleTargets } = particlesCache
  if(particlePositions){
    const diff = particleCount - particlePositions.length / 3;
    if (diff !== 0) {
      if (diff > 0) {
        particlePositions = concatTypedArrays(particlePositions, createRandomParticles(diff))
      } else {
        particlePositions = spliceTypedArray(particlePositions, particleCount)
      }
    }
  }else{
    particlePositions =  createRandomParticles(particleCount);
  }
 

  const particlesGeometry = new THREE.BufferGeometry();
  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(particlePositions, 3)
  );
  const particlesMaterial = new THREE.PointsMaterial({
    size: particleSize || 0.005,
    color: particleColor || generateRandomColor()
  });
  const particles = new THREE.Points(particlesGeometry, particlesMaterial);
  return ({
    particles,
    particlePositions,
    particleTargets,
    particleCount,
  });

}

