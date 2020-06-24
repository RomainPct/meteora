import React from 'react'
import '../style/MobileDisclaimer.css'

export const MobileDisclaimer = () => {
    return(
        <div className="mobileDisclaimerContainer">
            <img src="./computer.svg"/>
            <h2>This experience is not available for mobile devices
                <br/>Please access the website from a computer 
            </h2>
        </div>
    )
}