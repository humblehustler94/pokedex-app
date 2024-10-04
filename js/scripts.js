let pokemonRepository = (function () {

    // empty array to store pokemon - 2.7
    // connect to an external API - 2.7
    // apply modal container to the pokemon list - 2.8
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    // new code for modal & dialog - 2.8
    let modalContainer = document.querySelector('#modal-container');
    let dialogPromiseRejects; // this can be set later, by showDialog

    // function to show a loading message
    function showLoadingMessage() {
        let loadingMessage = document.createElement('p');
        loadingMessage.innerText = 'Loading...';
        loadingMessage.classList.add('loading-message');
        document.querySelector('.pokemon-list').appendChild(loadingMessage);
    }

    // function to hide a loading message
    function hideLoadingMessage() {
        let loadingMessage = document.querySelector('.loading-message');
        if (loadingMessage) {
            loadingMessage.remove();
        }
    }

    // 2.7 refactor code to remove  height, weight, types
    // 2.8 refactor code 
    function add(pokemon) {
        if (typeof pokemon === 'object' &&
            'name' in pokemon &&
            'detailsUrl' in pokemon // new line of code.
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log('Invalid Pokémon object');
        }
    }
    // move function getAll() here
    function getAll() {
        return pokemonList;
    }

    // move function loadList here

    // 2.7 code add loadList() function
    // refactor code to use showLoadingMessage() and hideLoadingMessage()
    function loadList() {
        showLoadingMessage(); // show loading before starting the fetch
        return fetch(apiUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                hideLoadingMessage(); // hide loading after the data is complete
                json.results.forEach(function (item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url
                    };
                    add(pokemon);
                    console.log(pokemon);
                });
            })
            .catch(function (e) {
                hideLoadingMessage(); // hide loading if an error occurs
                console.error(e);
            });
    }

    // move function loadDetails here
    // 2.7 add loadDetails () function
    // refactor code to use showLoadingMessage() and hideLoadingMessage()
    function loadDetails(pokemon) {
        showLoadingMessage(); // show loading when fetching details 
        let url = pokemon.detailsUrl;
        return fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (details) {
                hideLoadingMessage(); // hide loading after the details are fetched
                // Now we add the details to the item
                pokemon.imageUrl = details.sprites.front_default;
                pokemon.height = details.height;
                pokemon.types = details.types;
            })
            .catch(function (e) {
                hideLoadingMessage(); // hide loading if an error occurs 
                console.error(e);
            });
    }

    // move function showDetails here
    // function showDetails task 2.6
    // 2.7 new code added inside function showDetails
    // code was refactored.
    // loadDetails(pokemon).then(function() {
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
           // console.log(pokemon);
        });
    }

    // add function showModal(pokemon) here to display pokemon detials
    




    // 2.5 bonus task function findByName
    function findByName(name) {
        return pokemonList.filter(pokemon => pokemon.name.toLowerCase() === name.toLowerCase());
    }


    // 2.7 move this function addListItem(pokemon) up here under function getAll()
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
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
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

