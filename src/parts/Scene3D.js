import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import '../style/scene3D.css'

export function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={e => setActive(!active)}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export function Sphere(props) {
    const mesh = useRef()

    const [rotation, setRotation] = useState(0)

    useFrame(() => (setRotation(rotation + 0.01)))
    return (
        <mesh
            ref={mesh}
            rotation={[rotation,rotation,rotation]}
            >
            <sphereBufferGeometry attach="geometry" />
            <meshStandardMaterial attach="material" color={'brown'} />
        </mesh>
    )
}

export function Scene3D() {
    const mesh = useRef()
    const [active, setActive] = useState(false)
    return (
        <Canvas id="main3DScene" style={{height:'100vh',width:'100vw'}}>
            <ambientLight/>
            <Sphere/>
            <Box position={[3, 0, 0]}/>
        </Canvas>
    )
}