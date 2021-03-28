
import React, {useState,useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import { useHistory } from 'react-router';



export default function Asynchronous() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const [value,setValue] = useState('')
  const history = useHistory();

  
   useEffect(async () =>{
    const response = await axios.get(' https://pokeapi.co/api/v2/pokemon?limit=1118');
    const pokemons = await response.data.results
    setOptions(Object.keys(pokemons).map( (key) => pokemons[key]));
 
   },[])

   useEffect( ()=>{
    if(!open){
      setValue('')
      
    }
   }, [open])
 /* React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }
      
    if (active) {
        setOptions(Object.keys(pokemons).map( (key) => pokemons[key]));
    }
  },[])
*/
  const  encontrarIndex= () => {
        if (value && options){
            return  '/p/'+(options.findIndex(it => it.name === value)+1)
        }
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
      onChange={
        history.push(encontrarIndex())
      }

      
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