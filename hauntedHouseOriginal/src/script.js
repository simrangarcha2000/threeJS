import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import * as gsap from 'gsap'

console.log(gsap)

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')



// Scene
const scene = new THREE.Scene()

//!                  TEXTURE

const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')


const glassColorTexture = textureLoader.load('/textures/glass/basecolor.jpg')
const glassAmbientOcclusionTexture = textureLoader.load('/textures/glass/ambientOcclusion.jpg')
const glassHeightTexture = textureLoader.load('/textures/glass/height.png')
const glassNormalTexture = textureLoader.load('/textures/glass/normal.jpg')
const glassRoughnessTexture = textureLoader.load('/textures/glass/roughness.jpg')

const cylinderWallsColorTexture = textureLoader.load('/textures/cylinderWalls/basecolor.jpg')
const cylinderWallsAmbientOcclusionTexture = textureLoader.load('/textures/cylinderWalls/ambientOcclusion.jpg')
const cylinderWallsHeightTexture = textureLoader.load('/textures/cylinderWalls/height.png')
const cylinderWallsNormalTexture = textureLoader.load('/textures/cylinderWalls/normal.jpg')
const cylinderWallsRoughnessTexture = textureLoader.load('/textures/cylinderWalls/roughness.jpg')

const wallsColorTexture = textureLoader.load('/textures/brickWall/basecolor.jpg')
const wallsAmbientOcclusionTexture = textureLoader.load('/textures/brickWall/ambientOcclusion.jpg')
const wallsHeightTexture = textureLoader.load('/textures/brickWall/height.png')
const wallsNormalTexture = textureLoader.load('/textures/brickWall/normal.jpg')
const wallsRoughnessTexture = textureLoader.load('/textures/brickWall/roughness.jpg')


const roofColorTexture = textureLoader.load('/textures/roof/basecolor.jpg')
const roofAmbientOcclusionTexture = textureLoader.load('/textures/roof/ambientOcclusion.jpg')
const roofHeightTexture = textureLoader.load('/textures/roof/height.png')
const roofNormalTexture = textureLoader.load('/textures/roof/normal.jpg')
const roofRoughnessTexture = textureLoader.load('/textures/roof/roughness.jpg')

const grassColorTexture = textureLoader.load('/textures/grass/basecolor.jpg')
const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const grassHeightTexture = textureLoader.load('/textures/grass/height.png')
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')

const cylinderWallMaterial = new THREE.MeshStandardMaterial({
    map: cylinderWallsColorTexture,
    aoMap: cylinderWallsAmbientOcclusionTexture,
    displacementMap: cylinderWallsHeightTexture,
    displacementScale: 0.1,
    normalMap: cylinderWallsNormalTexture,
    roughnessMap: cylinderWallsRoughnessTexture
})

const grassMaterial = new THREE.MeshStandardMaterial({
    map: grassColorTexture,
    aoMap: grassAmbientOcclusionTexture,
    displacementMap: grassHeightTexture,
    displacementScale: 0.1,
    normalMap: grassNormalTexture,
    roughnessMap: grassRoughnessTexture
})

cylinderWallsColorTexture.repeat.set(2, 1.5)
cylinderWallsAmbientOcclusionTexture.repeat.set(2, 1.5)
cylinderWallsNormalTexture.repeat.set(2, 1.5)
cylinderWallsRoughnessTexture.repeat.set(2, 1.5)

cylinderWallsColorTexture.wrapS = THREE.RepeatWrapping
cylinderWallsAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
cylinderWallsNormalTexture.wrapS = THREE.RepeatWrapping
cylinderWallsRoughnessTexture.wrapS = THREE.RepeatWrapping

cylinderWallsColorTexture.wrapT = THREE.RepeatWrapping
cylinderWallsAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
cylinderWallsNormalTexture.wrapT = THREE.RepeatWrapping
cylinderWallsRoughnessTexture.wrapT = THREE.RepeatWrapping

const wallMaterial = new THREE.MeshStandardMaterial({
    map: wallsColorTexture,
    aoMap: wallsAmbientOcclusionTexture,
    displacementMap: wallsHeightTexture,
    displacementScale: 0.001,
    normalMap: wallsNormalTexture,
    roughnessMap: wallsRoughnessTexture
})

const roofMaterial = new THREE.MeshStandardMaterial({
    map: roofColorTexture,
    aoMap: roofAmbientOcclusionTexture,
    displacementMap: roofHeightTexture,
    displacementScale: 0.001,
    normalMap: roofNormalTexture,
    roughnessMap: roofRoughnessTexture
})

roofColorTexture.repeat.set(1,6)
roofAmbientOcclusionTexture.repeat.set(1,6)
roofNormalTexture.repeat.set(1,6)
roofRoughnessTexture.repeat.set(1,6)

roofColorTexture.rotation = Math.PI /2.3


roofColorTexture.wrapS = THREE.RepeatWrapping
roofAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
roofNormalTexture.wrapS = THREE.RepeatWrapping
roofRoughnessTexture.wrapS = THREE.RepeatWrapping

roofColorTexture.wrapT = THREE.RepeatWrapping
roofAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
roofNormalTexture.wrapT = THREE.RepeatWrapping
roofRoughnessTexture.wrapT = THREE.RepeatWrapping

//!                 SWING 

const swing = new THREE.Group()
scene.add(swing)

const swingStandLeft = new THREE.Mesh(
    new THREE.BoxBufferGeometry(0.2,4.5,0.2),
    new THREE.MeshStandardMaterial({
        color: '#a16d3f'
    })
)
swing.add(swingStandLeft);
swing.position.set(3,2.25,-9)

const swingStandRight = swingStandLeft.clone()
swingStandRight.position.set(0,0,-3)

const swingStandTop = swingStandLeft.clone()
swingStandTop.rotation.x = Math.PI/2
swingStandTop.position.set(0,2.2,-1.5)
swingStandTop.scale.set(3,0.8,1);

swing.add(swingStandRight);
swing.add(swingStandTop);

const swingSeat = new THREE.Group();
swing.add(swingSeat)

const swingStringLeft = swingStandLeft.clone()
swingStringLeft.position.set(0,0.5,-0.8)
swingStringLeft.scale.set(0.2,0.7,0.2)

const swingStringRight = swingStandRight.clone()
swingStringRight.position.set(0,0.5,-2.2)
swingStringRight.scale.set(0.2,0.7,0.2)


const swingSeats = new THREE.Mesh(
    new THREE.BoxGeometry(1,0.2,1.8),
    new THREE.MeshStandardMaterial({
        color: "brown",
        metalness: 0.5,
        roughness: 1
    })

)

swingSeats.position.set(0,-1,-1.5)

swingSeat.add(swingStringLeft)
swingSeat.add(swingStringRight)
swingSeat.add(swingSeats)

//!                 WITCH



//!                  TREES

const trees = new THREE.Group()
scene.add(trees)

const branch = new THREE.Mesh(
    new THREE.BoxGeometry(0.2,0.2,4),
    new THREE.MeshStandardMaterial({
        color: 'brown'
    })
)

branch.rotation.x = Math.PI /2
branch.position.set(-3,2,-5)

trees.add(branch)

const verticesOfCube = [
    -1,-1,-1,    1,-1,-1,    1, 1,-1,    -1, 1,-1,
    -1,-1, 1,    1,-1, 1,    1, 1, 1,    -1, 1, 1,
];

const indicesOfFaces = [
    2,1,0,    0,3,2,
    0,4,7,    7,3,0,
    0,1,5,    5,4,0,
    1,2,6,    6,5,1,
    2,3,7,    7,6,2,
    4,5,6,    6,7,4
];

const leaves = new THREE.Mesh(
    new THREE.PolyhedronGeometry( verticesOfCube, indicesOfFaces, 6, 2 ),
    new THREE.MeshStandardMaterial({
        color: 'green'
    })
)

leaves.scale.set(0.2,0.4,0.2)
leaves.position.set(-3,4,-5)

trees.add(leaves)

//!                 OTHER TREES

//!                  PORTION BOWL

const portionMaterial =     new THREE.MeshStandardMaterial({
    color: 'dark grey',
    metalness: 0.75,
    roughness: 0.4
})

const portionBowl = new THREE.Mesh(
    new THREE.SphereGeometry(2,32,32, 2, 6.3, 2, 2.5),
    portionMaterial
)



const portion = gui.addFolder('portion');
portion.add(portionBowl.rotation, 'x').min(-12).max(12).step(0.001).name('Rotation X')
portion.add(portionBowl.rotation, 'y').min(-12).max(12).step(0.001).name('Rotation Y')
portion.add(portionBowl.rotation, 'z').min(-12).max(12).step(0.001).name('Rotation Z')
portion.add(portionBowl.position, 'x').min(-12).max(12).step(0.001).name('Position X')
portion.add(portionBowl.position, 'y').min(-12).max(12).step(0.001).name('Position Y')
portion.add(portionBowl.position, 'z').min(-12).max(12).step(0.001).name('Position Z')
portion.add(portionMaterial, 'metalness').min(-1).max(1).step(0.001).name('Metalness')
portion.add(portionMaterial, 'roughness').min(-1).max(1).step(0.001).name('Roughness')


portionBowl.position.y = 2.5

scene.add(portionBowl)

//!                 PORTION BOWL FLAME

//!                  HOUSE


//Groups
const house = new THREE.Group()
scene.add(house)


//*TODO:    WALLS

//---------------------           Side Wall         -------------------
const sideWall = new THREE.Mesh(
    new THREE.CylinderGeometry( 2, 2, 7, 32 ),
    cylinderWallMaterial
)
sideWall.position.set(-10, 3.5, 5)
sideWall.scale.set(-1.31,1,1)


/**
 * y is the half of the original
 */

house.add(sideWall)

//---------------------           Center Wall         -------------------
const centerWall = new THREE.Mesh(
    new THREE.BoxGeometry(3,5,7),
    wallMaterial
)
centerWall.position.set(-10, 2.5, 0)
centerWall.scale.set(-1.31,1,1)

/**
 * y is the half of the original
 */

house.add(centerWall)

//---------------------           RIGHT SIDE WALL         -------------------
const rightWall = new THREE.Mesh(
    new THREE.CylinderGeometry( 2, 2, 10, 32 ),
    cylinderWallMaterial
)
rightWall.position.set(-10, 5, -5)
rightWall.scale.set(-1.31,1,1)
house.add(rightWall)

//---------------------           BACK WALL         -------------------

const backWall = new THREE.Mesh(
    new THREE.BoxGeometry(4.5,15,13),
    wallMaterial
)
backWall.position.set(-14.7, 7.5, 0)

house.add(backWall)

//* SHAPE 

const x = 0, y = 0;

const heartShape = new THREE.Shape();



const heartGeometry = new THREE.Mesh( 
    new THREE.ShapeGeometry( heartShape ), 
    new THREE.MeshBasicMaterial( { color: "red" } ) ) ;
scene.add( heartGeometry );

//*TODO:                                ROOF

//---------------------           Left TOP ROOF         -------------------

const top = new THREE.Mesh(
    new THREE.ConeGeometry( 2.7, 5, 20 ),
    roofMaterial
)
top.position.set(-10,9.5,5)
house.add(top)

//---------------------            RIGHT ROOF         -------------------

const topRight = new THREE.Mesh(
    new THREE.ConeGeometry( 2.7, 5, 20 ),
    roofMaterial
)
topRight.position.set(-10,12.5,-5)
house.add(topRight)

//---------------------           CENTER ROOF         -------------------


const centerTop = new THREE.Mesh(
    new THREE.ConeGeometry( 5, 4, 4),
    roofMaterial
)
centerTop.position.set(-10,7,0)
centerTop.rotation.y = Math.PI/4
house.add(centerTop)

//---------------------           BACK ROOF        -------------------

const length = 12, width = 2;

const shape = new THREE.Shape();
shape.moveTo( 0,0 );
shape.lineTo( 0, width );
shape.lineTo( length, width );
shape.lineTo( length, 0 );
shape.lineTo( 0, 0 );

const extrudeSettings = {
	steps: 2,
	depth: 1,
	bevelEnabled: true,
	bevelThickness: 2,
	bevelSize: 1,
	bevelOffset: 0,
	bevelSegments: 1
};


const backRoof = new THREE.Mesh( new THREE.ExtrudeGeometry( shape, extrudeSettings ),
roofMaterial
) ;

backRoof.rotation.y = Math.PI /2
backRoof.position.set(-15.4, 14.5, 6)
house.add( backRoof);


//*TODO:    MOON

const moon = new THREE.Mesh(
    new THREE.SphereGeometry( 3, 20, 20 ),
    new THREE.MeshStandardMaterial({ color: 'white' })
)

moon.position.set(-15,22,13)

scene.add(moon)



//*TODO:                                DOOR

const frontDoor = new THREE.Group()

house.add(frontDoor)

//!              TEXTURES

const doorMaterial = new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.1,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture
})

const windowMaterial = new THREE.MeshStandardMaterial({
    map: glassColorTexture,
    aoMap: glassAmbientOcclusionTexture,
    displacementMap: glassHeightTexture,
    displacementScale: 0.1,
    normalMap: glassNormalTexture,
    roughnessMap: glassRoughnessTexture
})



const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2.4),
    doorMaterial
)
door.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2))
door.position.y = 1.2
door.rotation.y = Math.PI/2
door.position.z =  0
door.position.x = -8
frontDoor.add(door)

const doorTop = new THREE.Mesh(
    new THREE.CircleBufferGeometry(1, 32),
    doorMaterial
)

doorTop.rotation.y = Math.PI/2
doorTop.position.set(-7.99,2.2, 0)
frontDoor.add(doorTop)

//Cloning the Door to create the windows
const window1 = frontDoor.clone()
window1.position.set(-3.38,5,5.7)
window1.scale.set(0.5,0.5,0.5)
house.add(window1)

const window2 = window1.clone()
window2.position.set(-3.38,5,4.5)
house.add(window2)

const window3 = window1.clone()
window3.position.set(-4.95,8,-4.5)
window3.scale.set(0.3,0.3,0.3)
house.add(window3)


const window5 = window3.clone()
window5.position.set(-5,8,-5.5)

house.add(window5)


const windowTop = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2.4),
    windowMaterial
)

windowTop.rotation.y = Math.PI/2
windowTop.position.set(-12.3,12,5)
house.add(windowTop)

const windowTop2 = windowTop.clone();
windowTop2.position.set(-12.3,12,2)
house.add(windowTop2)

const windowTop3 = windowTop.clone();
windowTop3.position.set(-12.3,12,-1)
house.add(windowTop3)

const windowTop4 = windowTop.clone();
windowTop4.position.set(-12.3,12,-4)
house.add(windowTop4)

// Graves
const graves = new THREE.Group()
scene.add(graves)

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#a8a8a8' })

for(let i = 0; i < 60; i++)
{
    const angle = Math.random() * Math.PI * 7 // Random angle
    const radius =  Math.random() * 7    // Random radius
    const x = Math.cos(angle) * radius        // Get the x position using cosinus
    const z = Math.sin(angle) * radius        // Get the z position using sinus

    // Create the mesh
    const grave = new THREE.Mesh(graveGeometry, graveMaterial)

    // Position
    grave.position.set(x + 8, 0.3, z)                              

    // Rotation
    grave.rotation.z = (Math.random() - 0.5) * 0.4
    grave.rotation.y = Math.PI /2

    // Add to the graves container
    graves.add(grave)
}

//*TODO:                                FLOOR

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 40),
    grassMaterial
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0

floor.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
)
scene.add(floor)




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
camera.position.x = 12
camera.position.y = 2.50
camera.position.z = 3
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
 * Lights
 */
// Ambient light
//Decreasing the brightness to 0.12
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)


//Door Light
const doorLight = new THREE.PointLight('#ff7d46', 1, 7)
doorLight.position.set(-6.3, 3, 0)

house.add(doorLight)

const doorLightTop = doorLight.clone()
doorLightTop.position.set(-12, 15, 0)
house.add(doorLightTop)




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
 * GSAP ANIMATION
 */




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