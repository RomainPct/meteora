import '../style/YearBarInfo.css'
import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import API from '../managers/API'
import backSpace from '../assets/images/keyboard_backspace-white-18dp.svg'
import { GlobalContext } from '../contexts/GlobalContext'

export const YearBarInfo = (props) => {

    const ctx = useContext(GlobalContext)

    const history = useHistory()

    const [medianWeight, setMedianWeight] = useState(null)
    const [biggestMeteor, setBiggestMeteor] = useState({})
    const [averageMass, setAverageMass] = useState(null)

    useEffect(() => {
        API.fetchMedianWeight(props.year, (response) => {
            setMedianWeight(response)
        })
        API.fetchBiggestMeteor(props.year, (response) => {
            setBiggestMeteor(response)
        })
        API.fetchAverageMass(props.year, (response) => {
            setAverageMass(response)
        })
    }, [props.year])

    const openDetailedYear = () => {
        history.push(`/detailedYear/${props.withLinkTo}`)
    }

    const navigateInYears = (inTheFutur) => {
        ctx.update(
            null,
            (currentCtx) => {
                let yearIndex = currentCtx.currentYearIndex + (inTheFutur ? 1 : -1)
                let month = 1
                if (yearIndex >= currentCtx.availableYears.length) {
                    yearIndex = currentCtx.availableYears.length - 1
                    month = 13
                } else if (yearIndex < 0) {
                    yearIndex = 0
                    month = 0
                }
                return {
                    currentYearIndex: yearIndex,
                    currentMonth: month,
                    currentYear: currentCtx.availableYears[yearIndex]
                }
            }
        )
    }

    return (
        <div className="yearBarInfoContainer">
            <div className="Line"></div>
            <div className="yearBarInfoItems">
                <div className="yearNameMenu">
                    <img onClick={_ => navigateInYears(false)} className="changeYearButton" src={backSpace} />
                    Year {props.year}
                    <img onClick={_ => navigateInYears(true)} className="changeYearButton reversed" src={backSpace} />
                </div>
                <div className="yearBarMeteors">
                    {props.meteorsCount} meteors detected this year
                    <div className="yearBarMeteorsBackground" style={{transform: `scaleX(${Math.min(props.meteorsCount / 3323, 1)})`}}></div>
                </div>
                <div className="yearBarMedianMass">
                    Median : {medianWeight ?? '...'}g
                    <div className="yearBarMedianMassBackground" style={{transform: `scaleX(${Math.min(medianWeight / 459, 1)})`}}></div>
                </div>
                <div className="yearBarMassAverage">
                    Average : {averageMass ?? '...'}g
                    <div className="yearBarMassAverageBackground" style={{transform: `scaleX(${Math.min(averageMass / 9472, 1)})`}}></div>
                </div>
                <div className="yearBarMassMax">
                    Biggest of the year : {biggestMeteor.mass ?? '...'}g
                    <div className="yearBarMassMaxBackground" style={{transform: `scaleX(${biggestMeteor.mass / 3000000})`}}></div>
                </div>
                {props.withLinkTo ?
                    <div onClick={openDetailedYear} className="yearLink">
                        learn more about {props.year}'s meteors
                    </div>
                    :null
                }
            </div>
        </div>
    )
}