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
                <div className="yearBarMeteors">
                    {props.meteorsCount} meteors detected this year
                    <div className="yearBarMeteorsBackground" style={{transform: `scaleX(${Math.min(props.meteorsCount / 3323, 1)})`}}></div>
                </div>
                <div className="yearBarMedianMass">
                    Median : {medianWeight ?? '...'}g
                    <div className="yearBarMedianMassBackground" style={{transform: `scaleX(${Math.min(medianWeight / 459, 1)})`}}></div>
                </div>
                <div className="yearBarMassAverage">
                    Average : {averageMass ?? '...'}g
                    <div className="yearBarMassAverageBackground" style={{transform: `scaleX(${Math.min(averageMass / 9472, 1)})`}}></div>
                </div>
                <div className="yearBarMassMax">
                    Biggest of the year : {biggestMeteor.mass ?? '...'}g
                    <div className="yearBarMassMaxBackground" style={{transform: `scaleX(${biggestMeteor.mass / 3000000})`}}></div>
                </div>
                {props.withLinkTo ?
                    <div onClick={openDetailedYear} className="yearLink">
                        Discover {props.year}
                    </div>
                    :null
                }
            </div>
        </div>
    )
}