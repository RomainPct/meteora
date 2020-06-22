import React, { useState, useEffect } from 'react'
import API from '../../managers/API'
import '../../style/ComparisonGraph.css'

export const MassComparisonGraph = (props) => {

    const [medianWeight, setMedianWeight] = useState(0)
    const [biggestMeteor, setBiggestMeteor] = useState({})
    const [averageWeight, setAverageWeight] = useState(0)

    useEffect(() => {
        API.fetchMedianWeight(props.year, (response) => {
            setMedianWeight(response)
        })
        API.fetchBiggestMeteor(props.year, (response) => {
            setBiggestMeteor(response)
        })
        API.fetchAverageMass(props.year, (response) => {
            setAverageWeight(response)
        })
    }, [props.year])

    return (
        <section>
            <h2 className="titleDetailedYear">Year {props.year}’s average mass</h2>
            <div className="containerCenter">
                <div className="circleContainer">
                    <div className="comparisonContainer bigContainer">
                        <div className="textComparison">Biggest meteor of the year : {biggestMeteor.mass}g</div>
                        <div className="comparisonCircle circleBig"></div>
                    </div>
                    <div className="comparisonContainer medContainer">
                        <div className="textComparison">Average mass : {averageWeight}g</div>
                        <div
                            className="comparisonCircle circleMed"
                            style={{ transform: `scale(${Math.max( 0.2, 5/3 * averageWeight / biggestMeteor.mass)})`}}
                            ></div>
                    </div>
                    <div className="comparisonContainer smallContainer">
                        <div className="textComparison">Median mass : {medianWeight}g</div>
                        <div
                            className="comparisonCircle circleSmall"
                            style={{ transform: `scale(${Math.max( 0.2, 5 * medianWeight / biggestMeteor.mass)})`}}
                            ></div>
                    </div>
                </div>
            </div>
        </section>
    )
}