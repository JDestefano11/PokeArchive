let pokemonRepository = (function () {

    let pokemonList = [
        { name: 'Bulbasaur', height: 0.7, types: ['Grass', 'Poison'] },
        { name: 'Ivysaur', height: 1, types: ['Grass', 'Poison'] },
        { name: 'Venusaur', height: 2, types: ['Grass', 'Poison'] },
        { name: 'Charmander', height: 0.6, types: ['Fire'] },
        { name: 'Charmeleon', height: 1.1, types: ['Fire'] },
        { name: 'Charizard', height: 1.7, types: ['Fire', 'Flying'] },
        { name: 'Squirtle', height: 0.5, types: ['Water'] },
        { name: 'Wartortle', height: 1, types: ['Water'] },
        { name: 'Blastoise', height: 1.6, types: ['Water'] },
    ];

    function printPokemonDetails(pokemon) {
        console.log(pokemon.name + '  Height: ' + pokemon.height + '  Types: ' + pokemon.types.join(', '));
    }

    // Returns all pokemon in the array
    function getAll() {
        return pokemonList;
    }

    // Adds a pokemon to the pokemonList 
    function add(pokemon) {
        if (typeof pokemon === 'object' && 'name' in pokemon && 'height' in pokemon && 'types' in pokemon) {
            pokemonList.push(pokemon);
        } else {
            console.error('Invalid pokemon object');
        }
    }

    // Adds a list item for a pokemon to the pokemonListItems
    function addListItem(pokemon) {
        let pokemonListItems = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokemon-button');
        listItem.appendChild(button);
        pokemonListItems.appendChild(listItem);
    }

    return {
        getAll: getAll,
        add: add,
        printPokemonDetails: printPokemonDetails,
        addListItem: addListItem
    };

    // IFIE
})();

pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});

