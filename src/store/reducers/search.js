const INITIAL_STATE = {
    shiny: false,
    filter: '',
    detailed: false,
};

export default function search(state = INITIAL_STATE, action) {
    if(action.type === 'TOGGLE_SHINY') {
        return {...state, shiny: action.shiny }
    }
    if(action.type === 'CHANGE_FILTER') {
        return {...state, filter: action.filter }
    }
    return state;
}