console.log("He;;o Three")

console.log(THREE)



/**
 * INSTRUCTIONS :
 * THREE is the library 
 * Scene is where everything will be added 
 * Create a Scene
 * Cretae a mesh -> it is a object which contains geometry and material 
 * Cretae Geometry and material and put in a mesh 
 * Add it to the scene
 * 
 * Create a Camera it contains two parts (Read Ahead)
 * Create Aspect Ratio and put in Camera
 * Add camera to Scene
 * 
 * Create a renderer
 * Add canvas in HTML
 * Associate it to script with query Selector 
 * Add to Render
 * 
 * Resize rendere
 * REnder the Scene and Camera - Everything is blank cz Camera is inside the mesh
 * Move the Camera
 */

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