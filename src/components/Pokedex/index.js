import React, { useRef, useEffect } from 'react';

import { useDrop } from 'react-dnd'

import * as PokedexActions from '../../store/actions/pokedex';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Container } from './styles';
import Pokemon from '../Pokemon';

const Pokedex = ({addPokemon, pokemon}) => {

  const ref = useRef();

  const [, dropRef] = useDrop({
    accept: 'POKEMON',
    drop(item) {
      addPokemon({...item.pokemon, pokedex: true});
    }
  });

  useEffect(() => {
      // eslint-disable-next-line
  }, []);

  dropRef(ref);

  return (
    <Container ref={ref}>
        <header id="pokedexHeader">
          <h3>Minha Pokedex</h3>
        </header>
        <div id="myPokemon">
          {
            pokemon.length === 0 && <center>Arraste e solte um pokémon para adicionar!</center>
          }
          {
            pokemon.map(pokemon => 
                <Pokemon key={pokemon.id} pokemon={pokemon} shiny={false} detailed={false} />
            )
          }
        </div>
    </Container>
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(PokedexActions, dispatch);

const mapStateToProps = state => ({
  pokemon: state.pokedex.myPokemon.sort((a, b) => a.id - b.id),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pokedex)
