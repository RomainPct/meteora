import React, { useState } from 'react'
import '../style/ButtonBar.css'
function Buttontype(props) {

    return <div onClick={props.action} className={props.isSelected ? "button selected" : "button"} >{props.name}</div>;
}

export const ButtonBar = () => {

    const [selectedButton, setSelectedButton] = useState(1)

    return (
        <div className="buttonBarContainer">
            <div className="buttonBarComponent">
                <Buttontype action={() => { setSelectedButton(0) }} isSelected={selectedButton === 0} name="Mass distribution"/>
                <Buttontype action={() => { setSelectedButton(1) }} isSelected={selectedButton === 1} name="Mass comparison" />
                <Buttontype action={() => { setSelectedButton(2) }} isSelected={selectedButton === 2} name="Danger level" />
            </div>
        </div>
    )
}