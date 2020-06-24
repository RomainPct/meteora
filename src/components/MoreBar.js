import '../style/MoreBar.css'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {animated, useSpring} from 'react-spring'

export const MoreBar = () => {

    const location = useLocation()

    const aboutUsSpring = useSpring({
        opacity: location.pathname !== '/aboutUs' ? 1 : 0,
        transform: location.pathname !== '/aboutUs' ? 'translateY(0%)' : 'translateY(-50%)',
        config: { duration: 400 }
    })

    return (
        <div>
            <animated.div className="aboutUsButton" style={aboutUsSpring}>
                <Link to="/aboutUs">About Us</Link>
            </animated.div>
        </div>
    )

}