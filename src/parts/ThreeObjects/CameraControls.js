import React, { useRef } from 'react'
import { useThree, useFrame, extend } from 'react-three-fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

extend({ OrbitControls });

export const CameraControls = () => {
    const {    camera,    gl: { domElement },  } = useThree()
    const controls = useRef()
    useFrame(() => controls.current.update())
    return <orbitControls
                ref={controls}
                args={[camera, domElement]}
                enableDamping={true}
                enableZoom={true}
                enablePan={false}
                minDistance={5}
                maxDistance={6}
                rotateSpeed={0.4}
                />
}