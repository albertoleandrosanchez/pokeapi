import React, {useState} from 'react'
import './PokeIndex.css'

function PokeLI({id,name,img,color}) {

    const [wasHover,setHover] = useState(false)

    const changeAnimationOnHover = () =>{
       return wasHover?'0':'1'
    }

    return (
        <div className='Poke_I' style={{borderColor: color,animationIterationCount:changeAnimationOnHover()} }  
        onMouseEnter={()=>{
            setHover(false);
        }}
        onMouseLeave={()=>{
            setHover(true)
        }
            
        } >
            <div className='Poke_I__background'>
                <img src={img} alt='pokeimg' className='Poke_I__img'/>
                <div className='Poke__shadow'/>
            </div>
            <p className='Poke_I__Desc'>{id}. <br/> {name}</p>
        </div>
    )
}

export default PokeLI
