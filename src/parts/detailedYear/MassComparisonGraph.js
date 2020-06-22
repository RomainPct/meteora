import React, { useState, useEffect } from 'react'
import API from '../../managers/API'
import '../../style/ComparisonGraph.css'

export const MassComparisonGraph = (props) => {

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
    }, [props.year])

    return (
        <section>
            <h2 className="titleDetailedYear">Year {props.year}’s average mass</h2>
            <div className="containerCenter">
                <div className="circleContainer">
                    <div className="bigContainer">
                        <div className="textComparison">{biggestMeteor.mass}g max</div>
                        <div className="circleBig"></div>
                    </div>
                    <div className="medContainer">
                        <div className="textComparison">{medianWeight}g med. mass</div>
                        <div className="circleMed"></div>
                    </div>
                    <div className="smallContainer">
                        <div className="textComparison">{smallestMeteor.mass}g min</div>
                        <div className="circleSmall"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}