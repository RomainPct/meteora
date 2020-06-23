import React from 'react'
import '../style/About.css'
import romain from '../assets/images/team/romain.png'
import hugo from '../assets/images/team/hugo.png'
import loup from '../assets/images/team/loup.png'
import nicolas from '../assets/images/team/nicolas.png'
import oscar from '../assets/images/team/oscar.png'
import victor from '../assets/images/team/victor.png'
import arnaud from '../assets/images/team/arnaud.png'
import linkedin from '../assets/images/logos/logolinkedin.svg'
import twitter from '../assets/images/logos/logotwitter.svg'

export const AboutUs = () => {
    
    return (
        <main className="aboutPage">
            <div className="containerAbout">
                <h2>AboutUs</h2>
                <div className="containerPicture">
                    <div className="pictureLine">
                        <div className="teamPic">
                            <img src={romain} alt="team picture romain"/>
                            <p>Romain Penchenat</p>
                            <p>Project leader & front-end developper</p>
                        </div>
                        <div className="teamPic">
                            <img src={hugo} alt="team picture hugo"/>
                            <div className="teamText">
                                <p>Hugo Leroy</p>
                                <p>Front-end developper & UI Designer</p>
                            </div>
                        </div>
                        <div className="teamPic">
                            <img src={loup} alt="team picture loup"/>
                            <div className="teamText">
                                <p>Loup Lemaire</p>
                                <p>Back-end developper</p>
                            </div>
                        </div>
                        <div className="teamPic">
                            <img src={nicolas} alt="team picture nicolas"/>
                            <div className="teamText">
                                <p>Nicolas Decreton</p>
                                <p>Front-end developper & UI Designer</p>
                            </div>
                        </div>
                    </div>
                    <div className="pictureLine">
                        <div className="teamPic">
                            <img src={oscar} alt="team picture oscar"/>
                            <p>Oscar Thiriet</p>
                            <p>Graphic Designer</p>
                        </div>
                        <div className="teamPic">
                            <img src={victor} alt="team picture victor"/>
                            <p>Victor Buczkowski</p>
                            <p>Graphic Designer</p>
                        </div>
                        <div className="teamPic">
                            <img src={arnaud} alt="team picture arnaud"/>
                            <p>Arnaud Soyer</p>
                            <p>Marketer</p>
                        </div>
                    </div>
                </div>
                <div className="containerShare">
                    <a className="shareBar" href="https://twitter.com/intent/tweet?text=%F0%9F%8C%9F%20I%20recommend%20this%20experience%20from%20outer%20space%20!%20%23meteora%20by%20%40romainp_design%20%40Hugo_LeroyHL%20%40LoupLemaire%20%40knownasneelo%20https://meteora.netlify.app">
                        <img src={twitter} className="logoShare" alt="Twitter Logo"/>
                        <h3>Tweet about it !</h3>
                    </a>
                    <a className="shareBar" href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fmeteora.netlify.app&title=%F0%9F%8C%9F%20I%20recommend%20this%20experience%20from%20outer%20space%20!%20%23meteora">
                        <img src={linkedin} className="logoShare" alt="Linkedin Logo"/>
                        <h3>Share it on LinkedIn !</h3>
                    </a>
                </div>
                <div className="legalInfo">
                    <h3 className="textLegal">
                        Legal info
                    </h3>
                    <p>
                    This site has been created for educational purposes as part of the Grande Ecole curriculum of the HETIC school. The contents and data presented have not been the subject of a request for right of use. This site will in no case be exploited for commercial purposes.
Since it is an approximation, the data is not entirely accurate and does not represent the reality.
                    </p>
                </div>
            </div>
        </main>
    )
        
}