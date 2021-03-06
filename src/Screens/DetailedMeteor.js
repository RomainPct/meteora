import '../style/DetailedMeteor.css'
import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import API from '../managers/API'


export const DetailedMeteor = () => {
    const { id } = useParams()


    const [detailedMeteor, setDetailedMeteor] = useState({})
    useEffect(() => {
        API.fetchMeteor(id, (result) => {
            setDetailedMeteor({
                ...result,
                description: getMeteorDescription(result.mass)
            })
        })
    }, [id])

    function getMeteorDescription(mass) {
        const bigMeteorDesc = [
            "You might have seen it burn !",
            "It was massive enough to be seen !",
            "Were you around when it was burning ?",
            "There is a chance you have seen it burning !",
            "Look, a shooting star !"
         ]
         const smallMeteorDesc = [
             "This one was too small to be seen",
             "There is no way you saw this one burning",
         ]
         return (mass > 1000) ? bigMeteorDesc[Math.floor(Math.random()*bigMeteorDesc.length)] : smallMeteorDesc[Math.floor(Math.random()*smallMeteorDesc.length)]
    }

    
    return (
        <main>
            <h1>This is DetailedMeteor {detailedMeteor.id}</h1>
            <div className="detailedMeteorContainer">
                <div className="detailedMeteorText">
                    <p className="infoDesc">Year {detailedMeteor.year}</p>
                    <h3>{detailedMeteor.name}</h3>
                    <p>{detailedMeteor.description}</p>
                </div>
                    <div className="detailedMeteorUpperInfo">
                        <div className="meteorInfoCard">
                            <p>COMPONENTS</p>
                            <h3>{detailedMeteor.classification_description}</h3>
                            <p className="infoDesc">Class {detailedMeteor.recclass}</p>
                        </div>
                        <div className="meteorInfoCard">
                            <p>MASS</p>
                            <h3>{detailedMeteor.mass}g</h3>
                            <p className="infoDesc">{detailedMeteor.mass_comparison}</p>
                        </div>
                    </div>
                    <div className="detailedMeteorLowerInfo">
                        <div className="meteorInfoCard">
                            <p>IDENTIFIED FROM</p>
                            <h3>{(detailedMeteor.country == null || detailedMeteor.country.length === 0) ? "Unknown location" : detailedMeteor.country }<span role="img" aria-label="mexico">{detailedMeteor.flag == null ? "" : detailedMeteor.flag }</span></h3>
                            <p className="infoDesc">{detailedMeteor.city == null ? "" : detailedMeteor.city }</p>
                        </div>
                        <div className="meteorInfoCard">
                            <p>DESTRUCTIVE POWER</p>
                            <h3>{detailedMeteor.energy_in_kWh}kWh</h3>
                            <p className="infoDesc">{detailedMeteor.energy_comparison}</p>
                        </div>
                    </div>
            </div>
        </main>

    )
    
    
}
