import './style.css'
import * as THREE from 'three'
import './style.css'
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const gui = new dat.GUI({
    closed: true,
    width: 400
})

/**
 * TEXTURES
 */

const textureLoader = new THREE.TextureLoader()

const door = textureLoader.load('./textures/door/color.jpg')
const color = textureLoader.load('./textures/door/alpha.jpg')
const metal = textureLoader.load('./textures/door/metalness.jpg')
const rough = textureLoader.load('./textures/door/roughness.jpg')
const ambient = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const height = textureLoader.load('./textures/door/height.jpg')
const normal = textureLoader.load('./textures/door/normal.jpg')
const mat1 = textureLoader.load('./textures/matcaps/1.png')
const mat2 = textureLoader.load('./textures/matcaps/2.png')
const mat7 = textureLoader.load('./textures/matcaps/7.png')
const mat8 = textureLoader.load('./textures/matcaps/8.png')
const grad8 = textureLoader.load('./textures/gradients/8.png')





/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


/**
 * Objects
 */

//! MESH BASIC MATERIAL
/*const material = new THREE.MeshBasicMaterial({
    //color: 'peach',
    map: color,
    opacity: 0.5,
    transparent: true
})

material.side = THREE.DoubleSide
material.color = new THREE.Color('#f0f')*/

//! MESH NORMAL MATERIAL
/*const material = new THREE.MeshNormalMaterial()
//material.wireframe = true
material.flatShading = true*/

//! MESH MATCAP MATERIAL
/*const material = new THREE.MeshMatcapMaterial({
    matcap: mat8
})*/

//! MESH DEPTH MATERIAL
//const material = new THREE.MeshDepthMaterial()

//! MESH LAMBERT MATERIAL
//const material = new THREE.MeshLambertMaterial()

//const material = new THREE.MeshToonMaterial()
/**
 * material.gradientMap
 */


const material = new THREE.MeshStandardMaterial()
/*material.roughness = 0.45
material.metalness = 0.45*/
material.map = door
material.aoMap = ambient //To add Contrast , depth and shadows -> use another set of uv co-ordinates
material.displacementMap = height // To create displacement add more subdivisions
material.side = THREE.DoubleSide
material.displacementScale = 0.05
material.metalnessMap = metal
material.roughnessMap = rough
material.normalMap = normal
material.normalScale.set(0.5,0.5)
material.transparent = true
material.alphaMap = color


gui.add(material, 'metalness', 0, 1, 0.01).name('Metal')
gui.add(material, 'roughness', 0, 1, 0.01).name('Rough')
gui.add(material, 'wireframe').name('WireFrame')
gui.add(material, 'aoMapIntensity', 0, 1, 0.01).name('Intensity of Depth')
gui.add(material, 'displacementScale', 0, 1, 0.01).name('Scale Displacement')



const sphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5,64, 64), material
)

const plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1, 1, 100, 100), material
)

/**
 * SETTING FOR AMBIENT LIGHT
 */
console.log(plane.geometry.attributes.uv)
//name, new Array
plane.position.x = 1.5

sphere.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2) //Two Co-ordinates    
    )

    plane.geometry.setAttribute(
        'uv2',
        new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)  
        )
    

const torus = new THREE.Mesh(
    new THREE.TorusBufferGeometry(0.3,0.2,64,128), material
)

torus.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
    )

torus.position.x = -1.5


scene.add(sphere, plane, torus)

/*
* LIGHTS
*/

const ambientLight = new THREE.AmbientLight(0xfffffff, 0.5)
const pointLight = new THREE.PointLight(0xfffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4


scene.add (ambientLight, pointLight)

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

    //UPdate Object
    sphere.rotation.y = elapsedTime * 0.1
    torus.rotation.y = elapsedTime * 0.1
    plane.rotation.y = elapsedTime * 0.5

    sphere.rotation.x = elapsedTime * 0.1
    torus.rotation.x = elapsedTime * 0.1
    plane.rotation.x = elapsedTime * 0.5



    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()