import React, { useRef } from 'react';
import { useDrag } from 'react-dnd'

import * as SearchActions from '../../store/actions/search';
import * as PokemonActions from '../../store/actions/pokemon';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Container } from './styles';

const Pokemon = ({ pokemon, shiny, detailed, changeFilter, resetPage, filter }) => {

  const ref = useRef();

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'POKEMON', pokemon: pokemon },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  function detailPokemon(name) {
    changeFilter(name + " ");
    resetPage();
  }

  function searchType(type) {
    if(isKeyDown('Control') && isKeyDown('Alt')) {
      changeFilter(filter.length === 0 ? type.name + " " : filter += "& " + type.name + " ");
    } else if(isKeyDown('Control')) {
      changeFilter(filter.length === 0 ? type.name + " " : filter += type.name + " ");
    } else {
      changeFilter(type.name + " ");
    }
    resetPage();
  }
  //ok

  let isKeyDown = (() => {
      let state = {};

      window.addEventListener('keyup', (e) => state[e.key] = false);
      window.addEventListener('keydown', (e) => state[e.key] = true);

      return (key) => (state.hasOwnProperty(key) && state[key]) || false;
  })();

  dragRef(ref);

  return (
    <Container ref={ref} isDragging={isDragging} detailed={detailed}>
      <div className="pokemon-detail" onClick={() => { detailPokemon(pokemon.name) }}>
        <header>
            <span>{pokemon.id} -</span>&nbsp;<span>{pokemon.name}</span>
            <img src={`https://www.serebii.net/pokedex-sm/icon/${pokemon.id < 100 ? pokemon.id < 10 ? '00' + pokemon.id : '0' + pokemon.id : pokemon.id}.png`} alt="" />
        </header>
        <div className="pokemon-sprite">
            { pokemon.sprites.front_default && <img src={shiny ? pokemon.sprites.front_shiny ? pokemon.sprites.front_shiny : pokemon.sprites.front_default : pokemon.sprites.front_default} alt="" /> }
            { !pokemon.sprites.front_default && <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" style={{ filter: 'grayscale(100%) blur(1px)', opacity: '0.3' }} alt="" /> }
        </div>
      </div>
        <div className="badges">
            { pokemon.types.map(({type}, index) => <span key={index} onClick={() => { searchType(type) }} className={type.name}>{type.name} </span>) }
        </div>
        {detailed && 
          <div>
            <br/>
            <p>
              <b>Height: </b>{pokemon.height} | <b>Weight: </b>{pokemon.weight}
            </p>
            <br/>
            <p>
              <b>Stats:</b>
            </p>
            <ul>
              {pokemon.stats.map((stat, index) => 
                <li key={index}>
                  -<b style={{textTransform: 'capitalize'}}>{stat.stat.name.replace('-', ' ')}: </b>{stat.base_stat}
                </li>
              )}
            </ul>
            <br/>
            <p>
              <b>Abilities:</b>
            </p>
            <ul>
              {pokemon.abilities.map((ability, index) => 
                <li key={index}>
                  -<span style={{textTransform: 'capitalize'}}>{ability.ability.name.replace('-', ' ')} <span>{ability.is_hidden ? '(Hidden)' : ''}</span> </span>
                </li>
              )}
            </ul>
          </div>
        }
    </Container>
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(Object.assign({}, SearchActions, PokemonActions), dispatch);

const mapStateToProps = state => ({
  shiny: state.search.shiny,
  filter: state.search.filter,
});

export default connect(mapStateToProps, mapDispatchToProps)(Pokemon);
