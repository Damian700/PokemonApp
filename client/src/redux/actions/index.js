import axios from 'axios';
import React from 'react';

// export const GET_POKEMONS = "GET_POKEMONS"

export function getPokemons(){
    return (
        async (dispatch) => {
            try{
            let info = await axios.get (`http://localhost:3001/pokemons`)
        return dispatch ({ //PORQUE ACA DISPATCH Y en FILTER NO?
            type:'GET_POKEMONS',
            payload: info.data
        })
    } catch(e){console.log("ERROR EN GET POKEMONS!....",e)}
    }
  )
}


export function getTypes(){
    return (
        async (dispatch) => {
            try{
            let info = await axios.get (`http://localhost:3001/types`)
        return dispatch ({ //PORQUE ACA DISPATCH Y en FILTER NO?
            type:'GET_TYPES',
            payload: info.data
        })
    } catch(e){console.log("ERROR EN GET TYPES!....",e)}
    }
  )
}

export function getPokemonsQuery(name){
    return (
        async (dispatch) => {
            try{
            let info = await axios.get (`http://localhost:3001/pokemons?name="${name}"`)
        return dispatch ({
            type:'GET_POKEMONS_QUERY',
            payload: info.data
        })
    } catch(e){console.log("ERROR EN GET POKEMONS QUERY!....",e)}
    }
  )
}

export function getPokemonsDetail(id){
    return (
        async (dispatch) => {
            try{
            let info = await axios.get (`http://localhost:3001/pokemons/${id}`)
            console.log("ACTIONS GET DETAIL ME ESTAN LLAMANDO, CON ESTO: ", id, "TRAJE ESTO: ",info.data)
        return dispatch ({
            type:'GET_POKEMONS_DETAIL',
            payload: info.data
        })
    } catch(e){console.log("ERROR EN GET POKEMONS ID!....",e)}
    }
  )
}

export function createPokemon(data){
    return (
        async () => {
            try{
            let info = await axios.post (`http://localhost:3001/pokemons`,data)
            console.log(`${info} y te paso tambien ${info.data}`)
        return ({
            type: 'CREATE_POKEMON',
        })
    } catch(e){console.log("ERROR EN GET POKEMONS!....",e)}
    }
  )
}

export function filterByType(selected){
    return {
        type: 'FILTER_BY_TYPE',
        payload: selected
    }
}

export function filterByCreated(created){
    return {
        type: 'FILTER_BY_CREATED',
        payload: created
    }
}


export function orderByName(how){
    return {
        type: 'ORDER_BY_NAME',
        payload: how
    }
}

export function orderByAtack(how){
    return {
        type: 'ORDER_BY_ATACK',
        payload: how
    }
}

/* 
APUNTE
- No hacer logica en las acciones. Estas solo estan para recibir información y despacharla al reducer con
la orden correspondiente. LA LOGICA VA EN EL REDUCER.
*/