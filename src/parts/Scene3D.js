import '../style/scene3D.css'
import React from 'react'
import { Canvas } from 'react-three-fiber'
import { Earth } from './ThreeObjects/Earth'
import { Meteor } from './ThreeObjects/Meteor'
import { useLocation, useHistory } from 'react-router-dom'

export function Scene3D() {
    
    const history = useHistory()
    let { pathname } = useLocation()

    return (
        <Canvas id="main3DScene" style={{height:'100vh',width:'100vw'}}>
            <ambientLight/>
            <Earth scale={pathname === '/' ? [1, 1, 1] : [2, 2, 2]} />
            <Meteor history={history} position={[3, 0, 0]}/>
        </Canvas>
        )
}