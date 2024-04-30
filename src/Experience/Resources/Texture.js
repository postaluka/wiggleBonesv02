import * as THREE from 'three'

import Loaders from '../Utils/Loaders'

export default class Textures
{
    constructor()
    {
        this.loader = new Loaders()

        this.environmentMap = this.loader.cube.load([
            '../../envMap/01/px.png',
            '../../envMap/01/nx.png',
            '../../envMap/01/py.png',
            '../../envMap/01/ny.png',
            '../../envMap/01/pz.png',
            '../../envMap/01/nz.png',
        ])

    }
}