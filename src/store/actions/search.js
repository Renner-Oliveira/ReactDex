export function toggleShiny(shiny) {
  return {
    type: 'TOGGLE_SHINY',
    shiny
  }
}

export function changeFilter(filter) {
  return {
    type: 'CHANGE_FILTER',
    filter
  }
}