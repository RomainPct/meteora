import React, {useEffect, useState} from 'react'
import '../style/DetailedMeteor.css'
import { Link, useParams } from 'react-router-dom'
import API from '../managers/API'


export const DetailedMeteor = () => {
    const { id } = useParams()


    const [detailedMeteor, setDetailedMeteor] = useState({})
    useEffect(() => {
        API.fetchMeteor(id, (result) => {
            setDetailedMeteor(result)
        })
    }, [])

    return (
        <main>
            <h1>This is DetailedMeteor {detailedMeteor.id}</h1>
            <div className="detailedMeteorContainer">
                <div className="detailedMeteorText">
                    <h3> {detailedMeteor.name} </h3>
                    <h3>{detailedMeteor.year}</h3>
                    <h3>You might have seen it burn !</h3>
                </div>
                    <div className="detailedMeteorUpperInfo">
                        <div className="meteorInfoCard">
                            <p>CLASS</p>
                            <h3>{detailedMeteor.recclass}</h3>
                            <p className="infoDesc">Low-Iron meteor</p>
                        </div>
                        <div className="meteorInfoCard">
                            <p>MASS</p>
                            <h3>{detailedMeteor.mass}g</h3>
                            <p className="infoDesc">As heavy as a smartphone ! 📱</p>
                        </div>
                    </div>
                    <div className="detailedMeteorLowerInfo">
                        <div className="meteorInfoCard">
                            <p>FALL LOCATION</p>
                            <h3>Mexico 🇲🇽</h3>
                            <p className="infoDesc">near Mexico city</p>
                        </div>
                        <div className="meteorInfoCard">
                            <p>DESTRUCTIVE POWER</p>
                            <h3>80k Newtons</h3>
                            <p className="infoDesc">The power of Niagara Falls 🌊</p>
                        </div>
                    </div>
            </div>
        </main>
    )
}
