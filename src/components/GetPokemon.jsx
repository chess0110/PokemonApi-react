
async function GetPokemon(idOffsetApi){
    try{
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${idOffsetApi}`)
        const data = await res.json()
        //console.log(data)
        return data
    }catch (error){
        console.error('Error al obtener los datos:', error)
    }
}

export default GetPokemon