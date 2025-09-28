async function GetPokeInfo(pokemonName) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const info = await res.json();

    return {
      name: pokemonName,
      id: info.id,
      sprite: info.sprites.other.home.front_default,
      height: info.height,
      weight: info.weight,
      types: info.types.map(t => t.type.name),
      abilities: info.abilities.map(a => a.ability.name),
      stats: info.stats.map(s => ({
        name: s.stat.name,
        base: s.base_stat
      }))
    };
  } catch (error) {
    console.error('Error al obtener los datos del Pokémon:', error);
    return null;
  }
}

export default GetPokeInfo;
