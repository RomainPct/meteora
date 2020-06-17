import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ButtonBar } from '../components/ButtonBar'
import '../style/Home.css'
import meteoraLogo from '../assets/images/logo.svg'
import { GlobalContext } from '../contexts/GlobalContext'

export const Home = () => {

    const ctx = useContext(GlobalContext)

    return (
        <main className="home-container">
            <h1>This is home</h1>
            {ctx.introductionIsDone ?
                null
                :
                <div className="home-display-flex">
                    <img className="meteora-logo-intro" src={meteoraLogo} alt="Meteora logo"/>
                    <h3 className="home-catchphrase">All known meteors since the IXth century</h3>
                </div>
            }
        </main>
    )
}