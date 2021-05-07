import './style.css'
import * as THREE from 'three'
import { Mesh } from 'three'

//Creating a scene
const scene = new THREE.Scene()

//Mesh -> Geometry (shape) + material (How it looks)

//Red Cube -> 1unit
const geometry = new THREE.BoxGeometry(1,1,1)

//Material 
const material = new THREE.MeshBasicMaterial({
    color: 'red'
})

//Creating Mesh
const cube = new THREE.Mesh(geometry,material);

//Making the mesh a 3D object
/*cube.position.x = 0.7
cube.position.y = -0.6
cube.position.z = 1*/
//Use top property together as one
cube.position.set(0.7,-0.6,1)

//Scale -> 
/*cube.scale.x = 2
cube.scale.y = 0.5
cube.scale.z = 0.5*/

//Or -> Vector3

cube.scale.set(2,0.5,0.5)

//Rotation -> Euler -> good value -> pi -> half rotation or use Math.PI
cube.rotation.x = 3.14159
//cube.rotation.y = Math.PI
cube.rotation.y = Math.PI * 0.25
cube.rotation.z = Math.PI * 0.25


//So that position remains  1 
//cube.position.normalize()

//Add Mesh to Scene
scene.add(cube)

console.log(cube.position.length())


//Axes Helper 

const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)



//Camera -> Point of view -> Not visible 
//Two Parameter
/**
 *  1 - Field of View (Vertical) -> Degree
 *  2 - Aspect Ration -> Width (Size of View Port ) width/height -> Width and height  
 */

//Sizes -> Aspect Ration
const sizes = {
    width: 800,
    height: 600
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height )

//Change poition of Camera - Step Last
camera.position.z = 3
/*camera.position.x = 1
camera.position.y = 1*/



//Always add everything to the scene
scene.add(camera)

console.log(cube.position.distanceTo(camera.position))

//Connect to HTML canvas
const canvashtml = document.querySelector('.renderPro')

//Render -> First create canvas in HTML
const renderer = new THREE.WebGLRenderer({
    //Connect HTML canvas
    canvas: canvashtml
})

//Resize render

renderer.setSize(sizes.width,sizes.height)

//Scene and Camera 
renderer.render(scene, camera)