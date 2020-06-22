import React, { useState, useRef } from 'react'
import { useFrame } from 'react-three-fiber'
import { MeshPhongMaterial } from 'three'
import { animated } from 'react-spring/three'

export function Meteor(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef()
    
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)

    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

    function size(isCapsule = false) {
        const size = Math.max(Math.min(props.meteor.mass / 4000, 0.2), 0.01) + (isCapsule ? 0.02 : 0)
        return [size, 24, 24]
    }
    
    return (
        <animated.group
            {...props}
            onPointerOver={_ => setHover(true)}
            onPointerOut={_ => setHover(false)}
            >
            <mesh
                ref={mesh}
                material={new MeshPhongMaterial({
                    color: 0xaaaaaa
                })}
                >
                <sphereBufferGeometry attach="geometry" args={size()} />
            </mesh>
            {hovered ?
                <mesh
                    material={new MeshPhongMaterial({
                        color: 0xffffff,
                        opacity: 0.6,
                        transparent: true
                    })}
                    >
                    <sphereBufferGeometry attach="geometry" args={size(true)} />
                </mesh>
                :null
            }
        </animated.group>
        )
}