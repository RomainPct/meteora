import React, { useContext } from 'react'
import '../style/Header.css'
import meteoraLogo from '../assets/images/logo.svg'
import backSpace from '../assets/images/keyboard_backspace-white-18dp.svg'
import { useLocation } from 'react-router-dom'
import { GlobalContext } from '../contexts/GlobalContext'
import { Link } from 'react-router-dom'
import {useSpring, animated} from 'react-spring'

export const Header = () => {

    const ctx = useContext(GlobalContext)
    const { pathname } = useLocation()

    const headerSpring = useSpring({
        transform: ctx.introductionIsDone
            ? (pathname === '/'
                ? 'translateX(0vw) translateX(0px) translateX(0%) translateY(0%) scale(1)'
                : 'translateX(0vw) translateX(80px) translateX(0%) translateY(0%) scale(1)'
            )
            : 'translateX(50vw) translateX(0px) translateX(-50%) translateY(100%) scale(2)'
    })

    const backButtonSpring = useSpring({
        transform: pathname === '/' ? 'translateX(-100%)' : 'translateX(0%)',
        opacity: pathname === '/' ? 0 : 1
    })

    return (
        <header>
            <Link className="header" to="/">
                <animated.img style={backButtonSpring} className="backButton" src={backSpace} alt="Meteora logo"/>
                <animated.div style={headerSpring}>
                    <img className="meteora-logo" src={meteoraLogo} alt="Meteora logo"/>
                </animated.div>
            </Link>
        </header>
    )
}