import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import {useContext, useEffect, useState} from "react";
import {getPokemonDetailsByURL} from "../services/pokemon.service.js";
import {Chip, Grid, Typography} from "@mui/material";
import {addFavorite, isFavorite} from "../services/favorites.service.js";
import {FavoritesContext} from "../App.jsx";
import {addPokemonToMovie} from "../services/addToMovie.js";

// Styles for Modal and its contents
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};

// Styles for content inside Modal
const contentStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: '20px'
};

// Styles for button container
const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  gap: '10px'
};


function ChildModal({ setIsCaught, isCaught, pokemon, pokemonUrl }) {

  // State hooks for managing modal open state and catch attempt status
  const [open, setOpen] = useState(false);
  const [attemptFailed, setAttemptFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setFavourites } = useContext(FavoritesContext);

  // when catch is clicked, disable button. if try again, enable it
  // Asynchronous function simulating catching a Pokemon with 50% success probability
  const catchPokemon = () => {
    return new Promise((resolve, reject) => {

      // 50% chance of success
      const success = Math.random() > 0.5;

      setTimeout(() => {

        // Resolve promise if catch is successful
        if (success) {
          resolve();
        }

        // Reject promise if catch fails
        else {
          reject();
        }

      }, 1000); // Simulated delay of 1 second
    });
  };


  // Function to handle catching Pokemon
  const handleCatch = async () => {
    setIsLoading(true);

    try {

      // Attempt to catch Pokemon
      await catchPokemon();

      // Update favorites list with caught Pokemon
      const newPokemon = {
        id: pokemon.id,
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
        name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
        url: pokemonUrl
      };
      await addFavorite(newPokemon);
      setFavourites(prevFavourites => {
        return [...prevFavourites, newPokemon];
      });

      // Set Pokemon as caught
      setIsCaught(true);

      // Open modal indicating Pokemon was caught
      setOpen(true);

      // Reset attempt failure flag
      setAttemptFailed(false);
    }
    catch (error) {

      // Set attempt failure flag if catch attempt fails
      setAttemptFailed(true);
    }

    setIsLoading(false);
  };


  // Function to handle closing the modal
  const handleClose = () => {
    setOpen(false);
  };


  return (
      <React.Fragment>
        {/* Button text changes based on catch attempt success */}
        { pokemon ?
            <Button disabled={isCaught || isLoading} onClick={handleCatch}>
              {attemptFailed ? "Try Again" : "Catch Pokemon"}
            </Button>
            : <></>
        }
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 200 }}>
            <h2 id="child-modal-title">Pokemon Caught!</h2>
            <p style={{ textAlign: 'center' }}>
              { pokemon?.name.charAt(0).toUpperCase() + pokemon?.name.slice(1) } Was Caught Successfully!
            </p>
            <Button onClick={handleClose}>Back</Button>
          </Box>
        </Modal>
      </React.Fragment>
  );
}


function PokemonDetails({ pokemonUrl, openParentModal, setOpenParentModal }) {

  // Add to movie function, using Web Worker
  // (works fine, but when clicking the "add to movie" button it is not disabled when viewing the details from the favourites' sidebar)
  const [addedToMovie, setAddedToMovie] = useState(false);
  const [addToMovieIsLoading, setAddToMovieIsLoading] = useState(false);

  const handleAddToMovieClick = () => {
    // setting loading = true before calling the async function - just like what we've done in the job interview
    setAddToMovieIsLoading(true);
    try {
        // Create a new worker
        const worker = new Worker(new URL('../services/worker.js', import.meta.url));

        // Handle messages from the worker,
        // happens after finishing executing our addPokemonToMovie function
        worker.onmessage = (event) => {
        const isAdded = event.data;
        setAddedToMovie(isAdded ? true : false);

        // Inform the user about the results
        alert(isAdded ? `The Pokemon ${pokemon.name} Has Been Added To Movie Successfully!` : `Failed To Add The Pokemon ${pokemon.name} To Movie`);

        // Terminate the worker
        worker.terminate();

        // setting loading = false after finishing
        setAddToMovieIsLoading(false);
      };

      // Send data to the worker
      worker.postMessage({
        scriptURL: new URL('../services/addToMovie.js', import.meta.url).href,
        func: addPokemonToMovie.name,
        args: [pokemon.name]
      });
    }

    catch (err){
        console.log(err);
        // if there is an error, set loading = false
        setAddToMovieIsLoading(false);
    }

  }


  // State hooks for managing Pokemon data and caught status
  const [pokemon, setPokemon] = useState(null);
  const [isCaught, setIsCaught] = useState(null);

  // Fetch Pokemon details from API when modal opens or dependency changes
  useEffect(() => {
    async function fetchData() {
      const data = await getPokemonDetailsByURL(pokemonUrl);
      setPokemon(data);

      // Check if Pokemon is already in favorites
      setIsCaught(isFavorite(data));
    }

    if (openParentModal) {
      fetchData();
    }

  }, [openParentModal]);


// Function to handle closing the modal
  const handleClose = () => {
    setOpenParentModal(false);
  };


  return (
      <div>
        <Modal
            open={openParentModal}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
          <Box sx={style}>
            <Box sx={contentStyle}>
              {pokemon ? (
                  <>
                    <Box>
                      <Grid container spacing={30}>
                        <Grid item
                              xs={4}
                              style={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                alignItems: 'center'
                              }}
                        >
                            <img
                                src={pokemon?.sprites?.front_default}
                                alt={pokemon?.name}
                                style={{
                                  width: '200px',
                                  height: '200px'
                                }}
                            />
                        </Grid>
                        <Grid item xs={8}>
                          <Typography id="pokemon-modal-title" variant="h4" component="h2" gutterBottom>
                            Pokemon Info
                          </Typography>
                            <Typography variant="body1" component="p" gutterBottom>
                              Name: {pokemon?.name}
                            </Typography>
                            <Typography variant="body1" component="p" gutterBottom>
                              Height: {pokemon?.height }
                            </Typography>
                            <Typography variant="body1" component="p" gutterBottom>
                              Weight: {pokemon?.weight }
                            </Typography>
                            <Typography variant="body1" component="p" gutterBottom>
                              Abilities:   {pokemon?.abilities?.map((ability) => (
                                <Chip
                                    key={ability.ability.name}
                                    label={ability.ability.name}
                                    color="info"
                                    style={{ margin: '4px' }}
                                />
                            ))}
                            </Typography>
                            <Typography variant="body1" component="p" gutterBottom>
                              Types: {pokemon?.types?.map((type) =>(
                                <Chip
                                    key={type.type.name}
                                    label={type.type.name}
                                    color="success"
                                    style={{ margin: '4px' }}
                                />
                                ))}
                            </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </>
              ) : ( // Display message if Pokemon data is not available
                  <Typography>Loading Pokemon data available.</Typography>
              )}
            </Box>
            <Box sx={buttonContainerStyle}>
              <Button onClick={handleClose}>Back To The List</Button>
              <ChildModal isCaught={isCaught} setIsCaught={setIsCaught} pokemon = { pokemon } pokemonUrl={ pokemonUrl }/>
              <Button onClick={handleAddToMovieClick} disabled={addedToMovie || addToMovieIsLoading}>
                { addToMovieIsLoading ? "In The Process Of Adding Pokemon To Movie.." : addedToMovie ? "Pokemon Added To Movie!" : "Add Pokemon To Movie" }
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
  );
}

export default PokemonDetails;
