import './style.css'

import * as THREE from 'three' 
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75 , window.innerWidth/window.innerHeight , 0.1 ,1000)


const renderer = new THREE.WebGLRenderer({
  canvas : document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize (window.innerWidth , window.innerHeight);
camera.position.setZ(30)



const geometry =  new THREE.TorusGeometry(10 ,3 ,16 ,100)

const material = new THREE.MeshStandardMaterial({ color : 0xFF6347 });

const torus = new THREE.Mesh (geometry , material);
scene.add(torus)
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)
const AmbienLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight , AmbienLight)


const controle = new OrbitControls(camera , renderer.domElement)

function addStar()
{
  const geometry = new THREE.SphereGeometry(0.25)
  const material = new THREE.MeshStandardMaterial({color : 0xffffff})
  const star = new THREE.Mesh(geometry,material)

  const [x , y ,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z)
  scene.add(star)
}
Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('images/space.jpg')
scene.background = spaceTexture ;

const Phototexture = new THREE.TextureLoader().load('images/hamza.jpg')
const photo = new THREE.Mesh(
  new THREE.BoxGeometry(6,6,6) ,
  new THREE.MeshBasicMaterial ({map : Phototexture})
 



)
const moonTexture = new THREE.TextureLoader().load('images/moon.jpg')
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3 ,31 ,31) ,
  new THREE.MeshBasicMaterial ({map : moonTexture})
) 

moon.position.z=  30 ;
moon.position.setX(-10) ;
scene.add(moon)
scene.add(photo)
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  photo.rotation.y += 0.01;
  photo.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
  
}

document.body.onscroll = moveCamera


function animate()
{
  requestAnimationFrame(animate)
  renderer.render (scene , camera)
  torus.rotation.x += 0.01
  torus.rotation.y += 0.005
  torus.rotation.z += 0.01
  moon.rotation.x += 0.005;
  controle.update()


}


animate()

