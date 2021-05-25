import './style.css'
import * as THREE from 'three'
/*
//Creating a scene
const scene = new THREE.Scene()



//Cube01
const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.LineBasicMaterial({color: "blue"})
)

scene.add(cube1)

//Sizes -> Aspect Ration
const sizes = {
    width: 800,
    height: 600
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height )

camera.position.z = 3

//Always add everything to the scene
scene.add(camera)

//console.log(cube.position.distanceTo(camera.position))

//Connect to HTML canvas
const canvashtml = document.querySelector('.webgl')

//Render -> First create canvas in HTML
const renderer = new THREE.WebGLRenderer({
    canvas: canvashtml
})


renderer.setSize(sizes.width,sizes.height)

//Scene and Camera 
renderer.render(scene, camera)*/

const scene = new THREE.Scene()

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.LineBasicMaterial({
        color: "blue"
    })
)

scene.add(cube);

const sizes = {
    width: 800,
    height: 600
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)

camera.position.z = 3

scene.add(camera)

const canvas = document.querySelector('.webgl');

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(
    sizes.width, sizes.height
)

renderer.render(scene, camera)