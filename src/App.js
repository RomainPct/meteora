import React, { useState, useEffect } from 'react'
import './style/App.css'
import { GlobalContext, defaultGlobalContext } from './contexts/GlobalContext'
import {
    BrowserRouter as Router,
  } from 'react-router-dom'
import API from './managers/API'

import { AppContent } from './parts/AppContent'

function App() {

    const loadYear = (_year) => {
        ctx.update(null, currentCtx => {
            if (currentCtx.meteorsByYear[_year] !== undefined) { return {} }
            API.fetchYear(_year, (json) => {
                const meteorsThisYear = {}
                meteorsThisYear[_year] = json.map((meteor) => {
                    const sizeRatio = Math.max(Math.min(meteor.mass / 40000, 0.02), 0.002)
                    meteor.scale = [
                        sizeRatio * Math.max(Math.random() * 10, 5),
                        sizeRatio * Math.max(Math.random() * 10, 5),
                        sizeRatio * Math.max(Math.random() * 10, 5)
                    ]
                    meteor.rotationSpeed = {
                        x: (Math.random() - 0.5) / 50,
                        y: (Math.random() - 0.5) / 50,
                        z: (Math.random() - 0.5) / 50
                    }
                    meteor.texture = (meteor.id % 7) + 1
                    meteor.long = (Math.random() * 360) - 180
                    meteor.lat = (Math.random() * 360) - 180
                    meteor.startLong = meteor.long + (Math.random() * 80) - 40
                    meteor.startLat = meteor.lat + (Math.random() * 80) - 40
                    meteor.fallDuration = ((Math.random() * 10) + 10) * 1000
                    meteor.startDistance = Math.random() * 4
                    return meteor
                })
                ctx.update(null, currentCtx => ({
                    meteorsByYear: {
                        ...currentCtx.meteorsByYear,
                        ...meteorsThisYear
                    }
                }))
            })
            return {}
        })
    }

    const moveInTimeline = (inTheFutur) => {
        ctx.update(null, (currentCtx) => {
            let nextMonth = inTheFutur ? currentCtx.currentMonth + 1 : currentCtx.currentMonth - 1
            let yearIndex = currentCtx.currentYearIndex
            if (nextMonth > 12) {
                if (yearIndex + 1 < currentCtx.availableYears.length) {
                    yearIndex++
                    nextMonth = 1
                } else {
                    nextMonth = 13
                }
            } else if (nextMonth < 1) {
                if (yearIndex - 1 >= 0) {
                    yearIndex--
                    nextMonth = 12
                } else {
                    nextMonth = 0
                }
            }
            return {
                currentYearIndex: yearIndex,
                currentMonth: nextMonth,
                currentYear: currentCtx.availableYears[yearIndex]
            }
        })
    }

    const updateContext = (newCtx, handler = null) => {
        setCtx( currentCtx => {
            newCtx = handler === null ? newCtx : handler(currentCtx)
            return {
                ...currentCtx,
                ...newCtx
            }
        })
    }

    const [ctx, setCtx] = useState({
        ...defaultGlobalContext,
        update: updateContext,
        loadYear: loadYear,
        moveInTimeline: moveInTimeline
    })

    useEffect(() => {
        API.fetchAvailableYears((availableYears) => {
            updateContext({
                availableYears: availableYears,
                currentYear: availableYears[ctx.currentYearIndex]
            })
        })
        setTimeout(() => {
            updateContext({ introductionIsDone: false })
        }, 6000)
    }, [])

    return ( 
        <GlobalContext.Provider value={ctx}>
            <Router>
                <AppContent/>
            </Router>
        </GlobalContext.Provider>
    )
}
    
export default App
