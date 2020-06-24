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
                <h2 className="titleAbout">About us</h2>
                <div className="containerPicture">
                    <div className="pictureLine">
                        <div className="teamPic">
                            <div className="containerPP">
                                <img src={romain} alt="team romain"/>
                                <a className="linkProfile" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/romain-penchenat/">
                                    <img src={linkedin} alt="linkedin logo"/>
                                </a>
                            </div>
                            <p>Romain Penchenat</p>
                            <p>Project leader & front-end developper</p>
                        </div>
                        <div className="teamPic">
                            <div className="containerPP">
                                <img src={hugo} className="profilePic" alt="team hugo"/>
                                <a className="linkProfile" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/hugoleroyhl/">
                                    <img src={linkedin} alt="linkedin logo"/>
                                </a>
                            </div>
                            <p>Hugo Leroy</p>
                            <p>Front-end developper & UI Designer</p>
                        </div>
                        <div className="teamPic">
                            <div className="containerPP">
                                <img src={loup} className="profilePic" alt="team loup"/>
                                <a className="linkProfile" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/louplemaire/">
                                    <img src={linkedin} alt="linkedin logo"/>
                                </a>
                            </div>
                            <p>Loup Lemaire</p>
                            <p>Back-end developper</p>
                        </div>
                        <div className="teamPic">
                            <div className="containerPP">
                                <img src={nicolas} className="profilePic" alt="team nicolas"/>
                                <a className="linkProfile" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/nicolas-decreton-3844921a1">
                                    <img src={linkedin} alt="linkedin logo"/>
                                </a>
                            </div>
                            <p>Nicolas Decreton</p>
                            <p>Front-end developper & UI Designer</p>
                        </div>
                    </div>
                    <div className="pictureLine">
                        <div className="teamPic">
                            <div className="containerPP">
                                <img src={oscar} className="profilePic" alt="team oscar"/>
                                <a className="linkProfile" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/oscarthiriet/">
                                    <img src={linkedin} alt="linkedin logo"/>
                                </a>
                            </div>
                            <p>Oscar Thiriet</p>
                            <p>Graphic Designer</p>
                        </div>
                        <div className="teamPic">
                            <div className="containerPP">
                                <img src={victor} className="profilePic" alt="team victor"/>
                                <a className="linkProfile" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/victor-buczkowski-572251199/">
                                    <img src={linkedin} alt="linkedin logo"/>
                                </a>
                            </div>
                            <p>Victor Buczkowski</p>
                            <p>Graphic Designer</p>
                        </div>
                        <div className="teamPic">
                            <div className="containerPP">
                                <img src={arnaud} className="profilePic" alt="team arnaud"/>
                                <a className="linkProfile" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/arnaud-soyer/">
                                    <img src={linkedin} alt="linkedin logo"/>
                                </a>
                            </div>
                            <p>Arnaud Soyer</p>
                            <p>Marketer</p>
                        </div>
                    </div>
                </div>
                <div className="containerShare">
                    <a className="shareBar" target="_blank" rel="noopener noreferrer"  href="https://twitter.com/intent/tweet?text=%F0%9F%8C%9F%20I%20recommend%20this%20experience%20from%20outer%20space%20!%20%23meteora%20by%20%40romainp_design%20%40Hugo_LeroyHL%20%40LoupLemaire%20%40knownasneelo%20https://meteora.netlify.app">
                        <img src={twitter} className="logoShare" alt="Twitter Logo"/>
                        <h3>Tweet about it !</h3>
                    </a>
                    <a className="shareBar" target="_blank" rel="noopener noreferrer" href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fmeteora.netlify.app&title=%F0%9F%8C%9F%20I%20recommend%20this%20experience%20from%20outer%20space%20!%20%23meteora">
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