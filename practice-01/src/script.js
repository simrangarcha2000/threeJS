import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'

const  scene = new THREE.Scene();
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial()
)

scene.add(mesh);

const sizes = {
    width: 700,
    height: 800
}

const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width/sizes.height,
    1,
    1000
)

scene.add(camera)

const render = new THREE.WebGL1Renderer()

