import "./pokeCreator.css";
import React, {useState, useEffect} from "react"; //Component para crearlo por clase
import { useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from 'react-router-dom';
import {getPokemons, getTypes, createPokemon} from "../../redux/actions/"
import NavBar from "../NavBar/NavBar"
import defaultImg from "../../Imgs/unknownPokemon.png"

export const validate = (input) =>{
    let error={}
    if (!input.nombre){
        error.nombre = "Se requiere un nombre!";
    }
    if (input.peso<1||input.peso>1500){
        error.peso = "El peso debe estar entre un rango de 1 a 1500"
    }
    console.log("muestro errors",error)
    return error;
    }
    
export const PokeCreator = () => {
    const dispatch = useDispatch ();
    const history = useHistory ()
    const types = useSelector((state)=> state.types);
    const [input, setInput] = useState ({
                                nombre: "",
                                imagen: "",
                                tipos: [],
                                vida: 0,
                                ataque: 0,
                                defensa: 0,
                                velocidad: 0,
                                peso: 0,
                                altura: 0
                                    })

    const [errors, setErrors] = useState ({})
    
    useEffect(()=>{ 
        dispatch(getPokemons());
    },[dispatch])

    useEffect(()=>{
        dispatch(getTypes());
    },[dispatch])

    const handleChange = (e)=>{
        e.preventDefault()
            setInput({
                ...input,
                [e.target.name]: e.target.value,
            })
        let objError = validate({
            ...input,
            [e.target.name]: e.target.value, //por si tarda en hacer los cambios
        });
        setErrors(objError)
    }

    const handleSelect = (e)=>{
        e.preventDefault()
        setInput({
            ...input,
            tipos: [...input.tipos, e.target.value]
        })
        console.log(input)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(input)
        if(input.imagen===""){
            console.log(input.imagen)
            setInput({
                ...input,
                imagen: defaultImg,
                    })
        }
        setInput({
            ...input,
            nombre: input.nombre.toLowerCase(),
                })
        console.log(input.imagen)
        if(!errors.nombre&&!errors.peso){
        dispatch(createPokemon(input))
        alert("Personaje creado!")
        setInput({
            nombre: "",
            imagen: "",
            tipos: [],
            vida: 0,
            ataque: 0,
            defensa: 0,
            velocidad: 0,
            peso: 0,
            altura: 0
                })
        history.push("/home")
            } else{
        alert("Chequear datos del formulario!")
            }
    }

    const handleX= (tipo) => {
        console.log(tipo)
        setInput({
            ...input,
            tipos: input.tipos.filter(t => t !== tipo)
        })
        console.log(input)
    }

    return(
        <div>
        <NavBar className="navBar__item"/>
        <h1>CREA TU PERSONAJE</h1>

        <form className="formulario" onSubmit={e=>handleSubmit(e)}>
            <div>
            <p className="formulario__grupo" id="grupo__nombre">
                <label className={errors.nombre?"form__error":"formulario__label"} for="nombre">Nombre: </label>
                <input className="formulario__input" autoComplete="off" type="text" name="nombre" id="nombre" value={input.nombre} onChange={e=> handleChange(e)} />
                {
                errors.nombre && <p>{errors.nombre}</p>
                }
            </p>
            <p className="formulario__grupo" id="grupo__imagen">
                <label className="formulario__label" for="imagen">Imagen (url): </label>
                <input className="formulario__input" autoComplete="off" type="text" name="imagen" id="imagen" value={input.imagen} onChange={e=> handleChange(e)} />
            </p>
            <p className="formulario__grupo" id="grupo__tipos">
                <label className="formulario__label" for="tipos">Tipos: </label>
                <select className="formulario__input" name="tipos" id="tipos" onChange={e => {handleSelect(e)}}>
                        <option value="all" key="all">Tipos</option>
                        {
                        types && types.map(t =>{
                            let tCap = t.charAt(0).toUpperCase() + t.slice(1)
                                    return(
                            <option value={t} key={t}>{tCap}</option>
                                        )
                            })
                        }
                    </select>
            </p>
            <div className="formulario__tipos" id="grupo__tipos">
            {
                input.tipos && input.tipos.map(t =>{
                    let tCap = t.charAt(0).toUpperCase() + t.slice(1)
                    return(
                    <div key={t} className="spanType">
                    <p>{tCap}</p>
                    <button onClick={()=>handleX(t)} name={t}>X</button>
                    </div>
                    )
                }
                    )
            }
            </div>
            <hr/>
            </div>
            <div className="formulario__grupo" id="grupo__stats">
                <p id="title">STATS</p>
                <p>
                <label className="formulario__label" for="vida">Vida: </label>
                <input className="formulario__input" autoComplete="off" type="number" name="vida" id="vida" value={input.vida} onChange={e=> handleChange(e)} />
                </p>
                <p>
                <label className="formulario__label" for="ataque">Ataque: </label>
                <input className="formulario__input" autoComplete="off" type="number" name="ataque" id="ataque" value={input.ataque} onChange={e=> handleChange(e)} />
                </p>
                <p>
                <label className="formulario__label" for="defensa">Defensa: </label>
                <input className="formulario__input" autoComplete="off" type="number" name="defensa" id="defensa" value={input.defensa} onChange={e=> handleChange(e)} />
                </p>
                <p>
                <label className="formulario__label" for="velocidad">Velocidad: </label>
                <input className="formulario__input" autoComplete="off" type="number" name="velocidad" id="velocidad" value={input.velocidad} onChange={e=> handleChange(e)} />
                </p>
                <p>
                <label className={errors.peso?"form__error":"formulario__label"} for="peso">Peso: </label>
                <input className="formulario__input" autoComplete="off" type="number" name="peso" id="peso" value={input.peso} onChange={e=> handleChange(e)} />
                {errors.peso && <p>{errors.peso}</p>}
                </p>
                <p>
                <label className="formulario__label" for="altura">Altura: </label>
                <input className="formulario__input" autoComplete="off" type="number" name="altura" id="altura" value={input.altura} onChange={e=> handleChange(e)} />
                </p>
                <button id="button__create" type="submit">CREAR PERSONAJE</button>
            </div>
            <div>
            { /* //hacer un map o algo de eso con errors
            errors.nombre && ( <p className='formulario__input-error'>{errors.nombre}</p>)
            errors.peso && ( <p className='formulario__input-error'>{errors.nombre}</p>)
            errors.nombre && ( <p className='formulario__input-error'>{errors.nombre}</p>)
            errors.nombre && ( <p className='formulario__input-error'>{errors.nombre}</p>) */
            }
            </div>

        </form>
        </div>
    )
}
