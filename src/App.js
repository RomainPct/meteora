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
  } from "react-router-dom";

function App() {
    return ( 
        <div className="App">
            <Header/>
            <Scene3D/>
            <Router>
                <Switch>
                    <Route path="/detailedMeteor">
                        <DetailedMeteor/>
                    </Route>
                    <Route path="/detailedYear">
                        <DetailedYear/>
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </Router>
        </div>
        )
    }
    
    export default App
