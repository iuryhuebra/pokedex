
let limit = document.getElementById('limit').value
let offset = 0

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
                ${img ? `<img src="${img}" id="${name}Img" alt="${name}">` : ''}
            </div>
        </li>
    `
}

function createPageList(value) {
    const li = document.createElement('li')
    li.textContent = value
    return li
}

function addEventsPageControl() {
    document.querySelectorAll('.page-control li').forEach((element) => {
        element.onclick = () => {
            document.querySelector('.page-control li.clicked').classList.remove('clicked')
            element.classList.add('clicked')
            offset = (element.textContent * limit) - limit
    
            getPokemons(offset)
        }
    })
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
    
    const pageSelected = Number(document.querySelector('.clicked').textContent) ?? 1
    
    document.querySelectorAll('.page-control li').forEach((element) => element.remove())
    const pageLimit = Math.ceil(responseJson.count / limit)
    let pages = Array.from({ length: pageLimit }, (_, i) => i + 1)
    const pageControl = document.querySelector('.page-control')
    let pageLi

    pages.forEach((page) => {
        switch (page) {
            case pageSelected:
                pageLi = createPageList(page)                
                pageLi.classList.add('clicked')
                break
            
            case 1:
                pageLi = createPageList(page)
                break
                
            case pageLimit:
                pageLi = createPageList(page)
                break
            
            case pageSelected - 1:
                pageLi = createPageList(page)                
                break
            
            case pageSelected - 2:
                pageLi = createPageList(page)                
                break
            
            case pageSelected + 1:
                pageLi = createPageList(page)                
                break
            
            case pageSelected + 2:
                pageLi = createPageList(page)                
                break

            default:
                break
        }
        
        pageControl.appendChild(pageLi)
    })
    
    
    addEventsPageControl()
}