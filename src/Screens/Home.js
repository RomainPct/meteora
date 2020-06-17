import React from 'react'
import { Link } from 'react-router-dom'
import { ButtonBar } from '../components/ButtonBar'

export const Home = () => {
    return (
        <main>
            <h1>This is home</h1>
            <Link to="/detailedMeteor/1">Meteor</Link>
            <Link to="/detailedYear/2000">Year</Link>
            <ButtonBar/>
        </main>
    )
}