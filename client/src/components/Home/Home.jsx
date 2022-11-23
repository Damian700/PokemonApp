import "./home.css";
import React, {useState, useEffect, } from "react"; //Component para crearlo por clase
import { useDispatch, useSelector,  } from "react-redux";
import { getPokemons, getTypes, resetPokemons, filterByType, filterByCreated, orderByName, orderByAtack, getPokemonsDetail} from "../../redux/actions";
import defaultImg from "../../Imgs/unknownPokemon.png"
import PokeCard from "../../components/PokeCard/PokeCard"
import Paginado from "../../components/Paginado/Paginado"
import NavBar from "../NavBar/NavBar";

const Home = () => {
    const dispatch = useDispatch(); 
    const allPokemons = useSelector ((state) => state.pokemons); 
    const allTypes = useSelector ((state) => state.types);
    const pokemon = useSelector((state)=>state.pokeDetail)
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)

    const paginado = (pageNumber) => {setCurrentPage(pageNumber)}
    const sortedTypes = allTypes.sort((a, b)=>{
        if (a > b){
          return 1;
        }
        if (a < b){
          return -1;
        }
        return 0
          })

    useEffect(()=>{ 
        dispatch(getPokemons());
    },[dispatch])
     
   useEffect(()=>{
        dispatch(getTypes());
    },[dispatch])
/* 
    useEffect(()=>{ 
        dispatch(getPokemonsDetail(1));
    },[dispatch]) */

    console.log("POST USE-EFFECT", currentPokemons, "++++++++", allTypes, "+pokemonDetail: ", pokemon)

    const handleResetFilters = (e) => {
        e.preventDefault ();
        let select_abc = document.getElementById("select_abc")
        let select_attack = document.getElementById("select_attack")
        let select_type = document.getElementById("select_type")
        let select_exi_cre = document.getElementById("select_exi_cre")
        select_abc.selectedIndex = 0;
        select_attack.selectedIndex = 0;
        select_type.selectedIndex = 0;
        select_exi_cre.selectedIndex = 0;
        dispatch(resetPokemons());
    }

    const handleTypeFilter = (e) =>{
        e.preventDefault();
        dispatch(filterByType(e.target.value))
    }

    const handleCreatedFilter = (e) =>{
        e.preventDefault();
        dispatch(filterByCreated(e.target.value))
    }

    const handleOrderByName = (e) =>{
        e.preventDefault();
        dispatch(orderByName(e.target.value))
    }

    const handleOrderByAtack = (e) =>{
        e.preventDefault();
        dispatch(orderByAtack(e.target.value))
    }

    return(
    <div>
        <NavBar className="navBar__item"/>
        <div className="body_container">
            <div className="selectors__group">
            <div><button id="reset__filters__button"onClick={handleResetFilters}>¡TODOS!</button></div>
            <p className="label__filtrado">FILTRADO: </p>
            <select id="select_abc" className="select__box" onChange={e => {handleOrderByName(e)}}>   
                <option value="id" key="id">Alfabeticamente</option>
                <option value="ase" key="ase">Ascendente</option>
                <option value="des" key="des">Descendente</option>
            </select>
            <select id="select_attack" className="select__box" onChange={e => {handleOrderByAtack(e)}}>   
                <option value="id" key="id">Ataque</option>
                <option value="ase" key="ase">Ascendente</option>
                <option value="des" key="des">Descendente</option>
            </select>
            <select id="select_type" className="select__box" onChange={e => {handleTypeFilter(e)}}>
                <option value="all" key="all">Todos</option>
                {
                sortedTypes && sortedTypes.map(t =>{
                    let tCap = t.charAt(0).toUpperCase() + t.slice(1)
                            return(
                    <option value={t} key={t}>{tCap}</option>
                                )
                    })
                }
            </select>
            <select id="select_exi_cre" className="select__box" onChange={e => {handleCreatedFilter(e)}}>
                <option value="all" key="all">Todos</option>       
                <option value="exi" key="exi">Existentes</option>  
                <option value="cre" key="cre">Creados</option>
            </select>
            </div>
            <Paginado 
            pokemonsPerPage={pokemonsPerPage} 
            allPokemons={allPokemons.length} 
            paginado={paginado}/>
            <div className="cards__group">
                {
                    currentPokemons && currentPokemons.map (p=>{
                        let nombreCap = p.nombre.charAt(0).toUpperCase() + p.nombre.slice(1)
                        return(
                            <div className="item__card" key={p.id}>
                            <PokeCard
                            nombre={nombreCap}
                            imagen={p.imagen?p.imagen:defaultImg}
                            tipos={p.tipos}
                            id={p.id}
                            />
                            </div>
                        )
                    })
                }
            </div>
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