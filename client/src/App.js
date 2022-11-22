import './App.css';
import {Route, Switch} from 'react-router-dom';
import LandingPage from "./components/LandingPage/LandingPage"
import Home from "./components/Home/Home"
import {PokeCreator} from "./components/PokeCreator/PokeCreator"
import PokeDetail from './components/PokeDetail/PokeDetail';
import NavBar from './components/NavBar/NavBar';

// switch hace que si pones un link que no existe...
// te devuelva al ultimo link correcto. Matchea solo con los que están dentro de el

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
            <LandingPage />
        </Route>
        <Route path="/home">
            <Home />
        </Route>
        <Route exact path="/pokemons">
            <PokeCreator />
        </Route>
        <Route exact path="/pokemons/:id" render={({match})=><PokeDetail data={match.params.id}/>}/>
      </Switch>
    </div>
  );
}

export default App;
