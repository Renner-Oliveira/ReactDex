import React, { useState, useEffect } from 'react';

import Pokeapi from '../../services/api';

import { Container } from './styles';
import Pokemon from '../Pokemon';

export default function Pokedex() {

    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {

        getPokemon(1);
        console.log(pokemon)
        // eslint-disable-next-line
    }, []);

    function getPokemon(id) {
        async function get(id) {
            const { data } = await Pokeapi.GetPokemon(id);
            console.log(data)
            setPokemon([data]);
        }

        get(id);
    }

    return (
      <Container>
          <header id="pokedexHeader">
            <h3>Minha Pokedex</h3>
          </header>
          { 
            pokemon.map(poke => 
                <Pokemon pokemon={poke} shiny={false} detailed={false} />
            )
          }
      </Container>
    );
}
