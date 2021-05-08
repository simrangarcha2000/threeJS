import './style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

//Get the time before animation
//Time
let time = Date.now()

//Animation
const tick = () => {


    //Time

    //Time after animation
    const currentTime = Date.now()

    //Take difference and update the time before animation again
    const deltaTime = currentTime - time;
    time = currentTime

    //Update objects
    /*mesh.position.x += 0.01
    mesh.position.y += 0.01*/
    //So that animation is not too fast nor slow
    mesh.rotation.y += 0.001 * deltaTime

    //Render
    renderer.render(scene, camera)

    //sending to next frame
    window.requestAnimationFrame(tick)


}

tick()
