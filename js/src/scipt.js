let pokemonRepository = (function () {

    let pokemonList = [];

    // API url for the pokemon 
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    // Adds a list item for a pokemon to the pokemonListItems
    function addListItem(pokemon) {
        let pokemonListItems = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('btn', 'btn-primary', 'mb-2');
        button.setAttribute('data-target', '#exampleModal');
        button.setAttribute('data-toggle', 'modal');
        listItem.appendChild(button);
        pokemonListItems.appendChild(listItem);

        // Add event listener to the button
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
    }
    // Load Pokémon list from external API
    function loadList() {
        return fetch('https://pokeapi.co/api/v2/pokemon/?limit=150')
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
                pokemon.types = data.types;
                pokemon.weight = data.weight;
                pokemon.abilities = data.abilities;
                // You can add more details as needed
            })
            .catch(function (error) {
                console.error('Error loading details for ' + pokemon.name, error);
            });
    }

    function showModal(pokemon) {
        let modalContainer = document.querySelector('#modal-container');

        // Clear existing content inside of modal
        modalContainer.innerHTML = '';

        // Modal 
        let modal = document.createElement('div');
        modal.classList.add('modal');

        // Close modal button
        let closeButton = document.createElement('button');
        closeButton.classList.add('close-modal');
        closeButton.innerText = 'Close';
        closeButton.addEventListener('click', hideModal);

        // Modal content
        let modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        let pokemonName = document.createElement('h2');
        pokemonName.innerText = pokemon.name;

        let pokemonHeight = document.createElement('p');
        pokemonHeight.innerText = 'Height: ' + pokemon.height;

        let pokemonTypes = document.createElement('p');
        pokemon.innerText = ' Types ' + pokemon.types;

        let pokemonImage = document.createElement('img');
        pokemonImage.src = pokemon.imgUrl;
        pokemonImage.alt = pokemon.name;
        pokemonImage.classList.add('pokemon-image');

        // Adds each piece of content to the modals content
        modalContent.appendChild(pokemonName);
        modalContent.appendChild(pokemonHeight);
        modalContent.appendChild(pokemonImage);
        modalContent.appendChild(closeButton);

        // Add the modal to the container & content to the modal
        modal.appendChild(modalContent);
        modalContainer.appendChild(modal);


        // Close modal using ESC key
        window.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                hideModal();
            }
        });

        // Close modal clicking outside of it 
        window.addEventListener('click', function (event) {
            if (event.target === modalContainer) {
                hideModal();
            }
        });
        modalContainer.classList.add('is-visible');
    }

    // Function to hide modal 
    function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    }

    // Shows modal containing the pokemon & pokemons information
    function showModal(pokemon) {
        let modalBody = document.querySelector('.modal-body');
        let modalTitle = document.querySelector('.modal-title');

        modalTitle.innerText = pokemon.name;
        modalBody.innerHTML = '';


        let imageElement = document.createElement('img');
        imageElement.classList.add('modal-img');
        imageElement.src = pokemon.imgUrl;
        imageElement.alt = 'Image of ' + pokemon.name;
        modalBody.appendChild(imageElement);



        // Adding types to element 
        let typesText = pokemon.types.map(function (type) {    // Map: Used to iterate over each item of an array
            return type.type.name;
        }).join('');                   // Join: links elements of an array into a single string

        // Creating height element
        let heightElement = document.createElement('p');
        heightElement.innerText = 'Height: ' + pokemon.height;
        modalBody.appendChild(heightElement);

        // Creating weight element
        let weightElement = document.createElement('p');
        weightElement.innerText = 'Weight ' + pokemon.weight;
        modalBody.appendChild(weightElement);

        // Creating types element
        let typesElement = document.querySelector('p');
        typesElement.innerText = 'Types: ';
        modalBody.appendChild(typesElement);

        // Adding types to types element
        pokemon.types.forEach(function (type) {
            let typeElement = document.createElement('span');
            typeElement.innerText = type.type.name;
            typesElement.appendChild(typeElement);
        });

        // Creating abilities element
        let abilitiesElement = document.createElement('p');
        abilitiesElement.innerText = 'Abilities: ';
        modalBody.appendChild(abilitiesElement);

        // Adding abilities to abilities element 
        pokemon.abilities.forEach(function (ability) {
            let abilityElement = document.createElement('span');
            abilityElement.innerText = ability.ability.name;
            abilitiesElement.appendChild(abilityElement);

        });
    }

    // Function to hide modal 
    function hideModal() {
        let modal = document.querySelector('#exampleModal');
        modal.classList.remove('show');
    }
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
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


