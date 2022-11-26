import "./searchBar.css"
import React from 'react';
import { connect } from "react-redux";
import { getPokemonsQuery, getPokemons } from '../../redux/actions';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                name: "",
                };
      }
    render(){

    const handleBusqueda = (e) =>{
        e.preventDefault();
        this.setState({
            name: e.target.value
        })
        console.log(this.state.name)
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log("esto es: " + this.state.name)
        if(this.state.name.length>=1){
            let nombre = this.state.name;
            this.setState({
                name: ""
            })
            this.props.getPokemonsQuery(nombre)
        } else {
            this.props.getPokemons()
        }
    }

        return(
            <div>
                <input className="search__input" type="text" value={this.state.name} placeholder="Buscar Pokemon..." onChange={e=>handleBusqueda(e)}/>
                <button className="search__button" type="submit" onClick={e=>handleSubmit(e)}>Buscar!</button>
            </div>
        )
    }
}

export function mapDispatchToProps (dispatch){
    return {
        getPokemonsQuery: function(name){dispatch(getPokemonsQuery(name))},
        getPokemons: function(){dispatch(getPokemons())},
    }
}

export function mapStateToProps (state){
    return {
        pokemons: state.allPokemons
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);