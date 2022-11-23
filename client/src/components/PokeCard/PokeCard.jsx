import "./pokeCard.css";
import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import defaultImg from "../../Imgs/unknownPokemon.png";

const PokeCard = (props) =>{

    return(
        <div className="card__main">
            <h2>{props.nombre}</h2>
            {props.imagen?(<img src={props.imagen} alt="pokeImg" width="200px" height="225px"/>):
            (<img src={defaultImg} alt="pokeImg" width="200px" height="225px"/>)
            }   
            <div className="group__types">
            {props.tipos.map(t=>{
                return(<h4 key={t}>{t}</h4>)
            })}
            </div>
            <NavLink className="button__detail" activeClassName="active_button_detail" to={`/pokemons/${props.id}`}>
                <button id="button_detail_id">Detail...</button>
              </NavLink>
        </div>
    )
}

export default PokeCard;