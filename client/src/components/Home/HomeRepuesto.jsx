{
    allTypes && allTypes.map(t =>{
        return(
<option value={t} key={t}>{t.toUpperCase()}</option>
        )
    })
}

import "./home.css";
import React, {useState, useEffect, Fragment} from "react"; //Component para crearlo por clase
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { getPokemons, getTypes, filterByType } from "../../redux/actions";
import PokeCard from "../../components/PokeCard/PokeCard"
import Paginado from "../../components/Paginado/Paginado"
//- importar imagen para el fondo o mandar al CSS
//- importar las actions necesarias especificamente
//  o importarlas con * y despues bindActionCreators
//- importar componentes que se muestren en el Home

const Home = () => {
    const dispatch = useDispatch(); //VER OTRA FORMA DE DESPACHAR SIN HOOK (MapDispatchToProps())
    const allPokemons = useSelector ((state) => state.pokemons); // lo mismo que MapStateToProps ()
    //const allTypes = useSelector ((state) => state.types);
    const allTypes = ["fighting", "rock"];
    console.log("VAN LOS TYPES: ", allTypes)
    const [currentPage, setCurrentPage] = useState(1); //siempre empezamos en 1
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12); //podes variar la cantidad que te aparece
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)
    console.log("VAN LOS CURRENT: ", currentPokemons);

    const paginado = (pageNumber) => {setCurrentPage(pageNumber)}

    useEffect(()=>{ //sirve para traerse los personajes (lo mismo que el MapDispatchToProps)
        dispatch(getPokemons());
    },[dispatch])//en el array pongo una condición para que pueda ejecutarse. Por ejemplo por dependencias
        // podriamos pasarle dispatch o alguna cosa de la que dependa... que haya algun dato disponible
    
   /*  useEffect(()=>{ //sirve para traerse los personajes (lo mismo que el MapDispatchToProps)
        dispatch(getTypes());
    },[dispatch]) */

    console.log("post useEffect", allPokemons)

    const handleOnClick = (e) => {
        e.preventDefault (); //para que no se recargue la pagina sola o haga cosas predeterminadas
        dispatch(getPokemons()); //
    }

    const handleTypeFilter = (e) =>{
        e.preventDefault();
        console.log(e);
        dispatch(filterByType(e.target.value))
    }

    return(
        <div>
                <h1>AGUANTE POKEMON</h1>
                <hr/>
                <h3>
                    <Link to={"/pokemons"}>CREAR PERSONAJE</Link>
                </h3>
                <div>
                <button onClick={e =>{handleOnClick(e)}}>VOLVER A CARGAR PERSONAJES</button>
                </div>
                <select>
                    ORDENAR
                    <option value="asc">Ascendente</option>
                    <option value="des">Descendente</option>
                    <option value="atk">Ataque</option>
                </select>
                <select onChange={e => {handleTypeFilter(e)}}>
                    <option value="All" key="All">All</option>
                    <option value="electric" key="electric">Electric</option>
                </select>
                <select>     
                    FILTRAR POR EXISTENTE O CREADO    
                    <option value="all">Todos</option>       
                    <option value="exi">Existentes</option>  
                    <option value="cre">Creados</option>
                </select>
            <Paginado 
            pokemonsPerPage={pokemonsPerPage} 
            allPokemons={allPokemons.length} 
            paginado={paginado} />
            <div>
                {
                    console.log("OTRA VEZ LOS CURRENT", currentPokemons)
                }
            </div>
            <div>
            {
                //BAMO A RENDERIZAR TODOS LOS POKEMONS CON SU POKE-CARD
                currentPokemons && currentPokemons.map (p=>{
                    return(
                        <PokeCard
                        key={p.id}
                        nombre={p.nombre}
                        imagen={p.imagen}
                        tipos={p.tipos}
                        id={p.id}
                        />
                    )
                })
            }
            </div>
        </div>
    )
    }

export default Home;

/*
__Ruta principal__: debe contener

- [ ] Input de búsqueda para encontrar pokemons por nombre (La búsqueda 
    será exacta, es decir solo encontrará al pokemon si se coloca el 
    nombre completo)
- [ ] Área donde se verá el listado de pokemons. Al iniciar deberá 
cargar los primeros resultados obtenidos desde la ruta `GET /pokemons` 
y deberá mostrar su:
  - Imagen
  - Nombre
  - Tipos (Electrico, Fuego, Agua, etc)
- [ ] Botones/Opciones para filtrar por tipo de pokemon y 
por pokemon existente o creado por nosotros
- [ ] Botones/Opciones para ordenar tanto ascendentemente 
como descendentemente los pokemons por orden alfabético y por ataque
- [ ] Paginado para ir buscando y mostrando los siguientes 
pokemons, 12 pokemons por pagina.

APUNTE
value me permite acceder a esa opcion dentro del select
// componentDidMount(){}??
- funcion Paginado - paso esta funcion para que el paginado decida el state de currentPage

*/

import "./home.css";
import React, {useState, useEffect, Fragment} from "react"; //Component para crearlo por clase
import { useDispatch, useSelector, connect } from "react-redux";
import { Link } from 'react-router-dom';
import { getPokemons, getTypes, filterByType } from "../../redux/actions";
import PokeCard from "../../components/PokeCard/PokeCard"
import Paginado from "../../components/Paginado/Paginado"
//- importar imagen para el fondo o mandar al CSS
//- importar las actions necesarias especificamente
//  o importarlas con * y despues bindActionCreators
//- importar componentes que se muestren en el Home

const Home = (props) => {

    useEffect(()=>{ //sirve para traerse los personajes (lo mismo que el MapDispatchToProps)
        props.getTypes();
        props.getPokemons();
    },[])

    const allPokemons = props.pokemons; // lo mismo que MapStateToProps ()
    //const allTypes = useSelector ((state) => state.types);
    const allTypes = props.types;
    console.log("VAN LOS TYPES: ", allTypes)
    const [currentPage, setCurrentPage] = useState(1); //siempre empezamos en 1
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12); //podes variar la cantidad que te aparece
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)
    console.log("VAN LOS CURRENT: ", currentPokemons);

    const paginado = (pageNumber) => {setCurrentPage(pageNumber)}

    console.log("post useEffect", allPokemons)

    const handleOnClick = (e) => {
        e.preventDefault (); //para que no se recargue la pagina sola o haga cosas predeterminadas
        props.getPokemons(); //
    }

    const handleTypeFilter = (e) =>{
        e.preventDefault();
        console.log(e);
        props.filterByType();
    }

    return(
        <div>
                <h1>AGUANTE POKEMON</h1>
                <hr/>
                <h3>
                    <Link to={"/pokemons"}>CREAR PERSONAJE</Link>
                </h3>
                <div>
                <button onClick={e =>{handleOnClick(e)}}>VOLVER A CARGAR PERSONAJES</button>
                </div>
                <select>
                    ORDENAR
                    <option value="asc">Ascendente</option>
                    <option value="des">Descendente</option>
                    <option value="atk">Ataque</option>
                </select>
                <select onChange={e => {handleTypeFilter(e)}}>
                    <option value="All" key="All">All</option>
                    <option value="electric" key="electric">Electric</option>
                    {
                        allTypes && allTypes.map(t =>{
                                return(
                        <option value={t} key={t}>{t.toUpperCase()}</option>
                                    )
                                })
                    }
                </select>
                <select>     
                    FILTRAR POR EXISTENTE O CREADO    
                    <option value="all">Todos</option>       
                    <option value="exi">Existentes</option>  
                    <option value="cre">Creados</option>
                </select>
            <Paginado 
            pokemonsPerPage={pokemonsPerPage} 
            allPokemons={allPokemons.length} 
            paginado={paginado} />
            <div>
                {
                    console.log("OTRA VEZ LOS CURRENT", currentPokemons)
                }
            </div>
            <div>
            {
                //BAMO A RENDERIZAR TODOS LOS POKEMONS CON SU POKE-CARD
                currentPokemons && currentPokemons.map (p=>{
                    return(
                        <PokeCard
                        key={p.id}
                        nombre={p.nombre}
                        imagen={p.imagen}
                        tipos={p.tipos}
                        id={p.id}
                        />
                    )
                })
            }
            </div>
        </div>
    )
    }

    export function mapStateToProps(state){
        return {
          pokemons: state.pokemons,
        }
      }
      
      export function mapDispatchToProps(dispatch){
        return{
          getPokemons: function(){dispatch(getPokemons())},
          getTypes: function(){dispatch(getTypes())},
          filterByType: function(){dispatch(filterByType())},
        }
      }
      
export default connect(mapStateToProps, mapDispatchToProps)(Home);

/*
__Ruta principal__: debe contener

- [ ] Input de búsqueda para encontrar pokemons por nombre (La búsqueda 
    será exacta, es decir solo encontrará al pokemon si se coloca el 
    nombre completo)
- [ ] Área donde se verá el listado de pokemons. Al iniciar deberá 
cargar los primeros resultados obtenidos desde la ruta `GET /pokemons` 
y deberá mostrar su:
  - Imagen
  - Nombre
  - Tipos (Electrico, Fuego, Agua, etc)
- [ ] Botones/Opciones para filtrar por tipo de pokemon y 
por pokemon existente o creado por nosotros
- [ ] Botones/Opciones para ordenar tanto ascendentemente 
como descendentemente los pokemons por orden alfabético y por ataque
- [ ] Paginado para ir buscando y mostrando los siguientes 
pokemons, 12 pokemons por pagina.

APUNTE
value me permite acceder a esa opcion dentro del select
// componentDidMount(){}??
- funcion Paginado - paso esta funcion para que el paginado decida el state de currentPage

*/



<REDUCERRRRRR>
case "FILTER_BY_TYPE":
/*           let filter = []
          if (action.payload === "All"){
            filter = state.allPokemons;
          }
          else{
            filter = state.allPokemons.map (p => {
              let answer = [];
              for(let i=0;i<=p.tipos.length-1;i++){
                  if(p.tipos[i]===action.payload){
                    answer.push (p);
                  }
              }
              return answer[0];
            })
          } */
          console.log ("aca tenes el action.payload:", action.payload)
          let filter = allPokemons.filter (p => p.tipos[0] === action.payload)
          return{
            ...state,
            pokemons: filter
          }
</REDUCERRRRRR>