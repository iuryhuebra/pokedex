import { getPokemons, limit } from "./poke-api.js";

export let offset = 0

getPokemons(0)

document.querySelectorAll('.page-control li').forEach((element) => {
    element.onclick = () => {
        document.querySelector('.page-control li.clicked').classList.remove('clicked')
        element.classList.add('clicked')
        offset = (element.textContent * limit) - limit

        getPokemons(offset)
    }
})

