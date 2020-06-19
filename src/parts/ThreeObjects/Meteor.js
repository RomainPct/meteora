import React, { useState, useRef, useEffect } from 'react'
import { useFrame } from 'react-three-fiber'
import { Spherical, Vector3, Math as ThreeMath, MeshPhongMaterial } from 'three'
import { useSpring, animated } from 'react-spring/three'

export function Meteor(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef()
    
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)

    const history = props.history
    function handleClick() {
        console.log(props.meteor)
        history.push(`/detailedMeteor/${props.meteor.id}`)
    }

    const [isLaunched, setIsLaunched] = useState(false)

    useEffect(() => {
        setIsLaunched(true)
    }, [])

    const { meteorPos } = useSpring({
        meteorPos: isLaunched ? computePos(props.meteor.reclat, props.meteor.reclong) : computePos(props.meteor.reclat, props.meteor.reclong, true),
        config: {
            mass: Math.min(Math.max(props.meteor.mass / 30, 1), 5),
            tension: 100,
            friction: Math.min(Math.max(props.meteor.mass, 150), 1000),
            clamp: true,
            velocity: 1,
            easing: t => t*t*t
        },
        onRest: () => {
            console.log(`rest`)
        }
    })

    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

    function computePos(lat, lon, offset = false) {
        lat = (Math.random() * 360) - 180
        lon = (Math.random() * 360) - 180
        const radius = offset ? 4 : 1.6
        if (offset) {
            lat += (Math.random() * 80) - 40
            lon += (Math.random() * 80) - 40
        }
        const spherical = new Spherical(
          radius,
          ThreeMath.degToRad(lon),
          ThreeMath.degToRad(lat)
        )
        const vector = new Vector3()
        vector.setFromSpherical(spherical)
        return vector.toArray()
    }

    function size(isCapsule = false) {
        const size = Math.max(Math.min(props.meteor.mass / 4000, 0.2), 0.01) + (isCapsule ? 0.02 : 0)
        return [size, 24, 24]
    }
    
    return (
        <animated.group
            position={meteorPos}
            onClick={handleClick}
            onPointerOver={_ => setHover(true)}
            onPointerOut={_ => setHover(false)}
            >
            <mesh
                ref={mesh}
                scale={props.isFocus ? [5, 5, 5] : [1, 1, 1]}
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