import * as THREE from 'three';

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

export const addPlanetsToScene = (scene, textures) => {
    const spaceTexture = new THREE.TextureLoader().load(textures.space.map);
    scene.background = spaceTexture;

    const sun = createPlanet(35, textures.sun, { x: 0, y: 0, z: 0 });
    const sunContainer = new THREE.Object3D();
    sunContainer.add(sun);
    scene.add(sunContainer);

    const mercury = createPlanet(3.5, textures.mercury, { x: 0, y: 0, z: 55 });
    const mercuryContainer = new THREE.Object3D();
    mercuryContainer.add(mercury);
    sunContainer.add(mercuryContainer);

    const venus = createPlanet(4, textures.venus, { x: 0, y: 0, z: 80 });
    const venusContainer = new THREE.Object3D();
    venusContainer.add(venus);
    sunContainer.add(venusContainer);

    const earth = createPlanet(5, textures.earth, { x: 0, y: 0, z: 100 });
    const earthContainer = new THREE.Object3D();
    earthContainer.add(earth);
    sunContainer.add(earthContainer);

    const moon = createPlanet(1.5, textures.moon, { x: 0, y: 0, z: 10 });
    const moonContainer = new THREE.Object3D();
    moonContainer.add(moon);
    earthContainer.add(moonContainer);

    const mars = createPlanet(5, textures.mars, { x: 0, y: 0, z: 150 });
    const marsContainer = new THREE.Object3D();
    marsContainer.add(mars);
    sunContainer.add(marsContainer);

    const jupiter = createPlanet(10, textures.jupiter, { x: 0, y: 0, z: 300 });
    const jupiterContainer = new THREE.Object3D();
    jupiterContainer.add(jupiter);
    sunContainer.add(jupiterContainer);

    const saturn = createPlanet(9, textures.saturn, { x: 0, y: 0, z: 400 });
    const saturnContainer = new THREE.Object3D();
    saturnContainer.add(saturn);
    sunContainer.add(saturnContainer);

    const ring = createPlanet(12, { map: textures.saturnRing }, { x: 0, y: 0, z: 0 }, true);
    const ringContainer = new THREE.Object3D();
    ringContainer.add(ring);
    saturnContainer.add(ringContainer);

    const uranus = createPlanet(7, textures.uranus, { x: 0, y: 0, z: 600 });
    const uranusContainer = new THREE.Object3D();
    uranusContainer.add(uranus);
    sunContainer.add(uranusContainer);

    scene.add(sunContainer);

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
};
