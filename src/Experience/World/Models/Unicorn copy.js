import * as THREE from "three"
import { WiggleBone } from "../../Utils/wiggle"
// import { WiggleBone } from "../../Utils/wiggle/WiggleSpring"
import { WiggleRigHelper } from "../../Utils/wiggle/WiggleRigHelper";

import Experience from "../../Experience"
import Loaders from "../../Utils/Loaders"


export default class Unicorn
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

        // Add rig piullow
        this.setUnicorn()



        // Velocity

        this.addEvents()

        this.vx = 0
        this.vy = 0
        this.vz = 0

        this.ax = 0
        this.ay = 0
        this.az = 0

        this.minDist = 50


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


    setUnicorn()
    {
        this.loaders.gltf.load(
            '/3D/unicorn_03.gltf',
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
                this.joint11 = gltf.scene.getObjectByName('Joint11')
                this.joint12 = gltf.scene.getObjectByName('Joint12')
                this.joint13 = gltf.scene.getObjectByName('Joint13')
                this.joint14 = gltf.scene.getObjectByName('Joint14')


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
                this.wiggleBones.push(new WiggleBone(this.joint11, { velocity: this.wigglePARAMS.velocity }))
                this.wiggleBones.push(new WiggleBone(this.joint12, { velocity: this.wigglePARAMS.velocity }))
                this.wiggleBones.push(new WiggleBone(this.joint13, { velocity: this.wigglePARAMS.velocity }))
                this.wiggleBones.push(new WiggleBone(this.joint14, { velocity: this.wigglePARAMS.velocity }))

                this.controls.attach(this.root)
            }
        )
    }

    setVelocity()
    {
        let dx, dy, dd, distDelta

        this.pullFactor = 0.00000005
        this.pushFactor = 0.0000001



        if (this.root)
        {

            // pull force
            dx = this.root.position.x
            dy = this.root.position.y

            this.ax = dx * this.pullFactor
            this.ay = dy * this.pullFactor

            // push force 
            dx = this.root.position.x - this.mouse.x
            dy = this.root.position.y - this.mouse.y
            dd = Math.sqrt(dx * dx + dy * dy)

            distDelta = this.minDist - dd

            if (dd < this.minDist)
            {
                this.ax += (dx / dd) * distDelta * this.pushFactor
                this.ay += (dy / dd) * distDelta * this.pushFactor

            }

            this.vx += this.ax
            this.vy += this.ay

            this.root.position.x += this.vx
            this.root.position.y += this.vy
        }
    }

    debug()
    {

        // Debug
        this.debug = this.experience.debug
        if (this.debug.active)
        {
            this.debug.ui.add(this.wigglePARAMS, 'velocity', 0, 1, 0.001).name('velocityUnicorn').onChange((value) =>
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

        this.setVelocity()
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
