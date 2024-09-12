let pokemonRepository = (function () {

    let repository = [
        { name: 'Bulbasaur', height: '0.7', weight: '6.9', types: ['grass', 'poison'] },
        { name: 'Charizard', height: '1.7', weight: '90.5', types: ['fire', 'flying'] },
        { name: 'Squirtle', height: '0.5', weight: '9', types: ['water'] },
    ];

    function getAll() {
        return repository;
    }

    function add(pokemon) {
        if (typeof pokemon === 'object' &&
            'name' in pokemon && typeof pokemon.name === 'string' &&
            'height' in pokemon && typeof pokemon.height === 'number' &&
            'weight' in pokemon && typeof pokemon.weight === 'number' &&
            'types' in pokemon && Array.isArray(pokemon.types)) {

            repository.push(pokemon);
        } else {
            console.log('Invalid Pokémon object');
        }
    }

    function findByName(name) {
        return repository.filter(pokemon => pokemon.name.toLowerCase() === name.toLowerCase());
    }

    return {
        getAll: getAll,
        add: add,
        findByName: findByName
    };


})();


// added new pokemons to the list
pokemonRepository.add({ name: 'Pikachu', height: 0.4, weight: 6.0, types: ['electric'] });

pokemonRepository.add({ name: 'Caterpie', height: 0.3, weight: 2.9, types: ['bug'] }); // n


let foundPokemon = pokemonRepository.findByName('Pikachu');
console.log(foundPokemon); // This will log the Pikachu object if found

let foundPoke = pokemonRepository.findByName('Caterpie');
console.log(foundPoke); // This will log the Caterpie object if found


// Iterating over the pokemonList using the getAll function and forEach
/*
pokemonRepository.getAll().forEach(pokemon => {

    let message = `${pokemon.name} (height: ${pokemon.height})`;
    if (pokemon.height > 1.5) {
        message += " - Wow, that's big!";
    }
    document.write(message + '<br>');
    

});
*/

// refactor the code above to the new code below 2.6 

pokemonRepository.getAll().forEach(function (pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = "placeholder";
    button.classList.add("button-class"); // add styles.css code for button
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);

});

// this code so far shows placeholder buttons in button list order.


