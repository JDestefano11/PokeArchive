const pokemonList = [
    { name: 'Bulbasaur', height: 0.7, types: ['Grass', 'Poison'] },
    { name: 'Ivysaur', height: 1, types: ['Grass', 'Poison'] },
    { name: 'Venusaur', height: 2, types: ['Grass', 'Poison'] },
    { name: 'Charmander', height: 0.6, types: ['Fire'] },
    { name: 'Charmeleon', height: 1.1, types: ['Fire'] },
    { name: 'Charizard', height: 1.7, types: ['Fire', 'Flying'] },
    { name: 'Squirtle', height: 0.5, types: ['Water'] },
    { name: 'Wartortle', height: 1, types: ['Water'] },
    { name: 'Blastoise', height: 1.6, types: ['Water'] },
]


for (let i = 0; i < 8; i++) {
    const pokemon = pokemonList[i];
    const message = pokemon.height > 1.7 ? ' - Wow, that\'s big!' : '';

    document.write(`${pokemon.name} (height: ${pokemon.height})${message}<br>`);
}


