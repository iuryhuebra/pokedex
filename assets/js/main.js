import { getPokemons } from "./poke-api.js";

getPokemons(0)

document.querySelectorAll('.page-control li').forEach((element) => {
    element.onclick = () => {
        document.querySelector('.page-control li.clicked').classList.remove('clicked')
        element.classList.add('clicked')
        const offset = (element.textContent * 20)-20

        document.querySelectorAll('.pokemons li').forEach((element) => {
            element.remove()
        })

        console.log(offset);
        

        getPokemons(offset)
    }
})