import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
//Another way
import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json'
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

//Axes Helper
/*const axes = new THREE.AxesHelper()
scene.add(axes)*/

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcap1 = textureLoader.load('./textures/matcaps/1.png')
const matcap2= textureLoader.load('./textures/matcaps/2.png')
const matcap3 = textureLoader.load('./textures/matcaps/3.png')

/**
 * FONT LOADER
 */

const fontLoader = new THREE.FontLoader()
//we cannot use a constant like a textureeLoader
fontLoader.load(
    '/fonts/optimer_regular.typeface.json',
    (font)=>{
        console.log("Font Loaded")
        //Adding the geometry
        const textGeometry = new THREE.TextBufferGeometry(
            'Simran Garcha',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 5, //Lessens the triangle
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4 //Lessens the triangle
            }
        )

        //Creating a box geometry from a sphere geometry
        /*textGeometry.computeBoundingBox()
        console.log(textGeometry.boundingBox)
        textGeometry.translate(
            - (textGeometry.boundingBox.max.x * - 0.02) * -(0.20),
            - (textGeometry.boundingBox.max.y * - 0.02) * 0.5,
            - (textGeometry.boundingBox.max.z * -0.02) * 0.5
        )
        
        textGeometry.computeBoundingBox()
        console.log(textGeometry.boundingBox)*/
        //adding Material
        textGeometry.center()
        const textMaterial = new THREE.MeshMatcapMaterial({
            //wireframe: true,
            matcap : matcap1
        })
        const text = new THREE.Mesh (textGeometry, textMaterial)
        scene.add(text)

        for(let i = 0; i< 100; i++)
        {
            const donutGeometry = new THREE.TorusBufferGeometry(0.3,0.2,20,45)
            const donutMaterial = new THREE.MeshMatcapMaterial({
                //wireframe: true,
                matcap : matcap1
            })
            const donut = new THREE.Mesh(donutGeometry,donutMaterial)
            scene.add(donut)
        }
    }
)


/**
 * Object
 */
/*const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial()
)

scene.add(cube)*/

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

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()