import React, { useState, useRef } from 'react'
import { useFrame } from 'react-three-fiber'

export function Earth(props) {
    const mesh = useRef()
    
    const [rotation, setRotation] = useState(0)
    
    useFrame(() => (setRotation(rotation + 0.01)))
    return (
        <mesh
        {...props}
        ref={mesh}
        rotation={[rotation,rotation,rotation]}
        >
        <sphereBufferGeometry attach="geometry" />
        <meshStandardMaterial attach="material" color={'brown'} />
        </mesh>
        )
}