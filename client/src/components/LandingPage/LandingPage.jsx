import "./landingPage.css";
import React from "react";
import {Link} from 'react-router-dom'
//- importar imagen para el fondo

const LandingPage = () => {
    //componente de función creado
    //no voy a necesitar estado por acá
    return(
        <>
        <h1>WELCOME TO MY POKEAPP</h1>
        <Link to='/home'>
            <button>INGRESAR</button>
        </Link>
        </>
    )
}

export default LandingPage;

/*
__Pagina inicial__: deben armar una landing page con

- [ ] Alguna imagen de fondo representativa al proyecto
- [ ] Botón para ingresar al home (`Ruta principal`)
*/