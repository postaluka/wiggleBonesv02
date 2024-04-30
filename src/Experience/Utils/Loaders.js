import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import Experience from '../Experience'



export default class Loaders
{
    constructor()
    {
        this.experience = new Experience()

        this.textures = new THREE.TextureLoader(this.experience.manager.loader)
        this.cube = new THREE.CubeTextureLoader(this.experience.manager.loader)
        this.gltf = new GLTFLoader(this.experience.manager.loader)
    }
}