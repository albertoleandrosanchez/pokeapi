import React, {useState,useEffect} from 'react';
import './App.css';
import Nav from './Nav';
import axios from 'axios'
import { BrowserRouter as Router, Route, Switch, useParams } from 'react-router-dom';
import DisplayPokemons from './DisplayPokemons';
import DisplayPokemon from './DisplayPokemon';

function App() {

  const [prevPage,setPrevPage] = useState();
  const [nextPage,setNextPage] = useState();
  const [currentPage,setCurrentPage] = useState('https://pokeapi.co/api/v2/pokemon-species?offset=0&limit=21');
  const [currentPokemons, setPokemons] = useState([]);  
  const [spinner, setSpinner] = useState(false);


// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect( async  ()=> {
  const res = await axios.get(currentPage);
  setNextPage(res.data.next)
  setPrevPage(res.data.previous)
  fetchPokemons(res.data.results)
  
},[currentPage])


const toggleSpinner =  () =>{
    setSpinner(!spinner)
}

const handlePage = async (page) => {
   setCurrentPage(page);
}

const fetchPokemons = async (rdata) => {
  //d.url
  const pokemones = await Promise.all(rdata.map(d => axios.get(d.url).then(res => res.data)));
  setPokemons(pokemones);



}
  return (
  
      <div className='App'>
      <Router>
      <Nav
        
        handlePage={handlePage}
        nextPage={nextPage}
        prevPage={prevPage}
        toggleSpinner={toggleSpinner}
      /> 
    
        <Switch>
          <Route exact path="/" >
            <DisplayPokemons 
            currentPage={currentPage}
            setPrevPage={setPrevPage}
            setNextPage={setNextPage}
            setCurrentPage={setCurrentPage}
            currentPokemons={currentPokemons}
            spinner={spinner}
            />
          </Route>
          <Route path="/p/:id">
            <DisplayPokemon/>
          </Route>
         
      </Switch>
      </Router>
    </div>
 
  );
}

export default App;
