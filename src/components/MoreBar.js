import '../style/MoreBar.css'
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {animated, useSpring} from 'react-spring'
import soundOn from '../assets/images/volumeup.svg'
import soundOff from '../assets/images/volumeoff.svg'

export const MoreBar = () => {

    const location = useLocation()
    const aboutUsSpring = useSpring({
        opacity: location.pathname !== '/aboutUs' ? 1 : 0,
        transform: location.pathname !== '/aboutUs' ? 'translateY(0%)' : 'translateY(-50%)',
        config: { duration: 400 }
    })
    const changeSound = ()=>{
        setIsPlaying(
            !isPlaying
        )
    }
    const [isPlaying, setIsPlaying] = useState(false)
    return (
        <div className="moreBarContainer">
            <animated.div className="aboutUsButton" style={aboutUsSpring}>
                <Link to="/aboutUs">About Us</Link>
            </animated.div>
            <img src={isPlaying ? soundOn : soundOff} className="soundButton" onClick={changeSound}/>
        </div>
    )

}