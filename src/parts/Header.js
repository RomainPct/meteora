import React, { useContext } from 'react'
import '../style/Header.css'
import meteoraLogo from '../assets/images/logo.svg'
import { GlobalContext } from '../contexts/GlobalContext'
import { Link } from 'react-router-dom'
import {useSpring, animated} from 'react-spring'

export const Header = () => {

    const ctx = useContext(GlobalContext)

    const headerSpring = useSpring({
        transform: ctx.introductionIsDone ? 'translateX(0) translateX(0) translateY(0%) scale(1)' : 'translateX(50vw) translateX(-50%) translateY(100%) scale(2)'
    })

    return (
        <animated.header style={headerSpring}>
            <Link to="/">
                <img className="meteora-logo" src={meteoraLogo} alt="Meteora logo"/>
            </Link>
        </animated.header>
    )
}