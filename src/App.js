import React from 'react'
import './style/App.css'
import { Header } from './parts/Header'
import { Scene3D } from './parts/Scene3D'
import { Home } from './Screens/Home'
import { DetailedMeteor } from './Screens/DetailedMeteor'
import { DetailedYear } from './Screens/DetailedYear'
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from 'react-router-dom'

function App() {
    return ( 
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
                <Route path="/">
                    <Home/>
                </Route>
            </Switch>
        </Router>
    )
}
    
export default App
