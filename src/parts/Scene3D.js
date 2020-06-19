import '../style/Scene3D.css'
import React, { useContext } from 'react'
import { Canvas } from 'react-three-fiber'
import { Earth } from './ThreeObjects/Earth'
import { EarthAtmosphere } from './ThreeObjects/EarthAtmosphere'
import { Meteor } from './ThreeObjects/Meteor'
import { useLocation, useHistory } from 'react-router-dom'
import { GlobalContext } from '../contexts/GlobalContext'
import { FixedLight } from './ThreeObjects/FixedLight'
import { CameraControls } from './ThreeObjects/CameraControls'

export function Scene3D() {

    const history = useHistory()
    let { pathname } = useLocation()

    const ctx = useContext(GlobalContext)

    return (
        <Canvas id="main3DScene" style={{height:'100vh',width:'100vw'}}>
            <GlobalContext.Provider value={ctx}>
                <CameraControls />
                <ambientLight args={[0x404040]}/>
                <FixedLight />
                <Earth isRotating={pathname === '/'} />
                <EarthAtmosphere isRotating={pathname === '/'} />
                <Meteor history={history} position={[3, 0, 0]}/>
            </GlobalContext.Provider>
        </Canvas>
        )
}