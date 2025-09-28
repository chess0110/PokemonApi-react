import buscarSvg from '../assets/buscarSvg.svg'
import {useEffect, useState} from 'react'
import ViewPokemonDetails from './ViewPokemonDetails.jsx'
import GetPokeInfo from './GetPokeInfo.jsx'


function SearchPokemon({AddPokemon, pokemonName, changeValidView,validView,pokemonResultsCard}){
  const [EstadoShowHide,setEstadoShowHide] = useState(false)

  const ManejarClick = async () => {
    try {
      const data = await GetPokeInfo(pokemonName);
      if (data) {
        AddPokemon(data, true); 
        //console.log('PokemonResults: ', data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const controlarVistaCard = () => {
    if (validView == false){
      return 'Show Card'
    }else if(validView == true){
      return 'Hide Card'
    }
  }

   const BtnShowHide = () => {
    return (
      <button className='hideCard' onClick={()=>comprobarVisibilidad()}>{controlarVistaCard()}</button>
      
    )
   }

  const comprobarVisibilidad = async () => {
    if (!pokemonResultsCard || Object.keys(pokemonResultsCard).length === 0) {
      console.log('No hay nada que mostrar en la card');
    } else {
      setEstadoShowHide(true)
      changeValidView(!validView);
    }
  }

    return (
        <>
          <button className='btnSearch' onClick={ManejarClick}>
            <img src={buscarSvg}/>
          </button>
          {Object.keys(pokemonResultsCard).length != 0 && <BtnShowHide/>}
        </>
  
    )
}

export default SearchPokemon