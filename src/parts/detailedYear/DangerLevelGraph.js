import '../../style/DangerLevel.css'
import React, { useState, useEffect } from 'react'
import API from '../../managers/API'

export const DangerLevelGraph = (props) => {

    const [biggestMeteor, setBiggestMeteor] = useState({})

    useEffect(() => {
        API.fetchBiggestMeteor(props.year, (response) => {
            setBiggestMeteor(response)
        })
    }, [props.year])

    return (
        <section className="containerDanger">
            <h2 className="titleDetailedYear">Year {props.year}’s comparaison</h2>
            <div className="dangerLevelContainer">
                <div className="dangerThisYear">
                    <h3 className="dangerTextBiggest">Most massive <br></br> meteor this year :</h3>
                    <div className="dangerContainer">
                        <div className="circleDanger" style={{transform: `translate(-50%, -50%) scale(${biggestMeteor.mass/500000})`}}>
                        </div>
                        <div className="circleText">
                            {biggestMeteor.mass}g
                        </div>
                    </div>
                </div>
                <div className="chicxculub">
                    <h3 className="dangerText">Chicxculub <br></br>(dinausaurs’killer):</h3>
                    <p className="massDino">4,6 × 10¹⁷ kg</p>
                    <div className="circleDino">
                    </div>
                </div>
            </div>
        </section>
    )
}