import React, { useState } from 'react'
import '../style/YearBarInfo.css'

export const YearBarInfo = (props) => {
    
    return (
        <div className="yearBarInfoContainer">
            <div className="Line"></div>
            <div className="yearBarInfoItems">
                <div className="yearNameMenu">Year {props.year}</div>
                <div className="yearBarMeteors">meteors</div>
                <div className="yearBarAvMass">av. mass</div>
                <div className="yearBarMassMin">mass min</div>
                <div className="yearBarMassMax">highest mass</div>
            </div>
        </div>
    )
}