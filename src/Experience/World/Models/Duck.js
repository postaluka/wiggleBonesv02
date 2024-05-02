import * as THREE from "three"
import { WiggleBone } from "../../Utils/wiggle"
// import { WiggleBone } from "../../Utils/wiggle/WiggleSpring"
import { WiggleRigHelper } from "../../Utils/wiggle/WiggleRigHelper";

import Experience from "../../Experience"
import Loaders from "../../Utils/Loaders"
import { log } from "three/examples/jsm/nodes/Nodes.js";


export default class Duck
{
    constructor()
    {

        this.experience = new Experience()
        this.controls = this.experience.camera.controls
        this.mouse = this.experience.mouse
        this.sizes = this.experience.sizes

        this.materials = this.experience.materials
        this.loaders = new Loaders()

        this.instance = new THREE.Group()
        this.instance.name = 'duck'
        // this.instance.position.set(10, 10, 10)


        // Add rig piullow
        this.setDuck()

        this.ix = null
        this.iy = null
        this.iz = null

        this.vy = 0
        this.ay = 0


        // this.addEvents()

        this.wigglePARAMS = {}
        this.wigglePARAMS.velocity = 0.15
        this.wigglePARAMS.stiffness = 400
        this.wigglePARAMS.damping = 15


        this.wiggleBones = []

        this.debug()

    }

    addEvents()
    {
        const onMouseDown = (event) =>
        {
            window.addEventListener('mousemove', onMouseMove)
            window.addEventListener('mouseup', onMouseUp)
        }

        window.addEventListener('mousedown', onMouseDown)

        const onMouseMove = (event) =>
        {
            // Calculate mouse position in the range of -1 to 1
            const mouseX = event.clientX / window.innerWidth * 2 - 1;
            const mouseY = - (event.clientY / window.innerHeight * 2 - 1);

            this.mouse.x = mouseX
            this.mouse.y = mouseY

            // Map mouse position from -1 to 1 to 0 to 1
            // this.mouse.x = (mouseX + 1) / 2;
            // this.mouse.y = (mouseY + 1) / 2;

            // Log the mapped mouse position
            // console.log(this.mouse.x.toFixed(2), this.mouse.y.toFixed(2));
        }

        const onMouseUp = () =>
        {
            console.log('up');
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mouseup', onMouseUp)

            this.mouse.x = 9999
            this.mouse.y = 9999
        }
    }


    setDuck()
    {
        this.loaders.gltf.load(
            '/3D/duck_06.gltf',
            (gltf) => 
            {
                this.instance.add(gltf.scene)
                gltf.scene.position.y = 0

                this.addShadows(gltf)

                this.root = gltf.scene.getObjectByName("Root")

                this.joint1 = gltf.scene.getObjectByName('Joint1')
                this.joint2 = gltf.scene.getObjectByName('Joint2')
                this.joint3 = gltf.scene.getObjectByName('Joint3')
                this.joint4 = gltf.scene.getObjectByName('Joint4')
                this.joint5 = gltf.scene.getObjectByName('Joint5')
                this.joint6 = gltf.scene.getObjectByName('Joint6')
                this.joint7 = gltf.scene.getObjectByName('Joint7')
                this.joint8 = gltf.scene.getObjectByName('Joint8')
                this.joint9 = gltf.scene.getObjectByName('Joint9')
                this.joint10 = gltf.scene.getObjectByName('Joint10')
                // this.joint11 = gltf.scene.getObjectByName('Joint11')
                // this.joint12 = gltf.scene.getObjectByName('Joint12')



                this.wiggleBones.push(new WiggleBone(this.joint1, { velocity: this.wigglePARAMS.velocity }))
                this.wiggleBones.push(new WiggleBone(this.joint2, { velocity: this.wigglePARAMS.velocity }))
                this.wiggleBones.push(new WiggleBone(this.joint3, { velocity: this.wigglePARAMS.velocity }))
                this.wiggleBones.push(new WiggleBone(this.joint4, { velocity: this.wigglePARAMS.velocity }))
                this.wiggleBones.push(new WiggleBone(this.joint5, { velocity: this.wigglePARAMS.velocity }))
                this.wiggleBones.push(new WiggleBone(this.joint6, { velocity: this.wigglePARAMS.velocity }))
                this.wiggleBones.push(new WiggleBone(this.joint7, { velocity: this.wigglePARAMS.velocity }))
                this.wiggleBones.push(new WiggleBone(this.joint8, { velocity: this.wigglePARAMS.velocity }))
                this.wiggleBones.push(new WiggleBone(this.joint9, { velocity: this.wigglePARAMS.velocity }))
                this.wiggleBones.push(new WiggleBone(this.joint10, { velocity: this.wigglePARAMS.velocity }))
                // this.wiggleBones.push(new WiggleBone(this.joint11, { velocity: this.wigglePARAMS.velocity }))
                // this.wiggleBones.push(new WiggleBone(this.joint12, { velocity: this.wigglePARAMS.velocity }))


                // this.controls.attach(this.root)

                this.ix = this.root.position.x
                this.iy = this.root.position.y
                this.iz = this.root.position.z

            }
        )
    }

    setVelocity()
    {

        if (this.root)
        {

            this.x = this.root.position.x
            if (this.y > 0.5)
            {
                this.y = 0.5
            }
            else if (this.y < -1.5)
            {
                this.y = -1.5
            }
            else
            {
                this.y = this.root.position.y
            }

            this.z = this.root.position.z

            // console.log(this.y);

            this.deltax = this.ix - this.x
            this.deltay = this.iy - this.y
            this.deltaz = this.iz - this.z

            if (this.deltax !== 0)
            {
                this.root.position.x += this.deltax * 0.05
            }
            if (this.deltay !== 0)
            {
                this.root.position.y += this.deltay * 0.05
            }
            if (this.deltaz !== 0)
            {
                this.root.position.z += this.deltaz * 0.05
            }



        }
    }

    debug()
    {

        // Debug
        this.debug = this.experience.debug
        if (this.debug.active)
        {
            this.debug.ui.add(this.wigglePARAMS, 'velocity', 0.05, 1, 0.01).name('velocityDuck').onChange((value) =>
            {
                this.wiggleBones.forEach((wb) =>
                {
                    wb.options.velocity = value
                })
            })

        }
    }

    update()
    {
        this.wiggleBones.forEach((wb) =>
        {
            wb.update()
        })

        if (this.status)
        {
            this.setVelocity()
        }

    }

    addShadows(gltf)
    {

        gltf.scene.traverse((mesh) =>
        {
            if (mesh.isMesh)
            {
                mesh.castShadow = true
                mesh.receiveShadow = true
            }
        })
    }
}
