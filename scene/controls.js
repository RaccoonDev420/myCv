import * as THREE from 'three';

const keysPressed = {};
let yaw = 0; // Horizontal rotation
let pitch = 0; // Vertical rotation
const sensitivity = 0.002; // Adjust for desired speed

export function initializeControls(camera, renderer) {
    // Pointer lock logic
    document.body.addEventListener('click', () => {
        document.body.requestPointerLock();
    });

    document.addEventListener('pointerlockchange', () => {
        if (document.pointerLockElement) {
            console.log('Pointer locked!');
        } else {
            console.log('Pointer unlocked!');
        }
    });

    // Mouse movement for rotation
    document.addEventListener('mousemove', (event) => {
        if (document.pointerLockElement) {
            yaw -= event.movementX * sensitivity;
            pitch -= event.movementY * sensitivity;

            // Clamp pitch to prevent flipping the camera
            pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));

            // Apply rotations
            camera.rotation.set(pitch, yaw, 0);
        }
    });

    // Keyboard controls
    document.addEventListener("keydown", (event) => {
        keysPressed[event.key] = true;
    });

    document.addEventListener("keyup", (event) => {
        keysPressed[event.key] = false;
    });

    // Resize handler
    window.addEventListener('resize', () => onWindowResize(camera, renderer), false);
}

function onWindowResize(camera, renderer) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

export function updateCameraPosition(delta, camera) {
    const movementSpeed = 20;
    const moveStep = movementSpeed * delta;

    // Forward/backward
    if (keysPressed["w"]) {
        camera.position.add(camera.getWorldDirection(new THREE.Vector3()).multiplyScalar(moveStep));
    }
    if (keysPressed["s"]) {
        camera.position.add(camera.getWorldDirection(new THREE.Vector3()).multiplyScalar(-moveStep));
    }

    // Left/right strafing
    if (keysPressed["a"]) {
        camera.position.add(camera.getWorldDirection(new THREE.Vector3()).cross(camera.up).normalize().multiplyScalar(-moveStep));
    }
    if (keysPressed["d"]) {
        camera.position.add(camera.getWorldDirection(new THREE.Vector3()).cross(camera.up).normalize().multiplyScalar(moveStep));
    }
}
