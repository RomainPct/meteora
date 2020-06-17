import React from 'react'
import { Link, useParams } from "react-router-dom";

export const DetailedYear = () => {
    const { year } = useParams()
    return (
        <main>
            <h1>This is DetailedYear {year}</h1>
            <Link to="/">home</Link>
            <Link to="/detailedMeteor/2">Meteor</Link>
        </main>
    )
}