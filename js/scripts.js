let pokemonRepository = (function () {
    let pokemonList = [
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

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        if (typeof pokemon === 'object' &&
            'name' in pokemon && typeof pokemon.name === 'string' &&
            'height' in pokemon && typeof pokemon.height === 'number' &&
            'weight' in pokemon && typeof pokemon.weight === 'number' &&
            'types' in pokemon && Array.isArray(pokemon.types)) {

            pokemonList.push(pokemon);
        } else {
            console.log('Invalid Pokémon object');
        }
    }
    // function findByName task 2.5
    function findByName(name) {
        return pokemonList.filter(pokemon => pokemon.name.toLowerCase() === name.toLowerCase());
    }
    function addListItem(pokemon){ // function addListItem added in 2.6 creates pokemon list w/ containers wrapped on the outside thanks to button-class -css rule.
        let pokemonList = document.querySelector(".pokemon-list");
        let listItemPokemon = document.createElement("li"); // create li elememnt
        let button = document.createElement("button"); // creates a button
        // set the button text and class
        button.innerText = pokemon.name;
        button.classList.add("button-class"); // targets css rule for style to button.
        //append the button to the list item, and the list item to the list
        listItemPokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
        // add event listener to the button code added as part of 2.6 task.
        button.addEventListener("click",function() {
            showDetails(pokemon); // pass the pokemon object to showDetails
        });
    }
    function showDetails(pokemon) {
        console.log(pokemon);
    }

    return {
        getAll: getAll,
        add: add,
        findByName: findByName,// 2.5 task code.
        addListItem: addListItem, // code added in 2.6 task.
        showDetails: showDetails // code added in 2.6 task.
    };
})();


console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: 'Pikachu', height: 0.4, weight: 6.0, types: ['electric'] }); // added new pokemons to the list

pokemonRepository.add({ name: 'Caterpie', height: 0.3, weight: 2.9, types: ['bug'] });

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);

});


//let foundPokemon = pokemonRepository.findByName('Pikachu');
//console.log(foundPokemon); // This will log the Pikachu object if found

//let foundPoke = pokemonRepository.findByName('Caterpie');
//console.log(foundPoke); // This will log the Caterpie object if found

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
