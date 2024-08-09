let pokemonList = [
    {name: 'Bulbasaur', height: '0.7', types: ['grass', 'poison']},
    {name: 'Charizard', height: '1.7', types: ['fire', 'flying']},
    {name: 'Squirtle', height: '0.5', types:['water']},
];

for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height > 1.5) {
        document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')' + ' - Wow, that\'s big!' + '<br>');
    } else {
        document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')' + '<br>');

        