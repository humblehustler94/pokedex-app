let pokemonRepository = (function () {

    //2.7 connecting to the API
    // remove items within []
    // add let apiUrl 
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    // remove height, weight, types from code

    function add(pokemon) {
        if (typeof pokemon === 'object' &&
            'name' in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log('Invalid Pokémon object');
        }
    }

    // function findByName task 2.5
    function findByName(name) {
        return pokemonList.filter(pokemon => pokemon.name.toLowerCase() === name.toLowerCase());
    }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) { // function addListItem added in 2.6 creates pokemon list w/ containers wrapped on the outside thanks to button-class -css rule.
        let pokemonList = document.querySelector(".pokemon-list");
        let listItemPokemon = document.createElement("li"); // create li elememnt
        let button = document.createElement("button"); // creates a button
        // set the button text and class
        button.innerText = pokemon.name;
        button.classList.add("button-class"); // targets css rule for style to button.
        //append the button to the list item, and the list item to the list
        listItemPokemon.appendChild(button);
        pokemonList.appendChild(listItemPokemon);
        // add event listener to the button code added as part of 2.6 task.
        button.addEventListener("click", function () {
            showDetails(pokemon); // pass the pokemon object to showDetails
        });
    }

    // 2.7 code add loadList() function
    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                console.log(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        });
    }

    // add loadDetails () function
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    // function showDetails task 2.6
    // 2.7 new code added inside function
    // loadDetails(pokemon).then(function() {
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
    }

    return {
        add: add,
        findByName: findByName, // 2.5 task code
        getAll: getAll,
        addListItem: addListItem, // 2.6 task code
        loadList: loadList,// 2.7 task code recently added
        loadDetails: loadDetails, // 2.7 task code recently added
        showDetails: showDetails // 2.6 task code
    };

})();


//console.log(pokemonRepository.getAll());
/*
pokemonRepository.add({ name: 'Pikachu', height: 0.4, weight: 6.0, types: ['electric'] }); // added new pokemons to the list

pokemonRepository.add({ name: 'Caterpie', height: 0.3, weight: 2.9, types: ['bug'] });
*/

//console.log(pokemonRepository.getAll());


// 2.7 task code
// created this new function in 2.7 to add the list items to the page
pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
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


// implement loadList and loadDetails functions

