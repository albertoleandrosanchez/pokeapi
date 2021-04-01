import axios from 'axios';
import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router'
import './DisplayPokemon.css'



function DisplayPokemon() {
    const [pokeInfo, setPokeInfo] = useState({}) ;
    const [pokeSpeInfo,setPokeSpeInfo] = useState({})
    const [loading,setLoading] = useState(true);
    const {id} = useParams();

    const fetchPokemonSpe = async ()=> {  
    const pokemonSpe = await axios.get('https://pokeapi.co/api/v2/pokemon-species/'+id)
    const pokeDataSpe = await pokemonSpe.data
    return pokeDataSpe

}

    useEffect(() => {
        const fetchPokemon = async () =>{
            const pokemon = await axios.get('https://pokeapi.co/api/v2/pokemon/'+id)
            const pokeData = await pokemon.data
            await setPokeInfo(pokeData)
            await fetchPokemonSpe().then(p=>setPokeSpeInfo(p)).catch(e=>{console.log(e); setPokeSpeInfo(null)})
            await setLoading(false)
        }
        fetchPokemon()
    }
    , [id]
    )
  
    if (loading) return (<h1>CARGANDO...</h1>
    );else
    return (
        <div className='DisplayPokemon'>
            <div className="background" style={{backgroundColor:`${pokeSpeInfo?pokeSpeInfo.color.name:'gold'}`}}/>
           
                <div className='pokeInfo__base'>
                    <h1 className='pokemonTitle'>{pokeInfo.id}. {pokeInfo.name}</h1>

                    <img 
                    style={{height:'100%', width:'100%'}}
                    src={  
                        pokeInfo.sprites.other['official-artwork'].front_default?
                            pokeInfo.sprites.other['official-artwork'].front_default:
                            pokeInfo.sprites.front_default
                        }
                
                    
                    alt="aqui va la imagen del pokemon"/>
                
                    <div className="pokeStats__base">
                        {
                        pokeInfo.stats.map((stats)=>
                            <div className='pokemon__stat'>
                                <div className='pokemon__stat__titulo'><p>{stats.stat.name}</p> </div>
                                <div className='pokemon__stat__number'><p>{stats.base_stat}</p></div>
                            </div>
                            )
                        }
                    </div>
                </div>

        </div>
    )
}

const color=[]
export default DisplayPokemon
