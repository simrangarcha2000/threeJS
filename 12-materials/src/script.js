import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Textures
 */

const textureLoader = new THREE.TextureLoader()

const doorColor = textureLoader.load('/textures/door/color.jpg')
const alpha = textureLoader.load('/textures/door/alpha.jpg')
const ambient = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const height = textureLoader.load('/textures/door/height.jpg')
const normal = textureLoader.load('/textures/door/normal.jpg')
const metal = textureLoader.load('/textures/door/metalness.jpg')
const rough = textureLoader.load('/textures/door/roughness.jpg')
const matCapTexture = textureLoader.load('/textures/matcaps/1.png')
const gradientTexture = textureLoader.load('/textures/gradients/1.png')



/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object 
 */

const material = new THREE.MeshBasicMaterial({
    //color: 'pink',
    map : doorColor
});


//material.wireframe = true
material.color.set('red')

material.opacity = 0.5
material.transparent = true
material.alphaMap = alpha

//To see the plane from both sides
/**
 * Backside
 * Frontside
 * DoubleSide
 */
material.side = THREE.DoubleSide

/**
 *  //! Another Way 
 * material.map = doorColor
 * 
 * For Color 
 * material.color = new THREE.Color('green')
 */

const sphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5,16,16),
    material
)

sphere.position.x = -1.5


const plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1,1),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusBufferGeometry(0.5, 0.2, 16,32),
    material
)

torus.position.x = 1.5

scene.add(plane,sphere, torus)



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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

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

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    //update objects
    sphere.rotation.y = elapsedTime * 0.1
    plane.rotation.y = elapsedTime * 0.1
    torus.rotation.y = elapsedTime * 0.1

    sphere.rotation.x = elapsedTime * 0.15
    plane.rotation.x = elapsedTime * 0.15
    torus.rotation.x = elapsedTime * 0.15

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()