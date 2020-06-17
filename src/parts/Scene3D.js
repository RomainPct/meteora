import '../style/scene3D.css'
import React from 'react'
import { Canvas } from 'react-three-fiber'
import { Earth } from './ThreeObjects/Earth'
import { Demo } from './ThreeObjects/Demo'
import { useLocation } from 'react-router-dom'

export function Scene3D() {
    
    let { pathname } = useLocation()
    
    return (
        <Canvas id="main3DScene" style={{height:'100vh',width:'100vw'}}>
            <ambientLight/>
            <Earth scale={pathname === '/' ? [1, 1, 1] : [2, 2, 2]} />
            <Demo position={[3, 0, 0]}/>
        </Canvas>
        )
}