import { takeEvery, put, call } from 'redux-saga/effects';

import PokeApi from '../services/api'

function* asyncGetPokemon(action) {
    const response = yield call([PokeApi, PokeApi.GetPokemonList], action.payload.quantidade );
    yield put({ type: "GET_POKEMON", payload: { pokemons: response.results } });
}

export default function* root() {
    yield takeEvery("ASYNC_GET_POKEMON", asyncGetPokemon);
}