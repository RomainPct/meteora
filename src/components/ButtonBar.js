import React, { useState } from 'react'
import '../style/ButtonBar.css'
function Buttontype(props) {

    return <div onClick={props.action} className={props.isSelected ? "button selected" : "button"} >{props.name}</div>;
}

export const ButtonBar = (props) => {

    const [selectedButton, setSelectedButton] = useState(props.defaultId ?? 1)

    const select = (id) => {
        setSelectedButton(id)
        props.onSelect(id)
    }

    return (
        <div className="buttonBarContainer">
            <Buttontype action={() => { select(0) }} isSelected={selectedButton === 0} name="Mass distribution"/>
            <Buttontype action={() => { select(1) }} isSelected={selectedButton === 1} name="Mass comparison" />
            <Buttontype action={() => { select(2) }} isSelected={selectedButton === 2} name="Danger level" />
        </div>
    )
}