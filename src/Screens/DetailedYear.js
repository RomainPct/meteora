import '../style/DetailedYear.css'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ButtonBar } from '../components/ButtonBar'
import { YearBarInfo } from '../components/YearBarInfo'
import { MassDistributionGraph } from '../parts/detailedYear/MassDistributionGraph'
import { MassComparisonGraph } from '../parts/detailedYear/MassComparisonGraph'
import { DangerLevelGraph } from '../parts/detailedYear/DangerLevelGraph'

export const DetailedYear = () => {
    const { year } = useParams()

    const [selectedIndex, setSelectedIndex] = useState(1)

    function switchMainContent() {
        switch (selectedIndex) {
            case 0: return <MassDistributionGraph/>
            case 1: return <MassComparisonGraph/>
            case 2: return <DangerLevelGraph/>
            default: break
        }
    }

    return (
        <main>
            <h1>This is DetailedYear {year}</h1>
            <div className="detailedYearContainer">
                <div className="yearInfoContainer">
                    <YearBarInfo className="test" year={2000} meteorsCount={10} />
                </div>
                <div className="graphContainer">
                    {switchMainContent()}
                </div>
            </div>
            <ButtonBar onSelect={(id) => { setSelectedIndex(id) }} defaultId={selectedIndex} />
        </main>
    )
}