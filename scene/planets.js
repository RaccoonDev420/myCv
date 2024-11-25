import * as THREE from 'three';
import { assets } from './assets';

export const createPlanet = (radius, textures, position, isBox = false) => {
    const geometry = isBox
        ? new THREE.BoxGeometry(radius, radius, radius)
        : new THREE.SphereGeometry(radius, 32, 32);
    const material = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load(textures.map),
        normalMap: textures.normalMap ? new THREE.TextureLoader().load(textures.normalMap) : null,
    });
    const planet = new THREE.Mesh(geometry, material);
    planet.position.set(position.x, position.y, position.z);
    return planet;
};

function addStar(scene) {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(400));
    star.position.set(x, y, z);
    scene.add(star);
}


export const addPlanetsToScene = (scene) => {
    //const spaceTexture = new THREE.TextureLoader().load(assets.spacePicture);
    //scene.background = spaceTexture;

    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);

    const sun = createPlanet(35, {map:assets.sunPicture, normalMap: assets.sunMap}, { x: 0, y: 0, z: 0 });
    const sunContainer = new THREE.Object3D();
    sunContainer.add(sun);
    scene.add(sunContainer);

    const mercury = createPlanet(3.5, {map:assets.mercuryPicture, normalMap: assets.mercuryMap}, { x: 0, y: 0, z: 55 });
    const mercuryContainer = new THREE.Object3D();
    mercuryContainer.add(mercury);
    sunContainer.add(mercuryContainer);

    const venus = createPlanet(4, {map:assets.venusPicture, normalMap: assets.venusMap}, { x: 0, y: 0, z: -80 });
    const venusContainer = new THREE.Object3D();
    venusContainer.add(venus);
    sunContainer.add(venusContainer);

    const earth = createPlanet(5, {map: assets.earthPicture, normalMap:assets.earthMap}, { x: 0, y: 0, z: 100 });
    const earthContainer = new THREE.Object3D();
    earthContainer.add(earth);
    sunContainer.add(earthContainer);

    const moon = createPlanet(1.5, {map: assets.moonPicture, normalMap:assets.moonMap}, { x: 0, y: 0, z: 10 });
    const moonContainer = new THREE.Object3D();
    moonContainer.add(moon);
    earthContainer.add(moonContainer);

    const mars = createPlanet(5, {map: assets.marsPicture, normalMap: assets.marsMap}, { x: 0, y: 0, z: 150 });
    const marsContainer = new THREE.Object3D();
    marsContainer.add(mars);
    sunContainer.add(marsContainer);

    const jupiter = createPlanet(10, {map: assets.jupiterPicture, normalMap: assets.jupiterMap}, { x: 0, y: 0, z: 300 });
    const jupiterContainer = new THREE.Object3D();
    jupiterContainer.add(jupiter);
    sunContainer.add(jupiterContainer);

    const saturn = createPlanet(9, {map: assets.saturnPicture, normalMap:assets.saturnMap}, { x: 0, y: 0, z: 400 });
    const saturnContainer = new THREE.Object3D();
    saturnContainer.add(saturn);
    sunContainer.add(saturnContainer);

    const ring = createPlanet(12, { map: assets.saturnRingPicture, normalMap: assets.saturnRingMap }, { x: 0, y: 0, z: 0 }, true);
    const ringContainer = new THREE.Object3D();
    ringContainer.add(ring);
    saturnContainer.add(ringContainer);

    const uranus = createPlanet(7, {map:assets.uranusPicture, normalMap: assets.uranusMap}, { x: 0, y: 0, z: 600 });
    const uranusContainer = new THREE.Object3D();
    uranusContainer.add(uranus);
    sunContainer.add(uranusContainer);

    scene.add(sunContainer);

    // Torus
    const geometry = new THREE.TorusGeometry(10, 4, 20, 100);
    const material = new THREE.MeshStandardMaterial({ color: 0x03fc88 });
    const torus = new THREE.Mesh(geometry, material);
    torus.position.set(0, 0, 0);
    scene.add(torus);

    const salmeTexture = new THREE.TextureLoader().load(assets.profilePicture);
    const salme = new THREE.Mesh(
        new THREE.BoxGeometry(5, 5, 5),
        new THREE.MeshStandardMaterial({ map: salmeTexture })
    );
    scene.add(salme);
    salme.position.set(0, 0, 0);


    const planetSalme = new THREE.Object3D();
    planetSalme.add(torus, salme);
    scene.add(planetSalme);
    planetSalme.position.set(10, 55, 15);
    const stars = Array(600).fill().forEach(() => addStar(scene));


    return {
        sunContainer,
        mercuryContainer,
        venusContainer,
        earthContainer,
        moonContainer,
        marsContainer,
        jupiterContainer,
        saturnContainer,
        ringContainer,
        uranusContainer,
        ambientLight,
        planetSalme,
        torus,
        mercury,
        venus,
        earth,
        mars,
        jupiter,
        saturn,
        uranus,
        salme,
        stars
    };
};

export const updatePlanetPositions = (planetContainers, delta) => {
    const earthSpeed = 0.025;
    const mercurySpeed = earthSpeed * 4.14772727;
    const venusSpeed = earthSpeed * 1.6222222;
    const marsSpeed = earthSpeed * 0.531295488;
    const jupiterSpeed = earthSpeed * 0.0933333;
    const saturnSpeed = earthSpeed * 0.0544827586;
    const uranusSpeed = earthSpeed * 0.03581454;

    planetContainers.sunContainer.rotation.y += earthSpeed * delta;
    planetContainers.mercuryContainer.rotation.y += mercurySpeed * delta;
    planetContainers.venusContainer.rotation.y += venusSpeed * delta;
    planetContainers.earthContainer.rotation.y += earthSpeed * delta;
    planetContainers.marsContainer.rotation.y += marsSpeed * delta;
    planetContainers.jupiterContainer.rotation.y += jupiterSpeed * delta;
    planetContainers.saturnContainer.rotation.y += saturnSpeed * delta;
    planetContainers.uranusContainer.rotation.y += uranusSpeed * delta;

    planetContainers.moonContainer.rotation.y += earthSpeed * delta;
    planetContainers.ringContainer.rotation.y += saturnSpeed * delta;

    planetContainers.torus.rotation.x += 0.01;
    planetContainers.torus.rotation.y += 0.005;
    planetContainers.torus.rotation.z += 0.01;
    planetContainers.salme.rotation.x += 0.01 * mercurySpeed;
    planetContainers.salme.rotation.y += 0.1 * earthSpeed;

    planetContainers.mercury.rotation.y += 0.02;
    planetContainers.venus.rotation.y += 0.015;
    planetContainers.earth.rotation.y += 0.01;
    planetContainers.mars.rotation.y += 0.015;
    planetContainers.jupiter.rotation.y += 0.007;
    planetContainers.saturn.rotation.y += 0.009;
};
