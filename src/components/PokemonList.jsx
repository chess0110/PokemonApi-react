import { useEffect, useState } from 'react';
import GetPokemon from './GetPokemon.jsx';
import GetPokeInfo from './GetPokeInfo.jsx';
import ViewPokemonDetails from './ViewPokemonDetails.jsx';
import './PokemonListStyle.css';

function PokemonList({ idOffset, AddPokemon}) {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonSprites, setPokemonSprites] = useState({});
  const [PokemonAllData, setPokemonAllData] = useState({})
  const [selectedPokemon, setSelectedPokemon] = useState(null);




  useEffect(() => {
    async function fetchData() {
      const data = await GetPokemon(idOffset);
      setPokemonList(data.results);
    }
    fetchData();
  }, [idOffset]);


    useEffect(() => {
    async function fetchSprites() {
        const spriteData = await Promise.all(
        pokemonList.map(pokemon => GetPokeInfo(pokemon.name))
        );

        const spriteMap = {};
        spriteData.forEach(({ name, sprite }) => {
        spriteMap[name] = sprite;
        });

        setPokemonAllData(spriteData);
        setPokemonSprites(spriteMap);
    }

    if (pokemonList.length > 0) {
        fetchSprites();
    }
    }, [pokemonList]);


  //console.log(PokemonAllData)
  return (
    <div className='pokemonListAdding'>
      <ul>
        {pokemonList.map((pokemon, index) => (
          <li key={index}>
            <button value={pokemon.name} onClick={() => {
            const selected = PokemonAllData.find(
              p => p.name === pokemon.name);
            setSelectedPokemon(selected);AddPokemon(selected,true)}}>              
                <img
                src={pokemonSprites[pokemon.name]}
                alt={pokemon.name}
                width={80}
                height={80}
              />
              <p>{pokemon.name}</p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PokemonList;
