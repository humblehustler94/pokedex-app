let pokemonRepository = (function () {

    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    // comment out the following code - no longer needed after task 2.10 remove old modal content
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

    // function to add a new Pokemon object to the list
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

    // function to retrieve all pokemon from the list
    function getAll() {
        return pokemonList;
    }

    // function to load the Pokemon list from the API
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
                    //console.log(pokemon);
                    // removes logging pokemon in console
                });
            })
            .catch(function (e) {
                hideLoadingMessage(); // hide loading if an error occurs
                console.error(e);
            });
    }

    // function to load Pokemon details 
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
                // new code here to display pokemon types
                //pokemon.types = details.types;
                pokemon.types = [];
                details.types.forEach(function (typeArray) {
                    pokemon.types.push(typeArray.type.name)
                });
            })
            .catch(function (e) {
                hideLoadingMessage(); // hide loading if an error occurs 
                console.error(e);
            });
    }

    // function to show Pokemon details 
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
            // console.log(pokemon);
        });
    }

    // add new function showModal(pokemon) here to display pokemon detials
    // refactor code 2.10 for bootstrap modal
    // function to display Pokemon details in a Bootstrap modal
    // revision per mentor request
    function showModal(pokemon) {

        let modalTitle = document.querySelector('.modal-title');
        let modalBody = document.querySelector('.modal-body');

        modalTitle.innerText = pokemon.name;
        modalBody.innerText = ''; // clears previous modal content

        //modalContainer.innerHTML = ''; // clears previous content

        let imageElement = document.createElement('img');
        imageElement.classList.add('modal-img');
        imageElement.src = pokemon.imageUrl;
        imageElement.alt = pokemon.name + 'image';

        let heightElement = document.createElement('p');
        heightElement.innerText = 'Height:' + pokemon.height;

        let typesElement = document.createElement('p');
        typesElement.innerText = 'Types:' + pokemon.types.join(',');

        // append new elements
        modalBody.appendChild(imageElement);
        modalBody.appendChild(heightElement);
        modalBody.appendChild(typesElement);

        // bootstrap modal display
        $('#pokemonModal').modal('show');


        // add the new modal content here
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

    }

    // add new function 2.8
    function hideModal() {
        modalContainer.classList.remove('is-visible');

        if (dialogPromiseRejects) {
            dialogPromiseRejects();
            dialogPromiseRejects = null;
        }
    }

    // add new code 2.8
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    // modalContainer.addEventListener('click', (e) =>
    modalContainer.addEventListener('click', (e) => {
        if (e.target === modalContainer) {
            hideModal();
        }
    });


    // 2.5 bonus task function findByName
    // function to find Pokemon by name
    function findByName(name) {
        return pokemonList.filter(pokemon => pokemon.name.toLowerCase() === name.toLowerCase());
    }


    // refactor code 2.10 
    // function to add a Pokemon item to the list
    // revision per mentor request 
    function addListItem(pokemon) { // function addListItem added in 2.6 creates pokemon list w/ containers wrapped on the outside thanks to button-class -css rule.
        let pokemonList = document.querySelector(".pokemon-list");

        let listItem = document.createElement("li");
        listItem.classList.add('list-group-item');
        // add rest of the listItem content here 


        let button = document.createElement("button"); // creates a button
        // set the button text and class
        button.innerText = pokemon.name;
        button.classList.add("btn, btn-primary"); // targets css rule for style to button. // changed no longer targets css rule for style to button

        
        //append the button to the list item, and the list item to the list
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);

        // add event listener to the button code added as part of 2.6 task.
        button.addEventListener("click", function () {
            showDetails(pokemon); // pass the pokemon object to showDetails
        });
    }



    return {

        add: add,
        getAll: getAll,
        addListItem: addListItem, // 2.6 task code
        loadList: loadList, // 2.7 task code
        loadDetails: loadDetails, // 2.7 task code
        showDetails: showDetails, // 2.7 task code
        showModal: showModal, // 2.8
        hideModal: hideModal, //2.8
        findByName: findByName // 2.5 task code

    };

})();




// 2.7 task code
// created this new function in 2.7 to add the list items to the page
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});



