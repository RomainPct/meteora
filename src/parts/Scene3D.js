import '../style/scene3D.css'
import React, { useContext } from 'react'
import { Canvas } from 'react-three-fiber'
import { Earth } from './ThreeObjects/Earth'
import { Meteor } from './ThreeObjects/Meteor'
import { useLocation, useHistory } from 'react-router-dom'
import { GlobalContext } from '../contexts/GlobalContext'

export function Scene3D() {

    const history = useHistory()
    let { pathname } = useLocation()

    const ctx = useContext(GlobalContext)

    return (
        <Canvas id="main3DScene" style={{height:'100vh',width:'100vw'}}>
            <GlobalContext.Provider value={ctx}>
                <ambientLight args={[0x404040]}/>
                <directionalLight args={[0xffffff, 1]} position={[-5, 0, 0]} />
                <Earth/>
                <Meteor history={history} position={[3, 0, 0]}/>
            </GlobalContext.Provider>
        </Canvas>
        )
}