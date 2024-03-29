import React from 'react';
import { NavLink } from 'react-router-dom';
import pokeLogo from '../../Imgs/Pokemon-Logo.png'
import SearchBar from '../SearchBar/SearchBar';
import './navBar.css';
import { useDispatch} from "react-redux";
import { resetPokeDetail } from '../../redux/actions';

function NavBar () {
  const dispatch = useDispatch();

const handleClick = (e)=>{
  dispatch(resetPokeDetail());
}

  return (
    <nav className="navBar__main">
        <span className="navBar__pokeLogo">
          <img id="logo__Henry" src={pokeLogo} width= "230" height="115" className="d-inline-block align-top" alt="" />
        </span>
        <div className="nav__buttons">
        <NavLink to='/home' ><button className='navBar__button' onClick={(e)=>(handleClick(e))}>HOME</button></NavLink>
        <NavLink to='/pokemons' ><button className='navBar__button'>¡POKE-CREATOR!</button></NavLink>
        <SearchBar />
        </div>
    </ nav>
  );
};

export default NavBar;
