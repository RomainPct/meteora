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
        earthPos: ctx.introductionIsDone !== null ? [0, 0, 0] : [0, -4, 0],
        earthScale: ctx.introductionIsDone !== null ? [0.5, 0.5, 0.5] : [1, 1, 1],
        config: { mass: 1.5, tension: 200, friction: 120 },
        onRest: () => {
            if (ctx.introductionIsDone === false) {
                ctx.update({
                    introductionIsDone: true
                })
            }
        }
    })

    useFrame(() => {
        if (props.isRotating) {
            setRotation([rot[0], rot[1] + 0.002, rot[2]])
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