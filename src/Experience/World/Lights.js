import * as THREE from 'three'

import Experience from '../Experience'

export default class Lights
{
    constructor()
    {
        this.experience = new Experience()

        this.setDirectional()
        // this.debugDirectional()



    }

    setDirectional()
    {
        this.directional = new THREE.DirectionalLight(0xFFFFFF, 0)
        this.directional.position.set(
            13.12,
            14.35,
            -7.77
        )
        this.directional.intensity = 0.5

        // Helpers
        this.directionalHelper = new THREE.DirectionalLightHelper(this.directional, 5)
        this.directionalCameraHelper = new THREE.CameraHelper(this.directional.shadow.camera)

        // Shadows
        this.directional.shadow.camera.near = 1
        this.directional.shadow.camera.far = 40
        this.directional.shadow.camera.top = 10
        this.directional.shadow.camera.right = 10
        this.directional.shadow.camera.bottom = -10
        this.directional.shadow.camera.left = -10
        this.directional.castShadow = true
    }

    debugDirectional()
    {
        // Debug
        this.debug = this.experience.debug
        if (this.debug.active)
        {
            // this.debug.ui.add(this.directional.rotation, 'x', - Math.PI * 2, Math.PI * 2, 0.01).name('dirLight.rotation.x')
            // this.debug.ui.add(this.directional.rotation, 'y', - Math.PI * 2, Math.PI * 2, 0.01).name('dirLight.rotation.y')
            // this.debug.ui.add(this.directional.rotation, 'z', - Math.PI * 2, Math.PI * 2, 0.01).name('dirLight.rotation.z')
            this.debug.ui.add(this.directional.position, 'x', - 50, 50, 0.01).name('dirLight.position.x')
            this.debug.ui.add(this.directional.position, 'y', - 50, 50, 0.01).name('dirLight.position.y')
            this.debug.ui.add(this.directional.position, 'z', - 50, 50, 0.01).name('dirLight.position.z')
            this.debug.ui.add(this.directional, 'intensity', 0, 1, 0.01).name('dirLight.intensity')

        }
    }
}