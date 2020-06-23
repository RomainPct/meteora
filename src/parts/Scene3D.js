import '../style/Scene3D.css'
import React, { useContext, useEffect, useRef } from 'react'
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
            from: { position: computePos(meteors[i], true) },
            to: { position: computePos(meteors[i]) },
            config: {
                clamp: true,
                duration: meteors[i].fallDuration,
                easing: t => t*t
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
        if (ctx.autoNavigationIsPlaying && pathname === '/') {
            const progression = 1 - (timerRef.current /20)
            setMeteorsAnim(i => {
                const toPoint = computePos(meteors[i])
                const fromPoint = (computePos(meteors[i], true) - toPoint) * progression + toPoint
                return {
                    from: { position: fromPoint },
                    to: { position: toPoint },
                    config: {
                        duration: meteors[i].fallDuration * progression,
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
      }, [ctx]);

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
                        isOnHome={pathname === '/'}
                        isFocus={pathname.includes(`/detailedMeteor/${meteors[i].id}`)}
                        />
                ))}
            </GlobalContext.Provider>
        </Canvas>
        )
}