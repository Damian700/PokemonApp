import "./landingPage.css";
import React, { useEffect }from "react";
import {Link} from 'react-router-dom'

const LandingPage = () => {
        useEffect(() => {
          document.title = 'POKEMON WORLD';
        }, []);
    return(
        <div id="container_landing">
        <h1 id="main_landing">POKEMON WORLD</h1>
        <Link to='/home'>
            <button id="landing_button">ENTRA</button>
        </Link>
        <h2 id="sub_main_landing">Y COMIENZA TU AVENTURA...</h2>
        </ div>
    )
}

export default LandingPage;