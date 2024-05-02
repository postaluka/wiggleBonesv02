import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import Experience from '../Experience'



export default class Loaders
{
    constructor()
    {
        this.experience = new Experience()
        this.manager = this.experience.manager.loader


        this.textures = new THREE.TextureLoader(this.manager)
        this.cube = new THREE.CubeTextureLoader(this.manager)
        this.gltf = new GLTFLoader(this.manager)
    }
}