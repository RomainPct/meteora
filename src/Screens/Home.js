import React from 'react'
import { Link } from "react-router-dom";

export const Home = () => {
    return (
        <main>
            <h1>This is home</h1>
            <Link to="/detailedMeteor">Meteor</Link>
            <Link to="/detailedYear">Year</Link>
        </main>
    )
}