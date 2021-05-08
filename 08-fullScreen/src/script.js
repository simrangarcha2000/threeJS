import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Cursor
 */

const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (funcName) => {

    //Checks the X -axis of the moving Cursor
    //We dived by width to make the X axis go btw 0 to 1 
    //we minused it with 0.5 to give it btw -0.5 to +0.5
    console.log(funcName.clientX)

    //Checks the Y -axis of the moving Cursor -> in px (not recommended)
    console.log(funcName.clientY)

    cursor.x = funcName.clientX / sizes.width - 0.5

    //But the mouse is moving invertedly so change to - (negative)
    cursor.y = -(funcName.clientY / sizes.height - 0.5)

        //we minused it with 0.5 to give it btw -0.5 to +0.5
    console.log(cursor.x)

    //Checks the Y -axis of the moving Cursor -> in px (not recommended)
    console.log(cursor.y)


})

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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1,100)
/*const aspectRation = sizes.width / sizes.height;
const camera = new THREE.OrthographicCamera(-1 * aspectRation,1* aspectRation,1,-1, 0.1, 100 )*/
/*camera.position.x = 2
camera.position.y = 2*/
camera.position.z = 3
console.log(camera.position.length());
camera.lookAt(mesh.position)
scene.add(camera)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


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
    //mesh.rotation.y = elapsedTime;

    //Update Camera

    //Adding the value for moving mouse here and multiplying so we move even more further
    /*  camera.position.x = cursor.x * 10
        camera.position.y =  cursor.y * 3 */
    //camera.lookAt(new THREE.Vector3())
    //or


    //The position value just move on an axis but we need to move in a arotation so we use a new function
    /*  camera.position.x = Math.sin(cursor.x * 2 * Math.PI) * 3
        camera.position.z =  Math.cos(cursor.x * 2 * Math.PI) * 3
        camera.position.y =  cursor.y * 5 */
    //camera.lookAt(mesh.position)
    
    //update Controls
    controls.update()


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

// -------------------------------- ORTHOGRAPHIC CAMERA-----------------

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

// -------------------------------- MOVE THE  CAMERA -----------

/**
 * Normal JS
 * Use MouseMove and provide a func
 * btw +0.5 to -0.5 
 * Go inside Animation func
 */


//Controls - Orbit Control