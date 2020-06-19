import React, { useState, useRef } from 'react'
import { useFrame } from 'react-three-fiber'
import { Spherical, Vector3, Math as ThreeMath } from 'three'

export function Meteor(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef()
    
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)

    const history = props.history
    function handleClick() {
        history.push(`/detailedMeteor/${props.meteor.id}`)
        setActive(!active)
    }
    
    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

    function calcPosFromLatLon(lat, lon) {
        lat = lat === null ? (Math.random() * 360) - 180 : lat
        lon = lon === null ? (Math.random() * 360) - 180 : lon
        const radius = 2
        const spherical = new Spherical(
          radius,
          ThreeMath.degToRad(lon),
          ThreeMath.degToRad(lat)
        )
        const vector = new Vector3()
        vector.setFromSpherical(spherical)
        return vector
      }
    
    return (
        <mesh
        {...props}
        ref={mesh}
        scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
        position={calcPosFromLatLon(props.meteor.reclat, props.meteor.reclong)}
        onClick={handleClick}
        onPointerOver={e => setHover(true)}
        onPointerOut={e => setHover(false)}>
        <boxBufferGeometry attach="geometry" args={[0.2, 0.2, 0.2]} />
        <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
        )
}