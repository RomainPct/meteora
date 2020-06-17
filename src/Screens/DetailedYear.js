import React from 'react'
import { Link } from "react-router-dom";

export const DetailedYear = () => {
    return (
        <main>
            <h1>This is DetailedYear</h1>
            <Link to="/">home</Link>
            <Link to="/detailedMeteor">Meteor</Link>
        </main>
    )
}