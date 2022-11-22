import React from 'react';
import { NavLink } from 'react-router-dom';
import pokeLogo from '../../Imgs/Pokemon-Logo.png'
import SearchBar from '../SearchBar/SearchBar';
import './navBar.css';


function NavBar () {
  return (
    <nav className="navBar__main">
        <span className="navBar__pokeLogo">
          <img id="logo__Henry" src={pokeLogo} width= "200" height="100" className="d-inline-block align-top" alt="" />
        </span>
        <NavLink to='/home' activeClassName='navBar__active__button'><button>HOME</button></NavLink>
        <NavLink to='/pokemons' activeClassName='navBar__active__button'><button>¡POKE-CREATOR!</button></NavLink>
        <SearchBar />
    </ nav>
  );
};

export default NavBar;
