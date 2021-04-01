
import React, {useState,useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import { useHistory } from 'react-router';



export default function Asynchronous({setPokeId}) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const [value,setValue] = useState('');
  const [inputValue,setInputValue] = useState('')
  const history = useHistory();
  

  
   useEffect(async () =>{
    const response = await axios.get(' https://pokeapi.co/api/v2/pokemon?limit=1118');
    const pokemons = await response.data.results
    await setOptions(Object.keys(pokemons).map( (key) => pokemons[key]));
    
   },[])

   useEffect( ()=>{
    if(!open){
      setValue('')
    }
   }, [open])

   useEffect( ()=>{
     
      encontrarIndex()
   },[value])

  const encontrarIndex= async () => {

   /*      if (value && options){
            setValue(inputValue)
            let data = await obtenerID(options.find(it => it.name === value).url)
            console.log("pase pora aca")
             history.push('/p/'+data)      
          
        } */
        console.log(value) 
        if (value && options){
          const pokemonEncontrado = options.find(it => it.name === value)
          if(pokemonEncontrado){
          let data = await obtenerID(pokemonEncontrado.url)
          history.push('/p/'+data)   
         
           
        }
        else{
          console.log('no se pudo encontrar el pokemon')
        }
      }
    }

  const obtenerID = async(url) => {
    const poke = await axios.get(url)
    const data = await poke.data
    return data.id
  }

  return (
    
    <Autocomplete
      id="pokemonId"
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      onChange={''}
      onInputChange={(_,val)=>{setValue(val)}}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Pokemon"
          variant="outlined"
          
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  )}