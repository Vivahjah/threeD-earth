import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import "./index.css";
import gsap from "gsap"

// Scene
const scene = new THREE.Scene(); // anytime an object is been created, is added to a scene

//Create a geometry (sphere) - shape
const geometry = new THREE.SphereGeometry(3, 64, 64);

//Create a Material
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
});

//mesh is the combination of the geometry and the material
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//light
const light = new THREE.PointLight(0xffffff, 70, 100, 1.7);
light.position.set(0, 10, 10);
scene.add(light);

//Size
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//Camera
const camera = new THREE.PerspectiveCamera(
  45,
  size.width / size.height,
  0.1,
  100
);
camera.position.z = 20;




//add to the scene

//Renderer add the object to the web browser screen
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(5) // smoothen the edge of the object
renderer.render(scene, camera);

//resize
window.addEventListener("resize", () => {
  //update size
  size.height = window.innerHeight;
  size.width = window.innerWidth;
  //update camera
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();
  renderer.setSize(size.width, size.height);
});

//Controls
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true //damping helps it rotat a little after mouseleave
controls.enablePan = false // cannot carry the object around. fix i a poition
controls.enableZoom = false // cannot zoom the object
controls.autoRotate= true
controls.autoRotateSpeed = 5

const loop = () => {
controls.update()
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};

//function help to render the camera , scene 
//and update
loop();


//animate in sequence
const tl = gsap.timeline({defaults : {duration: 1}}) //how long it will take per frame
tl.fromTo(mesh.scale, {z : 0, x : 0, y: 0}, {z : 1, x : 1, y :1})
tl.fromTo("nav", {y: "-100%"} , {y: "0%"})
tl.fromTo("h1", {opacity: 0}, {opacity : 1})


//Object animation Color
let mouseDown = false
let rgb = []
window.addEventListener("mousedown", ()=> (mouseDown = false))
window.addEventListener("mouseup", ()=> (mouseDown = true))
window.addEventListener("mousemove", (e) => {
  if(mouseDown){
    rgb = [
      Math.round((e.pageX / size.width) *255),
      Math.round((e.pageY / size.height) *255),
      150,
    ]
//let's animate
let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
    gsap.to(mesh.material.color, {
      r:newColor.r,
      g:newColor.g,
      b:newColor.b,
    })
  }
})
