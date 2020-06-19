import '../style/Home.css'
import React, { useContext, useEffect, useRef, useState } from 'react'
import {useTransition, animated} from 'react-spring'
import { GlobalContext } from '../contexts/GlobalContext'
import API from '../managers/API'
import { YearBarInfo } from '../components/YearBarInfo'
import useScrollOnDrag from 'react-scroll-ondrag'

export const Home = () => {

    const ctx = useContext(GlobalContext)

    const timelineRef = useRef()
    const timelineBarRef = useRef()
    let timelineBarWidth = null
    let relativeOffset = null
    let offset = null
    const { events } = useScrollOnDrag(timelineRef, {
        onDragStart: () => {
            timelineBarWidth = timelineBarRef.current.offsetWidth
            offset = timelineBarRef.current.offsetWidth / -2
            timelineBarRef.current.style.cursor = 'grabbing'
            relativeOffset = 0
        },
        runScroll: ({dx}) => {
            relativeOffset -= dx
            if (Math.abs(relativeOffset) > 40) {
                ctx.update(null, (currentCtx) => {
                    let nextMonth = relativeOffset < 0 ? currentCtx.currentMonth + 1 : currentCtx.currentMonth - 1
                    let yearIndex = currentCtx.currentYearIndex
                    if (nextMonth > 12) {
                        yearIndex++
                        nextMonth = 1
                    } else if (nextMonth < 1) {
                        yearIndex--
                        nextMonth = 12
                    }
                    return {
                        currentYearIndex: yearIndex,
                        currentMonth: nextMonth,
                        currentYear: currentCtx.availableYears[yearIndex]
                    }
                })
                relativeOffset = 0
            }
            offset -= dx
            const absOffset = Math.abs(offset)
            if (absOffset < timelineBarWidth * 1/3 ) {
                offset -= timelineBarWidth / 3
            } else if (absOffset > timelineBarWidth * 2/3 ) {
                offset += timelineBarWidth / 3
            }
            timelineBarRef.current.style.transform = `translateX(${offset}px)`
        },
        onDragEnd: () => {
            timelineBarWidth = null
            timelineBarRef.current.style.cursor = 'grab'
        }
    })

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

    const getMonthName = (i) => {
        const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
        return months[i-1]
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
                    <YearBarInfo year={ctx.currentYear.year} meteorsCount={ctx.currentYear.meteorsCount} withLinkTo={ctx.currentYearIndex} />
                </div>
                :null
            }
            {ctx.introductionIsDone ?
                <div className="homeMainNavigation">
                    <h3>{getMonthName(ctx.currentMonth)} - {ctx.currentYear.year}</h3>
                    <div {...events} className="timeline" ref={timelineRef} >
                        <div ref={timelineBarRef} className="bar"></div>
                    </div>
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