import React, { useState, useRef, Suspense, useMemo } from 'react'
import { animated } from 'react-spring/three'
import { useFrame, useLoader } from 'react-three-fiber'
import { TextureLoader, MeshPhongMaterial, Vector2 } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import meteorTexture from '../../assets/meteor/texture.jpg'
import meteorNormalMap from '../../assets/meteor/normal.png'
import meteorSpecularMap from '../../assets/meteor/specular.png'

function MeteorFallback(props) {
    return (
        <mesh
            material={new MeshPhongMaterial({
                color: 0xaaaaaa
            })}
            >
            <sphereBufferGeometry attach="geometry" args={props.size} />
        </mesh>
    )
}

function MeteorModel(props) {

    const mesh = useRef()
    const texture = useMemo(() => new TextureLoader().load(meteorTexture), [])
    const normalMap = useMemo(() => new TextureLoader().load(meteorNormalMap), [])
    const specularMap = useMemo(() => new TextureLoader().load(meteorSpecularMap), [])
    const { nodes } = useLoader(GLTFLoader, '/3D_objects/meteor.glb');

    useFrame(() => (mesh.current.rotation.z = mesh.current.rotation.z += 0.01))

    return (
        <mesh
            ref={mesh}
            geometry={nodes.meteor.geometry}
            scale={[0.1, 0.1, 0.1]}
            material={new MeshPhongMaterial({
                map: texture,
                normalMap: normalMap,
                normalScale: new Vector2( 10, 10 ),
                specularMap: specularMap
            })}
            >
        </mesh>
    )
}

export function Meteor(props) {
    // This reference will give us direct access to the mesh
    // const mesh = useRef()
    
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)

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
            <Suspense fallback={<MeteorFallback size={size()} />}>
                <MeteorModel />
            </Suspense>
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