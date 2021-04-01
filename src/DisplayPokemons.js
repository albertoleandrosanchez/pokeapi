import React from 'react'
import PokeIndex from './Poke_I/PokeLI'
import './DisplayPokemons.css'
import { Link } from 'react-router-dom'


function DisplayPokemons({currentPokemons}) {

    return (
        <div className='DisplayPokemons'>
            <div className="listaPokemon">
               
               {currentPokemons.map( poke =>
                        <Link to={`/p/${poke.id}`}>
                            <PokeIndex

                                    key={poke.id}
                                    id= {poke.id}
                                    name= {poke.name}
                                    color= {poke.color.name}
                                    img= {`http://static.pokemonpets.com/images/monsters-images-800-800/${poke.id}-${poke.name}.png`}
                                    />
                        </Link>
                )}
              
            </div>  
        </div>
    )
}

export default DisplayPokemons
