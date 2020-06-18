import '../style/Home.css'
import React, { useContext, useEffect } from 'react'
import {useTransition, animated} from 'react-spring'
import { GlobalContext } from '../contexts/GlobalContext'
import API from '../managers/API'
import { YearBarInfo } from '../components/YearBarInfo'

export const Home = () => {

    const ctx = useContext(GlobalContext)

    const descriptionTransition = useTransition(
        ctx.introductionIsDone,
        null,
        {
            from: { opacity: 1, transform: 'scale(1)' },
            leave: { opacity: 0, transform: 'scale(0.8)' },
            config: { duration: 300 }
        }
    )

    useEffect(() => {
        loadYear()
    }, [])

    const loadYear = (_year = ctx.currentYear.year) => {
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
            {descriptionTransition.map(({item, key, props}) => {
                return item ? null :
                    <animated.div key={key} className="homeWelcomeView" style={props}>
                        <h3 className="homeCatchphrase">All known meteors since the IXth century</h3>
                    </animated.div>
            })}
            {ctx.introductionIsDone ?
                <div className="homeMainInformations">
                    <YearBarInfo year={ctx.currentYear.year} meteorsCount={ctx.currentYear.meteorsCount} withLink={true} />
                </div>
                :null
            }
            {ctx.introductionIsDone ?
                <div className="homeMainNavigation">
                    <h3>{ctx.currentYear.year}</h3>
                    <div className="timeline"></div>
                    <div
                        onClick={_ => ctx.update({ autoNavigationIsPlaying: !ctx.autoNavigationIsPlaying }) }
                        className={ctx.autoNavigationIsPlaying ? "playPauseButton" : "playPauseButton paused"}
                        />
                </div>
                :null
            }
        </main>
    )
}