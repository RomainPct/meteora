import '../style/Scene3D.css'
import React, { useContext, useEffect } from 'react'
import { Canvas, useThree } from 'react-three-fiber'
import { Earth } from './ThreeObjects/Earth'
import { Meteor } from './ThreeObjects/Meteor'
import { useLocation, useHistory } from 'react-router-dom'
import { GlobalContext } from '../contexts/GlobalContext'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { DirectionalLight } from 'three'

const CameraController = () => {
    const { camera, gl, scene } = useThree()
    useEffect(() => {
        const controls = new OrbitControls(camera, gl.domElement)
        controls.minDistance = 5
        controls.maxDistance = 6
        controls.enableDamping = true
        controls.dampingFactor = 1
        controls.rotateSpeed = 0.2
        const light = new DirectionalLight(0xffffff, 1)
        light.position.x = 5
        light.position.z = -3
        camera.add(light)
        scene.add(camera)
        return () => { controls.update() }
    },
    [camera, gl, scene]
    )
    return null
}


export function Scene3D() {

    const history = useHistory()
    let { pathname } = useLocation()

    const ctx = useContext(GlobalContext)

    return (
        <Canvas id="main3DScene" style={{height:'100vh',width:'100vw'}}>
            <GlobalContext.Provider value={ctx}>
                <ambientLight args={[0x404040]}/>
                <CameraController />
                <Earth/>
                <Meteor history={history} position={[3, 0, 0]}/>
            </GlobalContext.Provider>
        </Canvas>
        )
}