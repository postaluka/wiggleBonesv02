import * as THREE from 'three'
import { WiggleRigHelper } from "../Utils/wiggle/WiggleRigHelper";

import Experience from "../Experience";

import Lights from './Lights';

import Cube from './Models/Cube';
import Pillow from './Models/Pillow';
import Unicorn from './Models/Unicorn';
import Floor from './Models/Floor';


export default class World
{
    constructor()
    {

        this.experience = new Experience()
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.camera = this.experience.camera.instance
        this.controls = this.experience.camera.controls

        this.lights = new Lights()

        this.cube = new Cube()
        this.pillow = new Pillow()
        this.floor = new Floor()
        this.unicorn = new Unicorn()


        // Add lights
        this.scene.add(
            this.lights.directional,
            // this.lights.directionalHelper,
            // this.lights.directionalCameraHelper,
        )

        // this.controls.attach(this.cube.instanceCube)

        // Add models
        this.scene.add(
            // this.cube.instance,
            // this.pillow.instance,
            this.unicorn.instance,
            // this.floor.instance,
            this.controls
        )
        this.cube.instance.position.set(0, 100, 0)


        this.setDebug()

    }

    setDebug()
    {
        this.worldPARAMS = {}
        this.worldPARAMS.cube = () =>
        {
            this.cube.instance.position.set(0, 0, 0)
            // this.cube.instance.children[0].scale.set(0.8, 0.8, 0.8)
            this.pillow.instance.scale.set(0, 0, 0)

            this.controls.attach(this.cube.root)

        }
        this.worldPARAMS.pillow = () =>
        {
            // this.cube.instance.scale.set(0, 0, 0)
            this.cube.instance.position.set(0, 100, 0)
            this.pillow.instance.scale.set(1, 1, 1)

            this.controls.attach(this.pillow.root)
        }

        // Debug
        if (this.debug.active)
        {
            // this.debug.ui.add(this.worldPARAMS, 'cube').name('addCube')
            // this.debug.ui.add(this.worldPARAMS, 'pillow').name('addPillow')

        }
    }
}