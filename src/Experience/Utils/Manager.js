import * as THREE from 'three'

export default class Manager
{
    constructor()
    {
        this.loader = new THREE.LoadingManager(
            // Loaded
            () =>
            {
                // console.log('loaded')
            },

            // Progress
            () =>
            {
                // console.log('progress')
            }
        )
    }
}