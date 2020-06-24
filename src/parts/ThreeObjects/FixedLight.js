import { useEffect } from 'react'
import { useThree } from 'react-three-fiber'
import { DirectionalLight } from 'three'

export const FixedLight = () => {
    const { camera, scene } = useThree()

    useEffect(() => {
        const light = new DirectionalLight(0xffffff, 1)
        light.position.x = 5
        light.position.z = -1
        camera.add(light)
        scene.add(camera)
    }, [camera, scene] )

    return null
}