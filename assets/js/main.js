const offset = 0;
const limit = 1;
const pokemonList = document.getElementById('pokemonList');

function converterPokemonLi(pokemon) {
    return `
        <li class="pokemon">
            <span class="number">#001</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    <li class="type">Grass</li>
                    <li class="type">Poison</li>
                </ol>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png" alt="${pokemon.name}">
            </div>
        </li>
    `
}

pokeApi.getPokemons().then((pokemons) => {
    pokemonList.innerHTML += pokemons.map(converterPokemonLi).join('');
})