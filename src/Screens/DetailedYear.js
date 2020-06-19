import '../style/DetailedYear.css'
import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ButtonBar } from '../components/ButtonBar'
import { YearBarInfo } from '../components/YearBarInfo'
import { MassDistributionGraph } from '../parts/detailedYear/MassDistributionGraph'
import { MassComparisonGraph } from '../parts/detailedYear/MassComparisonGraph'
import { DangerLevelGraph } from '../parts/detailedYear/DangerLevelGraph'
import { GlobalContext } from '../contexts/GlobalContext'

export const DetailedYear = () => {

    const ctx = useContext(GlobalContext)
    const { yearIndex } = useParams()
    const year = ctx.availableYears[yearIndex] ?? {}
    const yearMeteors = ctx.meteorsByYear[year.year] ?? {}

    const [selectedIndex, setSelectedIndex] = useState(1)

    useEffect(() => {
        ctx.loadYear(year.year)
    }, [year])

    function switchMainContent() {
        switch (selectedIndex) {
            case 0: return <MassDistributionGraph year={year.year} meteors={yearMeteors} />
            case 1: return <MassComparisonGraph year={year.year} meteors={yearMeteors}  />
            case 2: return <DangerLevelGraph year={year.year} />
            default: break
        }
    }

    return (
        <main className="mainDetailedYear">
            <h1>This is DetailedYear {year.year}</h1>
            <div className="detailedYearContainer">
                <div className="yearInfoContainer">
                    <YearBarInfo className="test" year={year.year} meteorsCount={year.meteorsCount} />
                </div>
                <div className="graphContainer">
                    {switchMainContent()}
                </div>
            </div>
            <ButtonBar onSelect={(id) => { setSelectedIndex(id) }} defaultId={selectedIndex} />
        </main>
    )
}