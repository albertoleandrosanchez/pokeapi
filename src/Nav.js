import React from 'react'
import './Nav.css'
import arrow from './poke-arrow.png'
import pokeHome from  './Logo_de_Pokemon_HOME.png'
import SearchNav from './SearchNav'
import { Link } from 'react-router-dom'

function Nav({prevPage, handlePage,nextPage}) {
  
    return (
        <div className="Nav">
            
            <Link to="/" className="pokeHome" >
                    <img src={pokeHome} alt="pokehome" style={{height:'100%'}} />
            </Link>
           
                    <SearchNav
                    
                    />
        

            <div className='arrows'>
                <Link to="/" className="pokeHome" >
                    <img src={arrow} alt="flecha a la derecha" 
                    className='Nav__arrow left' 
                    style={!prevPage? {filter: 'grayscale(100%)'}:{filter: ''}} 
                    onClick={()=> prevPage? handlePage(prevPage):''}
                    />
                </Link>
                <Link to="/" className="pokeHome" >
                    <img src={arrow} alt="flecha a la derecha" 
                    className='Nav__arrow right' 
                    style={!nextPage? {filter: 'grayscale(100%)'}:{filter: ''}}
                    
                    onClick={()=> nextPage? handlePage(nextPage):''}
                    
                    />
                </Link>
            </div>
        </div>
    )
}

export default Nav
