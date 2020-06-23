import React from 'react'
import { Header } from './Header'
import { Scene3D } from './Scene3D'
import { Home } from '../Screens/Home'
import { DetailedMeteor } from '../Screens/DetailedMeteor'
import { DetailedYear } from '../Screens/DetailedYear'
import { AboutUs } from '../Screens/AboutUs'
import {
    Switch,
    Route,
    useLocation,
    Link
  } from 'react-router-dom'

import {useTransition, animated} from 'react-spring'

export const AppContent = () => {

    const location = useLocation()

    const pageTransition = useTransition(
        location,
        location => location.pathname,
        {
            from: { opacity: 0 },
            enter: { opacity: 1 },
            leave: { opacity: 0 },
            config: { duration: 500 }
        }
    )

    return (
        <div>
            <Header/>
            <Link to="/aboutUs">About Us</Link>
            <Scene3D/>
            {pageTransition.map(({item, key, props}) => (
                <animated.div key={key} style={props} className='mainContainer' >
                    <Switch location={item} >
                        <Route path="/detailedMeteor/:id">
                            <DetailedMeteor/>
                        </Route>
                        <Route path="/detailedYear/:yearIndex">
                            <DetailedYear/>
                        </Route>
                        <Route exact path="/aboutUs">
                            <AboutUs/>
                        </Route>
                        <Route exact path="/">
                            <Home/>
                        </Route>
                    </Switch>
                </animated.div>
            ))}
        </div>
    )
}
