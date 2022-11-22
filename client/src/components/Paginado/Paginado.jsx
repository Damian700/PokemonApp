import React from 'react';
import './paginado.css'

const Paginado = (props) => {
        const {pokemonsPerPage, allPokemons, paginado} = props;
        const pageNumbers = []
        for (let i=1; i<= Math.ceil(allPokemons/pokemonsPerPage);i++){
            pageNumbers.push(i)
        }
        return (
            <nav className="pages__main">
                {
                pageNumbers && pageNumbers.map(n=>{
                    return(
                    <span key={n}>
                        <a className="page__number" key={n} onClick={()=> paginado(n)}>{n}</a>
                    </span>
                    )
                    })
                }
            </nav>
        )
    }

export default Paginado;