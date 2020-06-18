import React, { useContext, useEffect } from 'react'
import '../style/Home.css'
import meteoraLogo from '../assets/images/logo.svg'
import { GlobalContext } from '../contexts/GlobalContext'
import API from '../managers/API'

export const Home = () => {

    const ctx = useContext(GlobalContext)

    useEffect(() => {
        loadYear()
    }, [])

    const loadYear = (_year = ctx.currentYear) => {
        API.fetchYear(_year, (json) => {
            const newYear = {}
            newYear[_year] = json
            ctx.update({
                years: {
                    ...ctx.years,
                    ...newYear
                }
            })
        })
    }

    return (
        <main>
            <h1>This is home</h1>
            {ctx.introductionIsDone ?
                <div className="home-main-view">
                    <h2>{ctx.currentYear}</h2>
                </div>
                :
                <div className="home-display-flex">
                    <img className="meteora-logo-intro" src={meteoraLogo} alt="Meteora logo"/>
                    <h3 className="home-catchphrase">All known meteors since the IXth century</h3>
                </div>
            }
        </main>
    )
}