let pokemonRepository = (function () {
    let repository = [
        {
            name: "Bulbasaur",
            height: 0.7,
            types: ["grass", "poison"],
        },
        {
            name: "Charizard",
            height: 1.7,
            types: ["fire", "flying"],
        },
        {
            name: "Squirtle",
            height: 1,
            types: ["water"],
        },
    ];

    function add(pokemon) {
        if (
            typeof pokemon === "object" &&
            "name" in pokemon &&
            "height" in pokemon &&
            "types" in pokemon
        ) {
            repository.push(pokemon);
        } else {
            console.log("pokemon is not correct");
        }
    }
    function findByName(name) { // code done in 2.5 task
        return repository.filter(pokemon => pokemon.name.toLowerCase() === name.toLowerCase());
    }
    function getAll() {
        return repository;
    }
    function addListItem(pokemon) { // code added in 2.6
        let pokemonList = document.querySelector(".pokemon-list");
        let listpokemon = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
    }
    return {
        add: add,
        findByName: findByName, // code from 2.5
        getAll: getAll,
        addListItem: addListItem // code added in 2.6
    };
})();

// added new pokemons to the list
console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: "Pikachu", height: 0.3, types: ["electric"] });
//pokemonRepository.add({ name: 'Caterpie', height: 0.3, weight: 2.9, types: ['bug'] });



//let foundPokemon = pokemonRepository.findByName('Pikachu');
//console.log(foundPokemon); // This will log the Pikachu object if found

//let foundPoke = pokemonRepository.findByName('Caterpie');
//console.log(foundPoke); // This will log the Caterpie object if found


// Iterating over the pokemonList using the getAll function and forEach
/*
pokemonRepository.getAll().forEach(pokemon => { // 2.5 code

    let message = `${pokemon.name} (height: ${pokemon.height})`;
    if (pokemon.height > 1.5) {
        message += " - Wow, that's big!";
    }
    document.write(message + '<br>');
});
*/


console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);

});
