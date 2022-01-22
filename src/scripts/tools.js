function findPokemonByName (pokemonToFind) {
    let i = 0;
    while (i <= POKEDEX.length) {
        if (pokemonToFind === POKEDEX[i].name) {
            return POKEDEX[i];
        } else { i++; }
    }
}