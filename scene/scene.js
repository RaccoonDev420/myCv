import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { assets } from './scene/assets';
import { addPlanetsToScene, updatePlanetPositions } from './scene/planets';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
const clock = new THREE.Clock();

const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg') });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

camera.position.set(1, 60, 0);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;
controls.enablePan = false;
controls.maxPolarAngle = Math.PI / 2;
controls.update();

const movementSpeed = 20;
const keysPressed = {};

document.addEventListener("keydown", (event) => {
    keysPressed[event.key] = true;
});

document.addEventListener("keyup", (event) => {
    keysPressed[event.key] = false;
});

function addLights() {
    // Point Light: Increase intensity and adjust position
    const light = new THREE.PointLight(0xb1ddf9, 2, 10000);  // Increased intensity to 2
    light.position.set(10, 11, 0);  // Adjust position to illuminate the scene better
    scene.add(light);

    // Ambient Light: Increase intensity
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);  // Increased intensity to 0.5
    scene.add(ambientLight);

    // Directional Light: Increase intensity and adjust position
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);  // Increased intensity to 1.5
    directionalLight.position.set(10, 20, 10);  // Adjusted position for better illumination
    scene.add(directionalLight);

    // Hemisphere Light: Increased intensity
    const hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 1.5);  // Increased intensity to 1.5
    hemisphereLight.position.set(0, 20, 0);  // Adjusted position
    scene.add(hemisphereLight);

    const lightHelper = new THREE.PointLightHelper(light);
    scene.add(light, lightHelper);
}

addLights();

const planetTextures = {
    sun: assets.sunMap,
    mercury: assets.mercuryMap,
    venus: assets.venusMap,
    earth: assets.earthMap,
    moon: assets.moonMap,
    mars: assets.marsMap,
    jupiter: assets.jupiterMap,
    saturn: assets.saturnMap,
    saturnRing: assets.saturnRingMap,
    uranus: assets.uranusMap,
    space: assets.spacePicture
};

const planetContainers = addPlanetsToScene(scene, planetTextures);

function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    updatePlanetPositions(planetContainers, delta);

    controls.update();
    renderer.render(scene, camera);
}


animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
