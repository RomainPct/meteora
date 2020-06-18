import React, { useState, useRef, useMemo, useContext } from 'react'
import earthTexture from '../../assets/textures/2k_earth_daymap.jpg'
import earthNormalMap from '../../assets/textures/2k_earth_normal_map.jpg'
import earthSpecularMap from '../../assets/textures/2k_earth_specular_map.jpg'
import { useFrame } from 'react-three-fiber'
import { TextureLoader, MeshPhongMaterial, Vector2 } from 'three'
import { useSpring, animated } from 'react-spring/three'
import { GlobalContext } from '../../contexts/GlobalContext'

export function Earth(props) {

    const mesh = useRef()
    const texture = useMemo(() => new TextureLoader().load(earthTexture), [])
    const normalMap = useMemo(() => new TextureLoader().load(earthNormalMap), [])
    const specularMap = useMemo(() => new TextureLoader().load(earthSpecularMap), [])

    const [rot, setRotation] = useState([0.4, 0, 0.4])

    const ctx = useContext(GlobalContext)

    const { earthPos, earthScale } = useSpring({
        earthPos: ctx.introductionIsDone ? [0, 0, 0] : [0, -4, 0],
        earthScale: ctx.introductionIsDone ? [0.5, 0.5, 0.5] : [1, 1, 1],
        config: { mass: 2, tension: 100, friction: 200 }
    })

    useFrame(() => {
        if (props.isRotating) {
            setRotation([rot[0], rot[1] + 0.003, rot[2]])
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
                normalMap: normalMap,
                specularMap: specularMap,
                normalScale: new Vector2( 10, 10 )
            })}
            >
            <sphereBufferGeometry attach="geometry" args={[3, 50, 50]} />
        </animated.mesh>
        )
}