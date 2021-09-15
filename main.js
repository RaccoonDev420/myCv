import './style.css';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { Camera, MathUtils } from 'three';
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);


const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);


// Torus
const geometry = new THREE.TorusGeometry(10, 3, 20, 100);
const material = new THREE.MeshStandardMaterial({ color: 0x03fc88 });
const torus = new THREE.Mesh(geometry, material);
torus.position.set(0,0,0);
scene.add(torus);

const salmeTexture = new THREE.TextureLoader().load('img/valin.jpg');
const salme = new THREE.Mesh(
	new THREE.BoxGeometry(5,5,5),
	new THREE.MeshStandardMaterial({ map: salmeTexture})
);
scene.add(salme);
salme.position.set(0,0,0);


const planetSalme = new THREE.Object3D();
planetSalme.add(torus, salme);
scene.add(planetSalme);
planetSalme.position.set(10,55,15);


const orientation = new THREE.Object3D;
scene.add(orientation);
orientation.position.set(40,50,20);

const worldPosition = new THREE.Vector3();
orientation.getWorldPosition( worldPosition );



camera.position.set( 1,60,0 );
camera.lookAt( worldPosition );
camera.up.set( 0, 1, 0 );

// Lights
function addLigths(){
	//PointLight
	const light = new THREE.PointLight( 0xb1ddf9, 1, 10000 ); // soft white light
	light.position.set(10,11,0);
	const lightHelper = new THREE.PointLightHelper(light);
	//scene.add(light, lightHelper);

	//AmbientLight
	const ambientLight = new THREE.AmbientLight( 0xffffff );
	scene.add(ambientLight);

	//DirectionalLight
	const directionalLight = new THREE.DirectionalLight( 0xffffff );
	const directionalLightHelper = new THREE.PointLightHelper(directionalLight);
	directionalLight.position.y = 11;
	//scene.add(directionalLight, directionalLightHelper);

	const hemisphereLight = new THREE.HemisphereLightProbe( 0xffffff, 0xffffff, 1 );
	const hemisphereLightHelper = new THREE.PointLightHelper(hemisphereLight);
	hemisphereLight.position.y = 11;
	//scene.add(hemisphereLight, hemisphereLightHelper);

}
addLigths();

const gridHelper = new THREE.GridHelper(200,200);

var angles = [0,0,0,0]; 
function DrawOrbit(radius, smoothness, angle, dt, object, id){
	const targetPosition = object.position.clone();
	//object.position.x = object.position.x + radius * Math.cos(angle *Math.PI / 180);
	//object.position.z = object.position.z + radius * Math.sin(angle *Math.PI / 180);
	
	targetPosition.x = object.position.x + radius * Math.cos(angles[id] *Math.PI / 180)*smoothness;
	targetPosition.z = object.position.z + radius * Math.sin(angles[id] *Math.PI / 180)*smoothness;
	//object.position.lerp(targetPosition, smoothness);
	//object.arc(10,10,9,0,Math.PI*2,false);
	object.position.x = targetPosition.x;
	object.position.z = targetPosition.z;

	angles[id] += dt;
	if(angles[id] > 360) angles[id] = 0;
	//const smoothness= 0.0001 // 0 to 1 only
	//return angle;
	
	//targetPosition.z -= 0.5;
	
}

//stars placement
function addStar(){
	const geometry = new THREE.SphereGeometry(0.25, 24, 24);
	const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
	const star = new THREE.Mesh( geometry, material);
	
	const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 400 ) );
	star.position.set(x, y, z);
	scene.add(star);
	
	
}
const stars = Array(300).fill().forEach(addStar);

//add  asteroids
var xAstreoid = 0;
var zAstreoid = 0;
var radAstreoid = 0;
function addAsteroids(){
	const radius = MathUtils.randFloat(0.1,0.5);
	const altura = MathUtils.randFloat(-0.9,0.9);
	const texture = new THREE.TextureLoader().load('img/asteroid.jpg');
	const NormalTexture = new THREE.TextureLoader().load('img/asteroidMap.jpg');
	const asteroid = new THREE.Mesh(
		new THREE.SphereGeometry(radius,32,32),
		new THREE.MeshStandardMaterial({
			map: texture,
			normalMap: NormalTexture
		})
	); 
	scene.add(asteroid);
}


const spaceTexture = new THREE.TextureLoader().load('img/space.jpg');
scene.background = spaceTexture;



//sun 
const sunTexture = new THREE.TextureLoader().load('img/sun.jpg');
const sunNormalTexture = new THREE.TextureLoader().load('img/sunMap.jpg');
const sun = new THREE.Mesh(
	new THREE.SphereGeometry(35,32,32),
	new THREE.MeshStandardMaterial({
		map: sunTexture,
		normalMap: sunNormalTexture
	})
); 
scene.add(sun);

//Mercury
const mercuryTexture = new THREE.TextureLoader().load('img/mercury.jpg');
const mercuryNormalTexture = new THREE.TextureLoader().load('img/mercuryMap.jpg');
const mercury = new THREE.Mesh(
	new THREE.SphereGeometry(3.5,32,32),
	new THREE.MeshStandardMaterial({
		map: mercuryTexture,
		normalMap: mercuryNormalTexture
	})
); 
scene.add(mercury);
mercury.position.z = 55;


//Venus
const venusTexture = new THREE.TextureLoader().load('img/venus.jpg');
const venusNormalTexture = new THREE.TextureLoader().load('img/venusMap.jpg');
const venus = new THREE.Mesh(
	new THREE.SphereGeometry(7,32,32),
	new THREE.MeshStandardMaterial({
		map: venusTexture,
		normalMap: venusNormalTexture
	})
); 
scene.add(venus);
venus.position.z = -80;

//Earth
const earthTexture = new THREE.TextureLoader().load('img/earth.jpg');
const earthNormalTexture = new THREE.TextureLoader().load('img/earthMap.jpg');
const earth = new THREE.Mesh(
	new THREE.SphereGeometry(8,32,32),
	new THREE.MeshStandardMaterial({
		map: earthTexture,
		normalMap: earthNormalTexture
	})
); 
scene.add(earth);
earth.position.z = -115;
earth.rotation.x = -0.2;

//moon
const moonTexture = new THREE.TextureLoader().load('img/moon.jpg');
const moonNormalTexture = new THREE.TextureLoader().load('img/moonMap.jpg');
const moon = new THREE.Mesh(
	new THREE.SphereGeometry(2.5, 32, 32),
	new THREE.MeshStandardMaterial( {
		map:moonTexture,
		normalMap: moonNormalTexture
	} )
);
scene.add(moon);
moon.position.z = -133;


//Mars
const marsTexture = new THREE.TextureLoader().load('img/mars.jpg');
const marsNormalTexture = new THREE.TextureLoader().load('img/marsMap.jpg');
const mars = new THREE.Mesh(
	new THREE.SphereGeometry(7,32,32),
	new THREE.MeshStandardMaterial({
		map: marsTexture,
		normalMap: marsNormalTexture
	})
); 
scene.add(mars);
mars.position.z = 154;
mars.rotation.x = -0.2;

//Jupiter
const jupiterTexture = new THREE.TextureLoader().load('img/jupiter.jpg');
const jupiterNormalTexture = new THREE.TextureLoader().load('img/jupiterMap.jpg');
const jupiter = new THREE.Mesh(
	new THREE.SphereGeometry(15,32,32),
	new THREE.MeshStandardMaterial({
		map: jupiterTexture,
		normalMap: jupiterNormalTexture
	})
); 
scene.add(jupiter);
jupiter.position.x = -222;
jupiter.rotation.x = 0;

//Saturn
const saturnTexture = new THREE.TextureLoader().load('img/saturn.jpg');
const saturnNormalTexture = new THREE.TextureLoader().load('img/saturnMap.jpg');
const saturn = new THREE.Mesh(
	new THREE.SphereGeometry(12,32,32),
	new THREE.MeshStandardMaterial({
		map: saturnTexture,
		normalMap: saturnNormalTexture
	})
); 
scene.add(saturn);
saturn.position.z = -284;
saturn.rotation.x = -0.2;

const ringTexture = new THREE.TextureLoader().load('img/saturn_ring.png');
const ringNormalTexture = new THREE.TextureLoader().load('img/saturnRingMap.jpg');
const ring = new THREE.Mesh(
	new THREE.TorusGeometry(19, 4, 2, 100), 
	new THREE.MeshStandardMaterial({ 
		map: ringTexture,
		normalMap: ringNormalTexture 
	})
);
scene.add(ring);
ring.rotation.x = 1.2;
ring.position.set(0,0,-284);


//Uranus
const uranusTexture = new THREE.TextureLoader().load('img/uranus.jpg');
const uranusNormalTexture = new THREE.TextureLoader().load('img/uranusMap.jpg');
const uranus = new THREE.Mesh(
	new THREE.SphereGeometry(10,32,32),
	new THREE.MeshStandardMaterial({
		map: uranusTexture,
		normalMap: uranusNormalTexture
	})
); 
scene.add(uranus);
uranus.position.x = 340;
saturn.rotation.x = -0.2;



var lastScrollTop = 0;
var last_scroll =  0;
function moveCamera(){

	const t = document.body.getBoundingClientRect().top;
	
	camera.position.z =  t * 0.01;
	orientation.position.x -= 1; 
	orientation.position.y -= 10;
	camera.lookAt(worldPosition);

	salme.rotation.x += 0.01;
	salme.rotation.y += 0.1;
	
	
	
}

document.body.onscroll = moveCamera;

const sunContainer = new THREE.Object3D;
sunContainer.add(sun);
const mercuryContainer = new THREE.Object3D;
mercuryContainer.add(mercury);
const venusContainer = new THREE.Object3D;
venusContainer.add(venus);
const earthContainer = new THREE.Object3D;
earthContainer.add(earth);
const moonContainer = new THREE.Object3D;
moonContainer.add(moon);
const marsContainer = new THREE.Object3D;
marsContainer.add(mars);
const jupiterContainer = new THREE.Object3D;
jupiterContainer.add(jupiter);
const saturnContainer = new THREE.Object3D;
saturnContainer.add(saturn);
const ringContainer = new THREE.Object3D;
ringContainer.add(ring);
const uranusContainer= new THREE.Object3D;
uranusContainer.add(uranus);


scene.add(sunContainer); // sunContainer is child of scene
sunContainer.add(earthContainer); 
sunContainer.add(mercuryContainer);
sunContainer.add(venusContainer);
sunContainer.add(jupiterContainer);
sunContainer.add(saturnContainer);
saturnContainer.add(ringContainer)// earthContainer is child of sunContainer
earthContainer.add(moonContainer); // moonContainer is child of earthContainer
sunContainer.add(marsContainer);
sunContainer.add(uranusContainer);


var earth_speed = 0.025;
var mercury_speed = earth_speed * 4.14772727;
var venus_speed = earth_speed * 1.6222222;
var mars_speed = earth_speed * 0.531295488;
var jupiter_speed = earth_speed * 0.0933333;
var saturn_speed = earth_speed * 0.0544827586;
var uranus_speed = earth_speed * 0.03581454;
//sun.rotation.x=6;

function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
	const pixelRatio = window.devicePixelRatio;
    const width = canvas.clientWidth * pixelRatio | 0;
    const height = canvas.clientHeight * pixelRatio | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    
	if (needResize) {
	  
	  //canvas.width = width;
	  //canvas.height = height;
      renderer.setSize(width, height, false);
	  
    }
	
    return needResize;
}

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {
	
	requestAnimationFrame(animate);
	//time *= 0.0001;
	
	if(resizeRendererToDisplaySize(renderer)){
		const canvas = renderer.domElement;
		camera.aspect = canvas.clientWidth / canvas.clientHeight;
		camera.updateProjectionMatrix();
		
	}
	
	torus.rotation.x += 0.01;
	torus.rotation.y += 0.005;
	torus.rotation.z += 0.01;

	sun.rotation.y += 0.004 ;
	mercury.rotation.y += 0.02 ;
	venus.rotation.y += 0.015 ;
	earth.rotation.y += 0.01 ;
	mars.rotation.y += 0.015;
	jupiter.rotation.y += 0.007;
	saturn.rotation.y += 0.009;
	ring.rotation.z+= 0.01;

	mercuryContainer.rotation.y += 0.17*mercury_speed;
	earthContainer.rotation.y += 0.17*earth_speed;
	
	venusContainer.rotation.y += 0.17*venus_speed;
	marsContainer.rotation.y += 0.17*mars_speed;
	jupiterContainer.rotation.y += 0.3*jupiter_speed;
	saturnContainer.rotation.y += 0.3*saturn_speed;
	uranusContainer.rotation.y += 0.3*uranus_speed;
	DrawOrbit( 0.75, 0.2, 0, 0.5,moon,2);
	
	renderer.render(scene, camera);
}

animate();

