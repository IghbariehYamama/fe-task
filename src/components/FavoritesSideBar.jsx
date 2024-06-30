import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import PokemonCard from "./PokemonCard.jsx";
import {useContext} from "react";
import {FavoritesContext} from "../App.jsx";


function FavoritesSideBar() {

  // Accessing favorites state from context using useContext hook
  const { favourites } = useContext(FavoritesContext);


  return (
      <Box sx={{
        flexGrow: 1,
        backgroundColor: '#EEEDEB',
        height: 'calc(100vh - 50px)',
        position: 'fixed',
        top: 50,
        left: 0,
        width: '25%',
        padding: 2,
        boxSizing: 'border-box',
        overflowY: 'auto'
      }}>
        <Grid container spacing={2}>
          {
            // Mapping through each favorite Pokemon item to display as a PokemonCard component
            favourites?.map((favouriteItem) => (
              <Grid item xs={6} key={favouriteItem.id}>
                  <PokemonCard favourite={ true } pokemon={ favouriteItem }/>
              </Grid>
            ))
          }
        </Grid>
      </Box>
  );
}

export default FavoritesSideBar;
