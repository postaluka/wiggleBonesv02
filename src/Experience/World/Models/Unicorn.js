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

        this.materials = this.experience.materials
        this.loaders = new Loaders()

        this.instance = new THREE.Group()

        // Add rig piullow
        this.setUnicorn()

        this.wigglePARAMS = {}
        this.wigglePARAMS.velocity = 0.15
        this.wigglePARAMS.stiffness = 400
        this.wigglePARAMS.damping = 15


        this.wiggleBones = []

        this.debug()

    }


    setUnicorn()
    {
        this.loaders.gltf.load(
            '/3D/unicorn_01.gltf',
            (gltf) => 
            {
                this.instance.add(gltf.scene)
                gltf.scene.position.y = 0

                this.addShadows(gltf)

                // console.log(gltf.scene.children[0])
                // console.log('Joint1', gltf.scene.children[0].children[1].children[0])
                // console.log('Joint2', gltf.scene.children[0].children[1].children[0].children[0])
                // console.log('Joint3', gltf.scene.children[0].children[1].children[1])
                // console.log('Joint4', gltf.scene.children[0].children[1].children[1].children[0])
                // console.log('Joint5', gltf.scene.children[0].children[1].children[2])
                // console.log('Joint6', gltf.scene.children[0].children[1].children[2].children[0])
                // console.log('Joint7', gltf.scene.children[0].children[1].children[3])
                // console.log('Joint8', gltf.scene.children[0].children[1].children[3].children[0])

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

                this.controls.attach(this.root)
            }
        )
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

            // this.debug.ui.add(this.wigglePARAMS, 'stiffness', 10, 600, 1).name('stiffness').onChange((value) =>
            // {
            //     this.wiggleBones.forEach((wb) =>
            //     {
            //         this.wigglePARAMS.stiffness = value
            //         wb.reset()
            //         wb.options.stiffness = this.wigglePARAMS.stiffness
            //         wb.update()

            //     })
            // })

            // this.debug.ui.add(this.wigglePARAMS, 'damping', 5, 200, 1).name('damping').onChange((value) =>
            // {
            //     this.wiggleBones.forEach((wb) =>
            //     {
            //         this.wigglePARAMS.damping = value
            //         wb.reset()
            //         wb.options.damping = this.wigglePARAMS.damping
            //         wb.update()
            //     })
            // })
        }
    }

    update()
    {
        this.wiggleBones.forEach((wb) =>
        {
            wb.update()
        })
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
