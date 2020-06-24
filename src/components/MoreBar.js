import '../style/MoreBar.css'
import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {animated, useSpring} from 'react-spring'
import soundOn from '../assets/images/volumeup.svg'
import soundOff from '../assets/images/volumeoff.svg'
import backgroundSound from '../assets/meteora_audio.mp3'

export const MoreBar = () => {

    const location = useLocation()
    const [isPlaying, setIsPlaying] = useState(false)
    const sound = useRef(new Audio(backgroundSound))

    const aboutUsSpring = useSpring({
        opacity: location.pathname !== '/aboutUs' ? 1 : 0,
        transform: location.pathname !== '/aboutUs' ? 'translateY(0%)' : 'translateY(-50%)',
        config: { duration: 400 }
    })
    const changeSound = ()=>{
        setIsPlaying(!isPlaying)
    }

    useEffect(() => {
        isPlaying ? sound.current.play() : sound.current.pause()
    }, [isPlaying])

    return (
        <div className="moreBarContainer">
            <animated.div className="aboutUsButton" style={aboutUsSpring}>
                <Link to="/aboutUs">About Us</Link>
            </animated.div>
            <img src={isPlaying ? soundOn : soundOff} className="soundButton" onClick={changeSound}/>
        </div>
    )

}