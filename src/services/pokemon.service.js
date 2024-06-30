
// Function to fetch the list of Pokemon from the API
export async function getPokemons() {
    try{
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/")
        const data = await response.json()

        // Iterate over each Pokemon in the results and modify the data
        data.results.map((pokemon, index) => {

            // Assign an ID based on the index (1-based)
            pokemon.id = index + 1;

            // Construct the image URL using the Pokemon ID
            pokemon.img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;

            // Capitalize the first letter of the Pokemon's name
            pokemon.name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            });

        return data.results
    }

    catch (error){
        console.error(error);
    }

}

// Function to fetch the details of a Pokemon by its URL
export async function getPokemonDetailsByURL(url) {
  // Fetch the pokemon details from according to the url given in the list of pokemons
  // Transform the data to only include to include only the id, name, relevant sprites, types, weight, height, and abilities.

    try{
        const response = await fetch(url)
        const data = await response.json()

        // Extract and return relevant details from the fetched data
        return {
            id: data.id,
            name: data.name,
            sprites: data.sprites,
            types: data.types,
            weight: data.weight,
            height: data.height,
            abilities: data.abilities
        }
    }
    catch (error){
        console.error(error);
    }

}
