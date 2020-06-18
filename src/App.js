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

    const [ctx, setCtx] = useState(defaultGlobalContext)

    useEffect(() => {
        API.fetchAvailableYears((availableYears) => {
            setTimeout(() => {
                setCtx({
                    ...ctx,
                    introductionIsDone: true,
                    availableYears: availableYears
                })
            }, 3000)
        })
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
                    <Route path="/detailedYear/:year">
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
