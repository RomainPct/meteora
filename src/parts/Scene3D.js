import '../style/Scene3D.css'
import React, { useContext, useEffect } from 'react'
import { Canvas } from 'react-three-fiber'
import { Earth } from './ThreeObjects/Earth'
import { EarthAtmosphere } from './ThreeObjects/EarthAtmosphere'
import { Meteor } from './ThreeObjects/Meteor'
import { useLocation, useHistory } from 'react-router-dom'
import { GlobalContext } from '../contexts/GlobalContext'
import { FixedLight } from './ThreeObjects/FixedLight'
import { CameraControls } from './ThreeObjects/CameraControls'
import { Spherical, Vector3, Math as ThreeMath } from 'three'
import { useSprings } from 'react-spring/three'

export function Scene3D() {

    const history = useHistory()
    let { pathname } = useLocation()

    const ctx = useContext(GlobalContext)

    function meteorsToDisplay() {
        if (ctx.introductionIsDone !== true) { return [] }
        const meteors = ctx.meteorsByYear[ctx.currentYear.year] ?? []
        const meteorsGroup = meteors.length / 12
        const month = ctx.currentMonth
        const currentMeteors = meteors.slice( (month - 1) * meteorsGroup, month * meteorsGroup)
        // ctx.update({
        //     meteorsOnRest: 0
        // })
        console.log(`-> meteorsToDisplay`)
        return currentMeteors
    }

    function computePos(meteor, startPoint = false) {
        let long = startPoint ? meteor.startLong : meteor.long
        let lat = startPoint ? meteor.startLat : meteor.lat
        const radius = startPoint ? 4 + meteor.startDistance : 1.6
        const spherical = new Spherical(
          radius,
          ThreeMath.degToRad(long),
          ThreeMath.degToRad(lat)
        )
        const vector = new Vector3()
        vector.setFromSpherical(spherical)
        return vector.toArray()
    }

    const meteors = meteorsToDisplay()
    const [ meteorsAnim, setMeteorsAnim, stopMeteorsAnim ] = useSprings(
        meteors.length,
        i => ({
            from: { position: computePos(meteors[i], true) },
            to: { position: computePos(meteors[i]) },
            config: {
                clamp: true,
                duration: meteors[i].fallDuration,
                easing: t => t*t
            },
            onRest: () => {
                ctx.update(null, currentCtx => {
                    if (currentCtx.meteorsOnRest + 1 === meteors.length) {
                        ctx.moveInTimeline(true)
                        return {}
                    } else {
                        return {
                            meteorsOnRest: currentCtx.meteorsOnRest + 1
                        }
                    }
                })
            }
        })
    )

    const handleClick = (id, index) => {
        const pos = meteorsAnim[index].position.payload
        ctx.update(null, (currentCtx) => ({
            ...currentCtx,
            autoNavigationIsPlaying: false,
            cameraPosition: {
                x: pos[0].value,
                y: pos[1].value,
                z: pos[2].value
            }
        }))
        history.push(`/detailedMeteor/${id}`)
    }

    useEffect(() => {
        setMeteorsAnim(i => ({
            to: { position: ctx.autoNavigationIsPlaying ? computePos(meteors[i]) : meteorsAnim[i].position.payload }
        }))
    }, [ctx.autoNavigationIsPlaying])

    return (
        <Canvas id="main3DScene" style={{height:'100vh',width:'100vw'}}>
            <GlobalContext.Provider value={ctx}>
                <CameraControls />
                <ambientLight args={[0x404040]}/>
                <FixedLight />
                <Earth isRotating={pathname === '/'} />
                <EarthAtmosphere isRotating={pathname === '/'} />
                {meteorsAnim.map( (props, i) => (
                    <Meteor
                        {...props}
                        onClick={_ => handleClick(meteors[i].id, i)}
                        meteor={meteors[i]}
                        key={meteors[i].id}
                        isFocus={pathname.includes(`/detailedMeteor/${meteors[i].id}`)}
                        />
                ))}
            </GlobalContext.Provider>
        </Canvas>
        )
}