import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { initializeControls, updateCameraPosition } from './scene/controls';
import { addPlanetsToScene, updatePlanetPositions } from './scene/planets';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
const clock = new THREE.Clock();

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);


const orientation = new THREE.Object3D;
scene.add(orientation);
orientation.position.set(40, 50, 20);

const worldPosition = new THREE.Vector3();
orientation.getWorldPosition(worldPosition);



camera.position.set(1, 60, 0);
camera.lookAt(worldPosition);
camera.up.set(0, 1, 0);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth control
controls.dampingFactor = 0.1;
controls.enablePan = true; // Disable panning if desired
controls.maxPolarAngle = Math.PI / 2; // Limit vertical rotation
controls.update();

const gridHelper = new THREE.GridHelper(200, 200);
//scene.add(gridHelper)

const planetContainers = addPlanetsToScene(scene);
initializeControls(camera, renderer);
function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta(); // Get time since last frame
    updateCameraPosition(delta, camera);
    updatePlanetPositions(planetContainers, delta);
    renderer.render(scene, camera);
}

animate();