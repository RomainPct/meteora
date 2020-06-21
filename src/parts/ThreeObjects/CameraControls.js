import React, { useRef, useEffect, useContext } from 'react'
import { useThree, useFrame, extend } from 'react-three-fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GlobalContext } from '../../contexts/GlobalContext';

extend({ OrbitControls });

export const CameraControls = () => {

    const ctx = useContext(GlobalContext)

    const { camera, gl: { domElement } } = useThree()
    const controls = useRef()
    useEffect(() => {
        const steps = {
            x: (ctx.cameraPosition.x - camera.position.x) / 45,
            y: (ctx.cameraPosition.y - camera.position.y) / 45,
            z: (ctx.cameraPosition.z - camera.position.z) / 45
        }
        for (let i = 0; i <= 45; i++) {
            setTimeout(() => {
                if (i === 45) {
                    camera.position.set(ctx.cameraPosition.x, ctx.cameraPosition.y, ctx.cameraPosition.z)
                } else {
                    camera.position.set(camera.position.x + steps.x, camera.position.y + steps.y, camera.position.z + steps.z)
                }
                controls.current.update()
            }, 1000/60 * i);
        }
    }, [ctx.cameraPosition])
    useFrame(() => controls.current.update())
    return <orbitControls
                ref={controls}
                args={[camera, domElement]}
                enableDamping={true}
                rotateSpeed={0.4}
                enableZoom={true}
                zoomSpeed={0.2}
                minDistance={3}
                maxDistance={6}
                enablePan={false}
                />
}