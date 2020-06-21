import React, { useState, useRef, useMemo, useContext } from 'react'
import earthCloudsTexture from '../../assets/textures/2k_earth_clouds.jpg'
import { useFrame } from 'react-three-fiber'
import { TextureLoader, MeshPhongMaterial } from 'three'
import { useSpring, animated } from 'react-spring/three'
import { GlobalContext } from '../../contexts/GlobalContext'

export function EarthAtmosphere(props) {

    const mesh = useRef()
    const texture = useMemo(() => new TextureLoader().load(earthCloudsTexture), [])

    const [rot, setRotation] = useState([0.4, 0, 0.4])

    const ctx = useContext(GlobalContext)

    const { earthPos, earthScale } = useSpring({
        earthPos: ctx.introductionIsDone !== null ? [0, 0, 0] : [0, -4, 0],
        earthScale: ctx.introductionIsDone !== null ? [0.5, 0.5, 0.5] : [1, 1, 1],
        config: { mass: 1.5, tension: 200, friction: 120 }
    })

    useFrame(() => {
        if (props.isRotating) {
            setRotation([rot[0], rot[1] + 0.001, rot[2]])
        }
    })

    return (
        <animated.mesh
            ref={mesh}
            rotation={rot}
            position={earthPos}
            scale={earthScale}
            material={new MeshPhongMaterial({
                map: texture,
                alphaMap: texture,
                transparent: true
            })}
            >
            <sphereBufferGeometry attach="geometry" args={[3.01, 50, 50]} />
        </animated.mesh>
        )
}