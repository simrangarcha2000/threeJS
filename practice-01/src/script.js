import './style.css'
import * as THREE from 'three'
import * as dat from 'dat.gui'

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

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)

camera.position.z = 3

scene.add(camera)

const canvas = document.querySelector('.webgl');

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(
    sizes.width, sizes.height
)

renderer.render(scene, camera)