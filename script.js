document.addEventListener("DOMContentLoaded", function() {
  const pokemonList = document.getElementById("pokemonList");
  const pokemonDetails = document.getElementById("pokemonDetails");

  fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
    .then(response => response.json())
    .then(data => {
      const pokemonArray = data.results;
      pokemonArray.forEach(pokemon => {
        const listItem = document.createElement("li");
        const pokemonName = document.createElement("span");
        pokemonName.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        const pokemonImage = document.createElement("img");
        const pokemonId = pokemon.url.split("/")[6];
        pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
        listItem.appendChild(pokemonImage);
        listItem.appendChild(pokemonName);
        listItem.addEventListener("click", function() {
          fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            .then(response => response.json())
            .then(data => {
              const details = `
                <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
                <img src="${data.sprites.front_default}" alt="${data.name}">
                <ul>
                  <li>Height: ${data.height / 10} m</li>
                  <li>Weight: ${data.weight / 10} kg</li>
                  <li>Abilities:</li>
                  <ul>
                    ${data.abilities.map(ability => `<li>${ability.ability.name}</li>`).join('')}
                  </ul>
                </ul>
              `;
              pokemonDetails.innerHTML = details;
            })
            .catch(error => {
              console.error("Error fetching Pokémon details:", error);
            });
        });
        pokemonList.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error("Error fetching Pokémon list:", error);
    });
});

