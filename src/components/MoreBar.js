import '../style/MoreBar.css'
import React, { useState, useEffect, useRef, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {animated, useSpring} from 'react-spring'
import soundOn from '../assets/images/volumeup.svg'
import soundOff from '../assets/images/volumeoff.svg'
import backgroundSound from '../assets/meteora_audio.mp3'
import { GlobalContext } from '../contexts/GlobalContext'

export const MoreBar = () => {

    const ctx = useContext(GlobalContext)
    const location = useLocation()
    const sound = useRef(new Audio(backgroundSound))

    const aboutUsSpring = useSpring({
        opacity: location.pathname !== '/aboutUs' ? 1 : 0,
        transform: location.pathname !== '/aboutUs' ? 'translateY(0%)' : 'translateY(-50%)',
        config: { duration: 400 }
    })
    const changeSound = ()=>{
        ctx.update(null, currentCtx => ({
            isAudioEnabled: !currentCtx.isAudioEnabled
        }))
        ctx.playAudioFeedback()
    }

    useEffect(() => {
        sound.current.loop = true
        sound.current.volume = 0.8
        ctx.isAudioEnabled ? sound.current.play() : sound.current.pause()
    }, [ctx.isAudioEnabled])

    return (
        <div className="moreBarContainer">
            <animated.div className="aboutUsButton" style={aboutUsSpring}>
                <Link onClick={ctx.playAudioFeedback} to="/aboutUs">About Us</Link>
            </animated.div>
            <img src={ctx.isAudioEnabled ? soundOn : soundOff} className="soundButton" onClick={changeSound}/>
        </div>
    )

}