export function getPokemon(quantidade) {
  return {
    type: 'ASYNC_GET_POKEMON',
    payload: {
        quantidade
    }
  }
}

export function toNextPage() {
   return {
     type: 'NEXT_PAGE'
   }
 }

export function toPrevPage() {
  return {
    type: 'PREV_PAGE'
  }
}
export function resetPage() {
   return {
     type: 'RESET_PAGE'
   }
}