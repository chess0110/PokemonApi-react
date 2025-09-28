import './ViewPokeDetailsStyle.css'
import {useState, useEffect} from 'react'

function ViewPokemonDetails({ data }) {
    const [PokemonColor, setPokemonColor] = useState('')

    if (!data) return null;

    useEffect(() => {
    async function getPokemonColors() {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${data.name}`);
        const dataColor = await res.json();
        const baseColor = dataColor.color.name;
        const colorMap = {
        red: '#f08080',
        blue: '#87cefa',
        green: '#98fb98',
        yellow: '#fffacd',
        brown: '#deb887',
        purple: '#dda0dd',
        pink: '#ffc0cb',
        gray: '#d3d3d3',
        black: '#a9a9a9',
        white: '#f5f5f5'
        };
        const softColor = colorMap[baseColor] || '#ccc';
        setPokemonColor(softColor);
    }

    getPokemonColors();
    }, [data]);



  return (
    <div
    className="pokemonDetail"
    style={{
        backgroundColor: PokemonColor,
        boxShadow: `0px 0px 20px 0px ${PokemonColor}`
    }}>     
      <section>
        <h2 id='name'>{data.name} (#{data.id})</h2>
        <img src={data.sprite} alt={data.name} />
        <p><strong>Altura:</strong> {data.height / 10} m</p>
        <p><strong>Peso:</strong> {data.weight / 10} kg</p>
        <p><strong>Tipos:</strong> {data.types.join(', ')}</p>
        <p><strong>Habilidades:</strong></p> 
        <ul><li>{data.abilities.join(', ')}</li></ul>
        <p><strong>Estadísticas:</strong></p>
        <ul>
            {data.stats.map(stat => (
            <li key={stat.name}>
                {stat.name}: {stat.base}
            </li>
            ))}
        </ul>        
      </section>

    </div>
  );
}

export default ViewPokemonDetails;
