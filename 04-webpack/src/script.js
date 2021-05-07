import './style.css'
import * as THREE from 'three'

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
cube.position.x = 0.7
cube.position.y = -0.6
cube.position.z = 1



//Add Mesh to Scene
scene.add(cube)

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

//Always add everything to the scene
scene.add(camera)


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