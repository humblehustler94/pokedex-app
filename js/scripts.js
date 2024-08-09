let pokemonRepository = (function() {
    // Define the pokemonList array inside the IIFE
    let pokemonList = [
      { name: 'Bulbasaur', height: '0.7', weight: '6.9', types: ['grass', 'poison'] },
      { name: 'Charizard', height: '1.7', weight: '90.5', types: ['fire', 'flying'] },
      { name: 'Squirtle', height: '0.5', weight: '9', types: ['water'] },
    ];
  
    // Define the getAll function
    function getAll() {
      return pokemonList;
    }
  
    // Define the add function
    function add(pokemon) {
      pokemonList.push(pokemon);
    }
  
    // Return an object with the public functions
    return {
      getAll: getAll,
      add: add
    };
  })();
  
  // Use the getAll method to retrieve and log the list of Pokémon
  pokemonRepository.getAll().forEach(function(pokemon) {
    console.log(pokemon);
  });
  