import React, { useState, useEffect } from 'react'
import '../style/YearBarInfo.css'
import API from '../managers/API'

export const YearBarInfo = (props) => {

    const [medianWeight, setMedianWeight] = useState(null)
    const [biggestMeteor, setBiggestMeteor] = useState({})
    const [smallestMeteor, setSmallestMeteor] = useState({})

    useEffect(() => {
        API.fetchMedianWeight(props.year, (response) => {
            setMedianWeight(response)
        })
        API.fetchBiggestMeteor(props.year, (response) => {
            setBiggestMeteor(response)
        })
        API.fetchSmallestMeteor(props.year, (response) => {
            setSmallestMeteor(response)
        })
    }, [])



    return (
        <div className="yearBarInfoContainer">
            <div className="Line"></div>
            <div className="yearBarInfoItems">
                <div className="yearNameMenu">Year {props.year}</div>
                <div className="yearBarMeteors">{props.meteorsCount} meteors</div>
                <div className="yearBarAvMass">{medianWeight} med. mass</div>
                <div className="yearBarMassMin">{smallestMeteor.mass} mass min</div>
                <div className="yearBarMassMax">{biggestMeteor.mass} highest mass</div>
            </div>
        </div>
    )
}