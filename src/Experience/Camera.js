import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js'


import Experience from './Experience'

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas

        this.setInstance()
        this.setControl()

        this.orbit, this.controls

        // this.setDebug()

    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 1000)
        this.instance.position.set(
            13.12,
            5.75,
            13.13
        )
        this.instance.rotation.set(
            -0.36,
            0.76,
            0.25
        )
        this.scene.add(this.instance)

    }

    setControl()
    {
        // this.controls = new OrbitControls(this.instance, this.canvas)
        // this.controls.enableDamping = true
        // this.controls.maxPolarAngle = Math.PI / 2.1
        // this.controls.minDistance = 15
        // this.controls.maxDistance = 21
        // this.controls.mouseButtons = {
        //     LEFT: THREE.MOUSE.ROTATE,
        //     MIDDLE: THREE.MOUSE.DOLLY,
        //     RIGHT: null //THREE.MOUSE.PAN
        // }

        this.orbit = new OrbitControls(this.instance, this.canvas);
        this.orbit.update();
        this.orbit.mouseButtons = {
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: null //THREE.MOUSE.PAN
        }

        this.controls = new TransformControls(this.instance, this.canvas)


        this.controls.addEventListener('dragging-changed', (event) =>
        {
            this.orbit.enabled = !event.value
        });


    }

    setDebug()
    {
        // Debug
        this.debug = this.experience.debug
        if (this.debug.active)
        {
            this.debug.ui.add(this.instance.position, 'x', -50, 50, 0.01).name('camera.position.x')
            this.debug.ui.add(this.instance.position, 'y', -50, 50, 0.01).name('camera.position.y')
            this.debug.ui.add(this.instance.position, 'z', -50, 50, 0.01).name('camera.position.z')
            this.debug.ui.add(this.instance.rotation, 'x', -Math.PI * 2, Math.PI * 2, 0.01).name('camera.rotation.x')
            this.debug.ui.add(this.instance.rotation, 'y', -Math.PI * 2, Math.PI * 2, 0.01).name('camera.rotation.y')
            this.debug.ui.add(this.instance.rotation, 'z', -Math.PI * 2, Math.PI * 2, 0.01).name('camera.rotation.z')
        }
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        // this.controls.update()
        // console.log(
        //     //     this.instance.position,
        //     //     this.instance.rotation
        // );
    }
}