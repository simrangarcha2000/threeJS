import './style.css'
import * as THREE from 'three'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera
//const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1,100)
const aspectRation = sizes.width / sizes.height;
const camera = new THREE.OrthographicCamera(-1 * aspectRation,1* aspectRation,1,-1, 0.1, 100 )
camera.position.x = 2
camera.position.y = 2
camera.position.z = 2
console.log(camera.position.length());
camera.lookAt(mesh.position)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    mesh.rotation.y = elapsedTime;

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

//Cameras 
/**
 * Prespective Camera(
 * 1 - Vertical Field of View (in deg), 
 *      more field of View more distance from object -> 140 -> distant
 *      Recommended - 45 to 75 -> depends on you too
 * 2- Aspect Ratio (width/height)
 * 3- Near 
 * 4- Far -> calculate the disctance and put the value more than it to visible all parts of the object 
 * console.log(camera.position.length());
 * if extreme value -> Z-fighting
 * 
 * )
 */

// -------------------------------- ORTHOGRAPHIC CAMERA

/**
 * OrthographicCamera (
 * Left *  aspectRatio
 * Right *  aspectRatio
 * Top 
 * Bottom 
 * Near 
 * Far 
 * )
 * 
 * But then the size of cube changes according to the canvas so we use aspect Ration and multiply it either with horizontal or vertical parameters
 * 
 * aspectRatio = width/height
 */