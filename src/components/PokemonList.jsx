import {useEffect, useState} from "react";
import {getPokemons} from "../services/pokemon.service.js";
import PokemonCard from "./PokemonCard.jsx";
import {Grid} from "@mui/material";

function PokemonList() {

  // State to hold the list of pokemons fetched
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    async function fetchData() {

      // Fetching the list of pokemons using getPokemons function
      const data = await getPokemons();
      await setPokemons(data);
    }

    // Fetch data when component mounts
    fetchData();

  }, []);


  return (
      <>
    {
      /* Implement the  PokemonList view. Use the PokemonCard component to show each Pokemon in the list */

      <Grid container spacing={2} style={{ marginLeft: 6 }}>
        {
          // Mapping over the 'pokemons' array to render each PokemonCard component
          pokemons.map((pokemon) => (
            <PokemonCard favourite={ false } key={pokemon.url} pokemon={pokemon} />
          ))}
      </Grid>
    }
      </>
  );
}

export default PokemonList;
