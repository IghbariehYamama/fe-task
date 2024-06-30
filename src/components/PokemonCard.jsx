import {Card, CardActionArea, CardContent, CardMedia, Grid, Paper, styled, Typography} from "@mui/material";
import * as React from "react";
import PokemonDetails from "./PokemonDetails.jsx";
import Button from "@mui/material/Button";
import {deleteFavorite} from "../services/favorites.service.js";
import {useContext} from "react";
import {FavoritesContext} from "../App.jsx";


// Styling the Paper component as Item using styled from Material-UI
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

function PokemonCard({ favourite, pokemon }) {

    // State to manage modal open/close state
    const [openParentModal, setOpenParentModal] = React.useState(false);
    const { setFavourites } = useContext(FavoritesContext);

    // Function to handle removal of a favorite Pokemon
    const handleRemove = async () => {
        try {
            // Remove the Pokemon from the favorites list
            await deleteFavorite(pokemon);
            setFavourites((prevFavourites) =>
                prevFavourites.filter((fav) => fav.id !== pokemon.id)
            );

        }
        catch (error) {
            console.error(error)
        }
    };


    // Function to handle modal open
    const handleOpen = () => {
        setOpenParentModal(true);
    };


    // Conditionally set maximum width and maximum height based on whether the card is a favorite
    const maxWidth = favourite ? '100%' : 180;
    const maxHeight = favourite ? 250 : 230;

    return (
            <Grid item>
              <Item>
                  <Card sx={{ width: maxWidth, height: maxHeight }} cols={3} rowHeight={164}>
                    <CardActionArea onClick={ handleOpen }>
                      <CardMedia
                          component="img"
                          height="140"
                          image={ pokemon?.img }
                          alt= { pokemon?.name }
                          sx={{
                            objectFit: 'contain'
                          }}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          { pokemon?.name }
                        </Typography>
                        <Typography variant="body2" color="text.secondary" style={{ marginBottom: '-20px' }}>
                          { pokemon?.id }
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                      {   // Renders remove button only if the Pokemon is a favorite
                          favourite && (
                          <Button onClick={handleRemove} color="warning">
                              Remove
                          </Button>
                      )}
                  </Card>
                <PokemonDetails pokemonUrl={ pokemon.url } openParentModal={ openParentModal } setOpenParentModal={ setOpenParentModal }/>
              </Item>
            </Grid>
  );
}


export default PokemonCard;