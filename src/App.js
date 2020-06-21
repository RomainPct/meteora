import React, { useState, useEffect } from 'react'
import './style/App.css'
import { Header } from './parts/Header'
import { Scene3D } from './parts/Scene3D'
import { Home } from './Screens/Home'
import { DetailedMeteor } from './Screens/DetailedMeteor'
import { DetailedYear } from './Screens/DetailedYear'
import { GlobalContext, defaultGlobalContext } from './contexts/GlobalContext'
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from 'react-router-dom'
import API from './managers/API'

function App() {

    const loadYear = (_year) => {
        ctx.update(null, currentCtx => {
            if (currentCtx.meteorsByYear[_year] !== undefined) { return {} }
            API.fetchYear(_year, (json) => {
                const meteorsThisYear = {}
                meteorsThisYear[_year] = json.map((meteor) => {
                    meteor.long = (Math.random() * 360) - 180
                    meteor.lat = (Math.random() * 360) - 180
                    meteor.startLong = meteor.long + (Math.random() * 80) - 40
                    meteor.startLat = meteor.lat + (Math.random() * 80) - 40
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
        loadYear: loadYear
    })

    useEffect(() => {
        API.fetchAvailableYears((availableYears) => {
            updateContext({
                availableYears: availableYears,
                currentYear: availableYears[ctx.currentYearIndex]
            })
        })
        setTimeout(() => {
            updateContext({
                introductionIsDone: false
            })
        }, 3000)
    }, [])

    return ( 
        <GlobalContext.Provider value={ctx}>
            <Router>
                <Header/>
                <Scene3D/>
                <Switch>
                    <Route path="/detailedMeteor/:id">
                        <DetailedMeteor/>
                    </Route>
                    <Route path="/detailedYear/:yearIndex">
                        <DetailedYear/>
                    </Route>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                </Switch>
            </Router>
        </GlobalContext.Provider>
    )
}
    
export default App
