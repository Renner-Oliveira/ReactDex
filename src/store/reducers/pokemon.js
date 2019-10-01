const INITIAL_STATE = {
    loading: true,
    actualPage: 0,
    nextPage: 32,
    pageSize: 32,
    pokemons: [],
};

export default function pokemon(state = INITIAL_STATE, action) {
    if(action.type === 'GET_POKEMON') {
        return {...state, pokemons: action.payload.pokemons, loading: false }
    }
    if(action.type === 'NEXT_PAGE') {
        return {...state, actualPage: state.actualPage + state.pageSize, nextPage: state.nextPage + state.pageSize }
    }
    if(action.type === 'PREV_PAGE') {
        return {...state, actualPage: state.actualPage - state.pageSize, nextPage: state.nextPage - state.pageSize }
    }
    if(action.type === 'RESET_PAGE') {
        return {...state, actualPage: 0, nextPage: 32}
    }
    return state;
}