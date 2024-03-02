let pokemonRepository = (function () {

    let pokemonList = [];

    // API url for the pokemon 
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function printPokemonDetails(pokemon) {
        console.log(pokemon.name + '  Height: ' + pokemon.height + '  Types: ' + pokemon.types.join(', '));
    }

    // Returns all pokemon in the array
    function getAll() {
        return pokemonList;
    }

    // Adds a pokemon to the pokemonList 
    function add(pokemon) {
        if (typeof pokemon === 'object' && 'name' in pokemon && 'detailsUrl' in pokemon) {
            pokemonList.push(pokemon);
        } else {
            console.error('Invalid pokemon object');
        }
    }

    // Shows pokemon details
    function showDetails(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
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

        // Add event listener to the button
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
    }

    // Load Pokémon list from external API
    function loadList() {
        return fetch(apiUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                data.results.forEach(function (result) {
                    const pokemon = {
                        name: result.name,
                        detailsUrl: result.url,
                    };
                    add(pokemon);
                });
            })
            .catch(function (error) {
                console.error('Error loading Pokémon list', error);
            });
    }

    // Load Pokémon details from external API
    function loadDetails(pokemon) {
        return fetch(pokemon.detailsUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                pokemon.imgUrl = data.sprites.front_default;
                pokemon.height = data.height;
                // You can add more details as needed
            })
            .catch(function (error) {
                console.error('Error loading details for ' + pokemon.name, error);
            });
    }

    return {
        getAll: getAll,
        add: add,
        printPokemonDetails: printPokemonDetails,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails
    };


    // IFIE
})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

