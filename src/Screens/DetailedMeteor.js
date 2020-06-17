import React from 'react'
import { Link, useParams } from "react-router-dom";

export const DetailedMeteor = () => {
    const { id } = useParams()
    return (
        <main>
            <h1>This is DetailedMeteor {id}</h1>
            <Link to="/">Home</Link>
            <Link to="/detailedYear/1990">Year</Link>
        </main>
    )
}