import React from 'react'
import '../style/ButtonBar.css'
function Buttontype(props) {
    return <button>{props.name}</button>;
}


export const ButtonBar = () => {
    return (
        <div>
            <Buttontype name="Mass distribution"/>
            <Buttontype name="Mass comparison"/>
            <Buttontype name="Danger level"/>
        </div>
    )
}