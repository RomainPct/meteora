import React, { useState, useRef, useMemo, useContext } from 'react'
import earthTexture from '../../assets/textures/2k_earth_daymap.jpg'
import earthNormalMap from '../../assets/textures/2k_earth_normal_map.jpg'
import earthSpecularMap from '../../assets/textures/2k_earth_specular_map.jpg'
import { useFrame } from 'react-three-fiber'
import { TextureLoader, MeshPhongMaterial, Vector2, MeshBasicMaterial } from 'three'
import { useSpring, animated } from 'react-spring/three'
import { GlobalContext } from '../../contexts/GlobalContext'

export function Earth(props) {

    const texture = useMemo(() => new TextureLoader().load(earthTexture), [])

    return (
        <animated.mesh
            material={new MeshBasicMaterial({
                map: texture
            })}
            >
            <sphereBufferGeometry attach="geometry" args={[20, 50, 50]} />
        </animated.mesh>
        )
}