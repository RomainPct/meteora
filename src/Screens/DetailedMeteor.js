import React from 'react'
import { Link } from "react-router-dom";

export const DetailedMeteor = () => {
    return (
        <main>
            <h1>This is DetailedMeteor</h1>
            <Link to="/">Home</Link>
            <Link to="/detailedYear">Year</Link>
        </main>
    )
}