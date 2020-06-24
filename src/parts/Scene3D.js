import '../style/Scene3D.css'
import React, { useContext, useEffect, useRef } from 'react'
import { Canvas } from 'react-three-fiber'
import { Space } from './ThreeObjects/Space'
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
        const month = ctx.currentMonth
        const range = Math.floor(meteors.length / 12 ) + month - 6
        const start = (month - 1) * range
        const end = start + range
        const currentMeteors = meteors.slice( start, end)
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
    const [ meteorsAnim, setMeteorsAnim ] = useSprings(
        meteors.length,
        i => ({
            from: { position: computePos(meteors[i], true), scale: [0, 0, 0] },
            to: async (next, cancel) => {
                await next({
                    scale: [1, 1, 1],
                    config: { duration: 500 }
                })
                await next({
                    position: computePos(meteors[i]),
                    config: {
                        duration: meteors[i].fallDuration - 1000,
                        easing: t => t*t
                    }
                })
                await next({
                    scale: [0, 0, 0],
                    config: { duration: 500 }
                })
            }
        })
    )

    const handleClick = (id, index) => {
        const pos = meteorsAnim[index].position.payload
        ctx.update({
            autoNavigationIsPlaying: false,
            cameraPosition: {
                x: pos[0].value * 1.1,
                y: pos[1].value * 1.1,
                z: pos[2].value * 1.1
            }
        })
        history.push(`/detailedMeteor/${id}`)
    }

    useEffect(() => {
        if (ctx.autoNavigationIsPlaying && pathname === '/') {
            const progression = 1 - (timerRef.current /20)
            setMeteorsAnim(i => {
                const toPoint = computePos(meteors[i])
                const fromPoint = (computePos(meteors[i], true) - toPoint) * progression + toPoint
                const baseScale = progression < 1 ? [1, 1, 1] : [0, 0, 0]
                return {
                    from: { position: fromPoint, scale: baseScale },
                    to: async (next, cancel) => {
                        await next({
                            position: toPoint,
                            config: {
                                duration: (meteors[i].fallDuration * progression) - 500,
                                easing: t => t*t
                            }
                        })
                        await next({
                            scale: [0, 0, 0],
                            config: { duration: 500 }
                        })
                    }
                }
            })
        } else {
            setMeteorsAnim(i => ({
                to: { position: meteorsAnim[i].position.payload }
            }))
        }
    }, [ctx.autoNavigationIsPlaying, pathname])

    const timerRef = useRef(null)

    useEffect(() => {
        const interval = setInterval(() => {
            if (ctx.autoNavigationIsPlaying && ctx.introductionIsDone) {
                timerRef.current += 1
                if (timerRef.current >= 20) {
                    ctx.moveInTimeline(true)
                    timerRef.current = 0
                }
            }
        }, 1000)
        return () => { clearInterval(interval) }
    }, [ctx])

    return (
        <Canvas id="main3DScene" style={{height:'100vh',width:'100vw'}}>
            <GlobalContext.Provider value={ctx}>
                <CameraControls />
                <ambientLight args={[0x404040, 0.6]}/>
                <hemisphereLight args={[0x404040, 0x000000, 0.7]} />
                <FixedLight />
                <Space />
                <Earth isRotating={pathname === '/' && ctx.autoNavigationIsPlaying} />
                <EarthAtmosphere isRotating={pathname === '/' && ctx.autoNavigationIsPlaying} />
                {meteorsAnim.map( (props, i) => (
                    <Meteor
                        {...props}
                        onClick={_ => handleClick(meteors[i].id, i)}
                        meteor={meteors[i]}
                        key={meteors[i].id}
                        isOnHome={pathname === '/'}
                        isFocus={pathname.includes(`/detailedMeteor/${meteors[i].id}`)}
                        />
                ))}
            </GlobalContext.Provider>
        </Canvas>
        )
}