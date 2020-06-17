import React, { useContext } from 'react'
import '../style/Header.css'
import meteoraLogo from '../assets/images/logo.svg'
import { GlobalContext } from '../contexts/GlobalContext'
import { Link } from 'react-router-dom'

export const Header = () => {

    const ctx = useContext(GlobalContext)

    return (
        <header>
            {ctx.introductionIsDone ?
                <Link to="/">
                    <img className="meteora-logo" src={meteoraLogo} alt="Meteora logo"/>
                </Link>
                : null
            }
        </header>
    )
}