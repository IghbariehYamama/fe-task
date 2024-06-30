import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {useContext} from "react";
import {FavoritesContext} from "../App.jsx";

export default function Header() {

    // Using useContext to access the favourites state from FavoritesContext
    const { favourites } = useContext(FavoritesContext);

    return (
        <Box>
            <AppBar>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Pokedox
                    </Typography>
                    <Typography variant="h6" component="div">
                        Favourites: {favourites.length}
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}