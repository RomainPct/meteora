import '../style/YearBarInfo.css'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import API from '../managers/API'

export const YearBarInfo = (props) => {

    const history = useHistory()

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

    const openDetailedYear = () => {
        history.push(`/detailedYear/${props.year}`)
    }

    return (
        <div className="yearBarInfoContainer">
            <div className="Line"></div>
            <div className="yearBarInfoItems">
                <div className="yearNameMenu">Year {props.year}</div>
                <div className="yearBarMeteors">{props.meteorsCount} meteors</div>
                <div className="yearBarAvMass">{medianWeight} med. mass</div>
                <div className="yearBarMassMin">{smallestMeteor.mass} mass min</div>
                <div className="yearBarMassMax">{biggestMeteor.mass} highest mass</div>
                {props.withLink ?
                    <div onClick={openDetailedYear} className="yearLink">
                        Discover some stats about this year
                    </div>
                    :null
                }
            </div>
        </div>
    )
}