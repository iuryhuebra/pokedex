function converterPokemonLi(pokemon, index, types) {
    return `
        <li class="pokemon" id="${index}">
            <span class="number" id="${pokemon.name}Id"></span>
            <span class="name">${String(pokemon.name)}</span>

            <div class="detail">
                <ol class="types">
                    <li class="type" id="typeOne${index}"></li>
                    <li class="type" id="typeTwo${index}"></li>
                </ol>
                <img src="" id="${pokemon.name}Img" alt="${pokemon.name}">
            </div>
        </li>
    `
}
  
export async function getPokemons(offset) {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`
    const response = await fetch(url)
    const responseJson = await response.json()
    const pokemons = responseJson.results
    const pokemonList = document.getElementById('pokemonList');
    
    pokemons.map((pokemon, index) => {
        index++
        const pokemonHtml = converterPokemonLi(pokemon, index)
        pokemonList.innerHTML += pokemonHtml
        fetch(pokemon.url)
            .then((response) => response.json())
            .then((pokemonDetail) => {
                const typeOne = document.getElementById(`typeOne${index}`)
                typeOne.classList.add(pokemonDetail.types[0].type.name)
                typeOne.innerText = pokemonDetail.types[0].type.name
                
                const typeTwo = document.getElementById(`typeTwo${index}`)
                if (pokemonDetail.types.length === 1) {
                    typeTwo.remove()

                } else {
                    typeTwo.classList.add(pokemonDetail.types[1].type.name)
                    typeTwo.innerText = pokemonDetail.types[1].type.name
                }

                const pokemonId = document.getElementById(pokemon.name + 'Id')
                pokemonId.innerText = '#' + String(pokemonDetail.id).padStart(3, 0)

                const pokemonImg = document.getElementById(pokemon.name + 'Img')
                pokemonImg.setAttribute('src', pokemonDetail.sprites.front_default)
            })
    })
}

