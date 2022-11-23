import "./landingPage.css";
import React from "react";
import {Link} from 'react-router-dom'
//- importar imagen para el fondo

const LandingPage = () => {
    //componente de función creado
    //no voy a necesitar estado por acá
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

/*
__Pagina inicial__: deben armar una landing page con

- [ ] Alguna imagen de fondo representativa al proyecto
- [ ] Botón para ingresar al home (`Ruta principal`)
*/