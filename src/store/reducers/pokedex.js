const INITIAL_STATE = {
    myPokemon: [],
};

export default function pokemon(state = INITIAL_STATE, action) {
    if(action.type === 'ADD_POKEMON') {
        if(state.myPokemon.filter(p => p.id === action.pokemon.id).length === 0) {
            return {...state, myPokemon: [...state.myPokemon, action.pokemon] }
        }
    }
    if(action.type === 'REMOVE_POKEMON') {
        return {...state, myPokemon: state.myPokemon.filter(p => p.id !== action.pokemon.id) }
    }
    return state;
}