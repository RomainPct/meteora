import React, { useContext } from 'react'
import '../style/Header.css'
import meteoraLogo from '../assets/images/logo.svg'
import { GlobalContext } from '../contexts/GlobalContext'

export const Header = () => {

    const ctx = useContext(GlobalContext)

    return (
        <header>
            {ctx.introductionIsDone ?
                <a href="/"><img className="meteora-logo" src={meteoraLogo} alt="Meteora logo"/></a> : null
            }
        </header>
    )
}