import './style.css'
import * as THREE from 'three'
import * as dat from 'dat.gui'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'


const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove',(funcName) => {
    cursor.x = -(funcName.clientX / sizes.width - 0.5)
    cursor.y = (funcName.clientY / sizes.width - 0.5)
})


const gui = new dat.GUI({ closed: true, width: 400})

const scene = new THREE.Scene()

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.LineBasicMaterial({
        color: "blue"
    })
)

cube.position.set(1, 0.5,0.8)
cube.scale.set(1, 0.5,0.8)
cube.rotation.reorder('YXZ')
cube.rotation.x = Math.PI
cube.rotation.x = Math.PI * 0.25
cube.position.normalize()

scene.add(cube);

//Axes Helper 

const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)


const sizes = {
    width: 800,
    height: 600
}



const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)

camera.position.z = 3

scene.add(camera)

const canvas = document.querySelector('.webgl');

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(
    sizes.width, sizes.height
)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


//ANIMATION

const clock = new THREE.Clock()

const tick = () => {

    /*camera.position.x = cursor.x * 4
    camera.position.y =  cursor.y * 3
    camera.lookAt(new THREE.Vector3())

    camera.position.x = Math.sin(cursor.x * 2 * Math.PI) * 3
        camera.position.z =  Math.cos(cursor.x * 2 * Math.PI) * 3
        camera.position.y =  cursor.y * 5 */

    //Clock 
    /*const elapsedTime = clock.getElapsedTime()
    cube.rotation.y = elapsedTime * Math.PI * 1.4
    cube.position.z = Math.cos(elapsedTime)
    camera.position.x = Math.cos(elapsedTime)

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)*/

        //update Controls
        controls.update()

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)

}

tick()




