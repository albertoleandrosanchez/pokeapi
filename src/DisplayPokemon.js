import axios from 'axios';
import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router'



function DisplayPokemon() {
    const [pokeInfo, setPokeInfo] = useState() 
    const {id} = useParams();

    useEffect(async () => {
        const pokemon = await axios.get('https://pokeapi.co/api/v2/pokemon/'+id)
        const pokeData = await pokemon.data
        setPokeInfo(pokeData)
    }
    , [])
    


    return (
        <div className='DisplayPokemon'>
            <div className='pokemonStats leftStats'>
                
            </div>
            <img src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'+id+'.png'} alt="aqui va la imagen del pokemon"/>
            <div className='pokemonStats rightStats'>

            </div>
        </div>
    )
}

export default DisplayPokemon
