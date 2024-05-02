import * as THREE from 'three'

import Experience from '../Experience'

export default class Manager
{
    constructor()
    {
        this.experience = new Experience()



        // this.controls = this.experience.camera.controls
        // this.unicorn = this.experience.world.unicorn.instance
        // this.duck = this.experience.world.duck.instance

        this.loader = new THREE.LoadingManager(
            // Loaded
            () =>
            {

                this.root = this.experience.world.unicorn.instance.getObjectByName("Root")
                this.controls = this.experience.camera.controls

                this.controls.attach(this.root)

            },

            // Progress
            () =>
            {
                // console.log('progress')
            }
        )
    }
}