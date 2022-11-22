import "./pokeDetail.css";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getPokemonsDetail } from "../../redux/actions";
import { Link } from 'react-router-dom';
import NavBar from "../NavBar/NavBar"
import defaultImg from "../../Imgs/unknownPokemon.png";


const PokeDetail = ({data}) =>{
    const dispatch = useDispatch()
    const allPokemons = useSelector ((state) => state.pokemons); 
    const allTypes = useSelector ((state) => state.types);
    const pokemon = useSelector((state)=>state.pokeDetail)
    console.log("ESTO LLEGÓ POR MATCH", data)

    useEffect(()=>{ 
        dispatch(getPokemonsDetail(data));
    },[dispatch])

    console.log("ESTO ES EL POKEMON", pokemon)
    return(
      <div className="body__container">
        <NavBar className="navBar__item"/>
        <h1>DETALLE POKEMON</h1>
        {
            pokemon && pokemon.map(p=>{
                let nombreCap = p.nombre.charAt(0).toUpperCase() + p.nombre.slice(1)
                return(
                <div className="card__detail" key={p.id}>
                <div>
                <h1>{nombreCap}</h1>
                <h3>ID: {p.id}</h3>
                {p.imagen?(<img src={p.imagen} alt="pokeImg" width="200px" height="225px"/>):
                (<img src={defaultImg} alt="pokeImg" width="200px" height="225px"/>)
                }
                </div>
                <div>
                <h3 id="title">TIPOS</h3>   
                {p.tipos.map(t=>{
                    return(<h4 key={t}>{t}</h4>)
                })}
                <hr/>
                <h3 id="title">STATS</h3>
                <h4>VIDA: {p.vida}</h4>
                <h4>ATAQUE: {p.ataque}</h4>
                <h4>DEFENSA: {p.defensa}</h4>
                <h4>VELOCIDAD: {p.velocidad}</h4>
                <h4>ALTURA: {p.altura}</h4>
                <h4>PESO: {p.peso}</h4>
                </div>
                </div>
                )
            })
        }

      </div>
    )
}

export default PokeDetail;