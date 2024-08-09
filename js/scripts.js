let pokemonRepository = (function () {
    let pokemonList = [
        { name: 'Bulbasaur', height: '0.7', weight: '6.9', types: ['grass', 'poison'] },
        { name: 'Charizard', height: '1.7', weight: '90.5', types: ['fire', 'flying'] },
        { name: 'Squirtle', height: '0.5', weight: '9', types: ['water'] },
    ];

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        if (typeof pokemon === 'object' && 'name' in pokemon && 'height' in pokemon && 'weight' in pokemon && 'types' in pokemon) {
            pokemonList.push(pokemon);
        } else {
            console.log('Invalid Pokémon object');
        }
    }

    return {
        getAll: getAll,
        add: add
    };
})();

pokemonRepository.getAll().forEach(pokemon => {
    let message = `${pokemon.name} (height: ${pokemon.height})`;
    if (pokemon.height > 1.5) {
        message += " - Wow, that's big!";
    }
    document.write(message + '<br>');
});
