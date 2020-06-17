import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ButtonBar } from '../components/ButtonBar'

export const DetailedYear = () => {
    const { year } = useParams()

    const [selectedIndex, setSelectedIndex] = useState(0)

    return (
        <main>
            <h1>This is DetailedYear {year}</h1>
            <h2>{selectedIndex}</h2>
            <Link to="/">home</Link>
            <Link to="/detailedMeteor/2">Meteor</Link>
            <ButtonBar onSelect={(id) => { setSelectedIndex(id) }} defaultId={selectedIndex} />
        </main>
    )
}