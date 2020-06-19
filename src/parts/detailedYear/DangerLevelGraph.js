import React from 'react'
import '../../style/DangerLevel.css'

export const DangerLevelGraph = (props) => {

    return (
        <section className="containerDanger">
            <h2 className="titleDetailedYear">Year {props.year}’s comparaison</h2>
            <div className="dangerLevelContainer">
                <div className="dangerThisYear">
                    <h3 className="dangerTextBiggest">Most massive <br></br> meteor this year :</h3>
                    <div className="circleDanger">
                        <div className="circleText">
                            1,5
                        </div>
                    </div>
                </div>
                <div></div>
                <div className="chicxculub">
                    <h3 className="dangerText">Chicxculub <br></br>(dinausaurs’killer):</h3>
                    <div className="circleDino">

                    </div>
                </div>
            </div>
        </section>
    )
}