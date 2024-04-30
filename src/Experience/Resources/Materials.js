import * as THREE from 'three'

import Textures from './Texture'

export default class Materials
{
    constructor()
    {
        this.textures = new Textures()

        this.basic = new THREE.MeshStandardMaterial({
            metalness: 0.45,
            roughness: 0.65,
            side: THREE.DoubleSide,
        })

    }
}