export function addPokemon(pokemon) {
  return {
    type: 'ADD_POKEMON',
    pokemon
  }
}

export function removePokemon(pokemon) {
  return {
    type: 'REMOVE_POKEMON',
    pokemon
  }
}