import '../style/YearBarInfo.css'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import API from '../managers/API'

export const YearBarInfo = (props) => {

    const history = useHistory()

    const [medianWeight, setMedianWeight] = useState(null)
    const [biggestMeteor, setBiggestMeteor] = useState({})
    const [averageMass, setAverageMass] = useState(null)

    useEffect(() => {
        API.fetchMedianWeight(props.year, (response) => {
            setMedianWeight(response)
        })
        API.fetchBiggestMeteor(props.year, (response) => {
            setBiggestMeteor(response)
        })
        API.fetchAverageMass(props.year, (response) => {
            setAverageMass(response)
        })
    }, [props.year])

    const openDetailedYear = () => {
        history.push(`/detailedYear/${props.withLinkTo}`)
    }

    return (
        <div className="yearBarInfoContainer">
            <div className="Line"></div>
            <div className="yearBarInfoItems">
                <div className="yearNameMenu">Year {props.year}</div>
                <div className="yearBarMeteors">{props.meteorsCount} meteors
                    <div className="yearBarMeteorsBackground" style={{transform: `scaleX(${props.meteorsCount / 3323})`}}></div>
                </div>
                <div className="yearBarMedianMass">{medianWeight} med. mass
                    <div className="yearBarMedianMassBackground" style={{transform: `scaleX(${medianWeight / 459})`}}></div>
                </div>
                <div className="yearBarMassAverage">{averageMass} average mass
                    <div className="yearBarMassAverageBackground" style={{transform: `scaleX(${averageMass / 9472})`}}></div>
                </div>
                <div className="yearBarMassMax">{biggestMeteor.mass} highest mass
                    <div className="yearBarMassMaxBackground" style={{transform: `scaleX(${biggestMeteor.mass / 3000000})`}}></div>
                </div>
                {props.withLinkTo ?
                    <div onClick={openDetailedYear} className="yearLink">
                        Discover some stats about this year
                    </div>
                    :null
                }
            </div>
        </div>
    )
}