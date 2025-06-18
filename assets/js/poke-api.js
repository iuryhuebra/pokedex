import { offset } from "./main.js"

export let limit = document.getElementById('limit').value


document.getElementById('limit').onchange = () => {    
    limit = document.getElementById('limit').value
    getPokemons(offset)
}

function converterPokemonLi(pokemonDetail) {
    const id = pokemonDetail.id
    const name = pokemonDetail.name
    const type1 = pokemonDetail.types[0].type.name
    const img = pokemonDetail.sprites.front_default

    return `
        <li class="pokemon ${type1}" id="${id}">
            <span class="number" id="${name}Id">#${String(id).padStart(3, 0)}</span>
            <span class="name">${name}</span>

            <div class="detail">
                <ol class="types">
                    ${
                        pokemonDetail.types.map(({type}, index) => {
                            if (index > 1) return `<li class="type"></li>`
                            return `<li class="type">${type.name}</li>`
                        }).join('')
                    }
                </ol>
                <img src="${img}" id="${name}Img" alt="${name}">
            </div>
        </li>
    `
}
  
export async function getPokemons(offset) {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    const response = await fetch(url)
    const responseJson = await response.json()
    const pokemons = responseJson.results
    const pokemonList = document.getElementById('pokemonList');

    document.querySelectorAll('.pokemons li').forEach((element) => {
        element.remove()
    })
    
    const pokemonsDetails = await Promise.all(
        pokemons.map((pokemon) => (
            fetch(pokemon.url)
            .then((response) => response.json())
            .then((pokemonDetail) => {
                    return pokemonDetail
                })
        )))
    
    pokemonsDetails.forEach((detail) => {
        pokemonList.innerHTML += converterPokemonLi(detail)
    })
    
}