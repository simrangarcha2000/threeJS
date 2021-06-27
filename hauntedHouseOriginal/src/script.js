import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')



// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const doorColor = textureLoader.load('./textures/door/color.jpg')
const alphaColor = textureLoader.load('./textures/door/alpha.jpg')
const ambientColor = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const heightColor = textureLoader.load('./textures/door/height.jpg')
const normalColor = textureLoader.load('./textures/door/normal.jpg')
const metalColor = textureLoader.load('./textures/door/metalness.jpg')
const roughColor = textureLoader.load('./textures/door/roughness.jpg')

//Bricks Color
const bricks = textureLoader.load('./textures/bricks/color.jpg')
const bricksambientColor = textureLoader.load('./textures/bricks/ambientOcclusion.jpg')
const bricksnormalColor = textureLoader.load('./textures/bricks/normal.jpg')
const bricksroughColor = textureLoader.load('./textures/bricks/roughness.jpg')





/**
 * House
 */
//Groups
const house = new THREE.Group()
scene.add(house)

//Walls

const sideWall = new THREE.Mesh(
    new THREE.BoxGeometry(1,3.5,2),
    new THREE.MeshBasicMaterial({
        color: 'green'
    })
)

sideWall.position.set(-10, 1.75, 10)


let wall1 = gui.addFolder('Side Wall');
wall1.add(sideWall.position,'x').min(-10).max(10).step(0.001).name('Left-Right')
wall1.add(sideWall.position,'y').min(-10).max(10).step(0.001).name('Top-Bottom')
wall1.add(sideWall.position,'z').min(-10).max(10).step(0.001).name('Left-Right')

/**
 * y is the half of the original
 */

house.add(sideWall)




// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 40),
    new THREE.MeshStandardMaterial({ 
        color: "red"
    })
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0

floor.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
)
scene.add(floor)



//!                          LIGHTS

// Ambient light
//Decreasing the brightness to 0.12
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001).name('ambientLight')
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)




/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


//!                          CAMERAS 
/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

//TODO:      GUI - Prespective Camera

const camera1 = gui.addFolder('PrespectiveCamera')
camera1.add(camera.position, 'x').min(-10).max(10).step(0.01).name('x')
camera1.add(camera.position, 'y').min(-10).max(10).step(0.01).name('y')
camera1.add(camera.position, 'z').min(-10).max(10).step(0.01).name('z')


// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#262837')
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFShadowMap



/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()



    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()