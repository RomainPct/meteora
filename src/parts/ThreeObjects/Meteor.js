import React, { useState, useRef, Suspense, useMemo } from 'react'
import { useSpring, animated } from 'react-spring/three'
import { useFrame, useLoader } from 'react-three-fiber'
import { TextureLoader, MeshPhongMaterial, Vector2 } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

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
    const texture = useMemo(() => new TextureLoader().load(`/meteor/${props.meteor.texture}/texture.jpg`), [props.meteor.texture])
    const normalMap = useMemo(() => new TextureLoader().load(`/meteor/${props.meteor.texture}/normal.png`), [props.meteor.texture])
    const { nodes } = useLoader(GLTFLoader, '/3D_objects/meteor.glb');

    useFrame(() => {
        mesh.current.rotation.x += props.meteor.rotationSpeed.x
        mesh.current.rotation.y += props.meteor.rotationSpeed.y
        mesh.current.rotation.z += props.meteor.rotationSpeed.z
    })

    return (
        <mesh
            ref={mesh}
            geometry={nodes.meteor.geometry}
            scale={props.scale}
            material={new MeshPhongMaterial({
                map: texture,
                normalMap: normalMap,
                normalScale: new Vector2( 2, 2 )
            })}
            >
        </mesh>
    )
}

export function Meteor(props) {
    
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)

    const groupTransition = useSpring({
        scale: props.isOnHome || props.isFocus ? [1, 1, 1] : [0, 0, 0]
    })

    function capsuleSize() {
        const scale = Math.max(...props.meteor.scale) * 1.9
        return [scale, 24, 24]
    }
    
    return (
        <animated.group
            {...groupTransition}
            {...props}
            onPointerOver={_ => setHover(true)}
            onPointerOut={_ => setHover(false)}
            >
            <Suspense fallback={<MeteorFallback size={capsuleSize()} />}>
                <MeteorModel meteor={props.meteor} scale={props.meteor.scale} />
            </Suspense>
            {hovered ?
                <mesh
                    material={new MeshPhongMaterial({
                        color: 0xA6D9DC,
                        opacity: 0.4,
                        transparent: true
                    })}
                    >
                    <sphereBufferGeometry attach="geometry" args={capsuleSize()} />
                </mesh>
                :null
            }
        </animated.group>
        )
}