import React from 'react'
import './App.css'
import { Header } from './parts/Header'
import { Footer } from './parts/Footer'
import { Scene3D } from './parts/Scene3D'

function App() {
    return (
        <div className="App">
            <Header/>
            <Scene3D/>
            <Footer/>
        </div>
        )
    }
    
    export default App
