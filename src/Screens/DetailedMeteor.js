import React from 'react'
import '../style/DetailedMeteor.css'
import { Link, useParams } from 'react-router-dom'

export const DetailedMeteor = () => {
    const { id } = useParams()
    return (
        <main>
            <h1>This is DetailedMeteor {id}</h1>
            <Link to="/">Home</Link>
            <Link to="/detailedYear/1990">Year</Link>
            <div className="detailedMeteorContainer">
                <div className="detailedMeteorText">
                    <h2>Fribolino</h2>
                    <h3>1987</h3>
                    <h3>You might have seen it burn !</h3>
                    <div className="detailedMeteorUpperInfo">
                        <div className="meteorInfoCard">
                            <p>CLASS</p>
                            <h2>L5</h2>
                            <p class="infoDesc">Low-Iron meteor</p>
                        </div>
                        <div className="meteorInfoCard">
                            <p>MASS</p>
                            <h2>246g</h2>
                            <p class="infoDesc">As heavy as a smartphone ! 📱</p>
                        </div>
                    </div>
                    <div className="detailedMeteorLowerInfo">
                        <div className="meteorInfoCard">
                            <p>FALL LOCATION</p>
                            <h2>Mexico 🇲🇽</h2>
                            <p class="infoDesc">near Mexico city</p>
                        </div>
                        <div className="meteorInfoCard">
                            <p>DESTRUCTIVE POWER</p>
                            <h2>80k Newtons</h2>
                            <p class="infoDesc">The power of Niagara Falls 🌊</p>
                        </div>
                    </div>

                </div>


            </div>
        </main>
    )
}