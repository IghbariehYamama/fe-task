
export async function getFavorites() {
  return new Promise((resolve) => {
    const favorites = localStorage.getItem("favorites");
    setTimeout(() => {
      resolve(JSON.parse(favorites) || []);
    }, 500);
  });
}

export async function addFavorite(pokemon) {

  // Add the pokemon to the favorites list
    return new Promise((resolve) => {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const newFavorites = [...favorites, pokemon];
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
        setTimeout(() => {
            resolve(newFavorites);
        }, 500);
    });
}


export function isFavorite(pokemon) {

  // Check if the pokemon is in the favorites list
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    return favorites.some(fav => fav.id === pokemon.id);

}


export async function deleteFavorite(pokemon) {

    // Delete the pokemon from the favorites list
    return new Promise((resolve) => {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const newFavorites = favorites.filter((fav) => fav.id !== pokemon.id)
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
        setTimeout(() => {
            resolve(newFavorites);
        }, 500);
    });
}
