import * as THREE from 'three'
import { WiggleRigHelper } from "../Utils/wiggle/WiggleRigHelper";

import Experience from "../Experience";

import Lights from './Lights';

import Cube from './Models/Cube';
import Pillow from './Models/Pillow';
import Unicorn from './Models/Unicorn';
import Duck from './Models/Duck';
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
        this.duck = new Duck()

        // this.unicorn.instance.scale.set(1, 1, 1)
        // this.duck.instance.position.set(10, 10, 10)



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
            // this.duck.instance,
            // this.floor.instance,
            this.controls
        )
        this.cube.instance.position.set(0, 100, 0)


        this.setDebug()

    }

    setDebug()
    {
        this.worldPARAMS = {}

        this.worldPARAMS.duck = () =>
        {


            this.scene.add(this.duck.instance)
            this.scene.remove(this.unicorn.instance)


            this.controls.attach(
                this.duck.instance.getObjectByName("Root")
            )
        }
        this.worldPARAMS.unicorn = () =>
        {


            this.scene.remove(this.duck.instance)
            this.scene.add(this.unicorn.instance)

            this.controls.attach(
                this.unicorn.instance.getObjectByName("Root")
            )
        }

        // Debug
        if (this.debug.active)
        {
            this.debug.ui.add(this.worldPARAMS, 'unicorn').name('unicorn')
            this.debug.ui.add(this.worldPARAMS, 'duck').name('duck')

        }
    }
}