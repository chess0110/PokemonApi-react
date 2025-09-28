import { useState } from 'react'
import './App.css'
//import buscarSvg from './assets/buscarSvg.svg'
import SearchPokemon from './components/SearchPokemon.jsx'
import PokemonList from './components/PokemonList.jsx'
import backArrow from './assets/back_arrow.svg'
import forwardArrow from './assets/forward_arrow.svg'
import ViewPokemonDetails from './components/ViewPokemonDetails.jsx'

function App() {
  const [PokemonListed, setPokemonListed] = useState(0)
  const [PokemonResults, setPokemonResults] = useState({})
  const [ValidPokemon, setValidPokemon] = useState(false)
  const [InputPokemon, setInputPokemon] = useState('')

  const ManejarEntrada = (e)=>{setInputPokemon(e.target.value)}



  const AddPokemonCard = (dataPokemon, validData) => {
    setPokemonResults(dataPokemon)
    setValidPokemon(validData)
    //console.log('Agregando pokemon al Card', dataPokemon)
    if(dataPokemon == false){
      setValidPokemon(false)
    }
  }

  const goBackList = () => {
    //console.log(`Listado Offset: ${PokemonListed}`);
    (PokemonListed>=50) && setPokemonListed(PokemonListed-50)
  }
  const goForwardList = () => {
    setPokemonListed(PokemonListed+50)
    //console.log(`Listado Offset: ${PokemonListed}`);
  }

  return (
    <>
      <main>
        <header>
          <div>
            <img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="pokeapi img"/>
          </div>
          <h1>Find your Pokemon</h1>
        </header>

        <div className='pokeMain'>
          <menu>
            <input type="text" id='pokeName' onChange={ManejarEntrada}/>
            <SearchPokemon AddPokemon={AddPokemonCard} pokemonName={InputPokemon} changeValidView={setValidPokemon} validView={ValidPokemon} pokemonResultsCard={PokemonResults}/>
          </menu>

          {ValidPokemon && <ViewPokemonDetails data={PokemonResults}/>}      
          
          <section className='pokeList'>
            <div className='arrowControls'>
              <button onClick={goBackList}><img src={backArrow}/></button>
              <button onClick={goForwardList}><img src={forwardArrow}/></button>          
            </div>

            <PokemonList idOffset={PokemonListed} AddPokemon={AddPokemonCard}/>

            <div className='arrowControls'>
              <button onClick={goBackList}><img src={backArrow}/></button>
              <button onClick={goForwardList}><img src={forwardArrow}/></button>          
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

export default App
