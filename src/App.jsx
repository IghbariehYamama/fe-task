import PokemonList from "./components/PokemonList.jsx";
import Header from "./components/Header.jsx";
import FavoritesSideBar from "./components/FavoritesSideBar.jsx";
import {Grid, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {createContext, useEffect, useState} from "react";
import {getFavorites} from "./services/favorites.service.js";


// Creating a context for managing favorites across components
export const FavoritesContext = createContext();

function App() {

    // State to manage list of favorite Pokemon
    const [favourites, setFavourites] = useState([])

    useEffect(() => {

        // Effect to load favorites from local storage on initial mount
        async function fetchFavorites() {
            const storedFavourites = await getFavorites();
            setFavourites(storedFavourites);
        }

        fetchFavorites();
    }, []);



    {
        /* Add the main app content here - side panel, main view (list vs details) and header */}
  return (

          <FavoritesContext.Provider value={{ favourites, setFavourites }}>
          <Header/>
          <Box mt={10} px={2}>
              <Grid container spacing={2}>
                  <Grid item xs={3}>
                      <FavoritesSideBar favourites={ favourites }/>
                  </Grid>
                  <Grid item xs={9}>
                      <Box textAlign="center">
                          <Typography variant="h3" gutterBottom>
                              Welcome to Pokedox with Healthy.io!
                          </Typography>
                          <Typography variant="body1" paragraph>
                              Explore and catch Pokemon with our Pokedox! Click on each Pokemon
                              to view detailed information and, even better, try to catch it! :)
                          </Typography>
                          <Typography variant="body1" paragraph>
                              Use the sidebar to manage your caught Pokemon and easily access their details.
                              Your caught Pokemons are automatically saved, so you can pick up where you left off anytime.
                          </Typography>
                      </Box>
                      <PokemonList/>
                  </Grid>
              </Grid>
          </Box>
          </FavoritesContext.Provider>
  );
}

export default App;
