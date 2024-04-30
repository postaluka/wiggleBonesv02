import * as THREE from 'three'

import Experience from '../../Experience'
import Materials from '../../Resources/Materials'

export default class Floor
{
    constructor()
    {
        this.experience = new Experience()
        this.materials = new Materials()

        this.side = 100

        this.instance = new THREE.Mesh(
            new THREE.PlaneGeometry(this.side, this.side, 1, 1),
            this.materials.basic
        )
        this.instance.receiveShadow = true
        // this.instance.castShadow = true

        // Coordinates
        this.instance.rotation.x = - Math.PI / 2
    }
}