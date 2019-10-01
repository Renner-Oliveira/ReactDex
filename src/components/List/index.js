import React, { useRef, useState, useEffect } from 'react';
import { MdArrowForward, MdArrowBack } from 'react-icons/md';

import { useDrop } from 'react-dnd'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as SearchActions from '../../store/actions/search';
import * as PokemonActions from '../../store/actions/pokemon';
import * as PokedexActions from '../../store/actions/pokedex';

import Pokeapi from '../../services/api';
import Pokemon from '../Pokemon';

import { Container } from './styles';
import pokeballLoad from '../../styles/pokeball-load.png'

const List = ({ resetPage, toggleShiny, changeFilter, getPokemon, removePokemon, toPrevPage, toNextPage, filter, filteredPokemons, pokemons, loading, actualPage, nextPage }) => {

  const [evolutionList, setEvolutionList] = useState([]);
  const [details, setDetails] = useState(false);

  const ref = useRef();

  const [, dropRef] = useDrop({
    accept: 'POKEMON',
    drop(item) {
      console.log(item)
      if (item.pokemon.pokedex) {
        removePokemon(item.pokemon);
      }
    }
  });

  dropRef(ref);

  const getAllPokemon = () => {
    getPokemon(64);
    getPokemon(964);
  }

  function pokemonNext() {
    toNextPage();
  }

  function pokemonPrev() {
    toPrevPage();
  }

  function handleChange(event) {
 
    let filtro = event.target.value.toLowerCase();

    if(event.target.value.toLowerCase().includes("details")) {
      setDetails(true);
    } else {
      setDetails(false);
    }

    if(event.target.value.toLowerCase().includes("shiny")) {
      toggleShiny(true);
    } else {
      toggleShiny(false);
    }

    if("details".includes(filtro)) {
      filtro = filtro.replace("details", "")
    }

    if("shiny".includes(filtro)) {
      filtro = filtro.replace("shiny", "")
    }

    changeFilter(filtro);
    resetPage();
  }

  async function getAllEvolution(pokemon) {
    const pokemonWithEvolutions = await Pokeapi.GetPokemon(pokemon.name, true);
    pokemon = pokemonWithEvolutions.data;
    console.log(pokemon);
    if(pokemon.species.evolution_chain.chain.species.name) {
      if(evolutionList.length) {
        if(pokemon.species.evolution_chain.chain.species.name !== evolutionList[0].data.name) {
          evolutionList.length = 0;
        }
      }
      if(!evolutionList.length) {
        let firstEvolution = await Pokeapi.GetPokemon(pokemon.species.evolution_chain.chain.species.name);
        let newArray = evolutionList;
        newArray.push(firstEvolution);
        setEvolutionList(Array.from(newArray));

        if(pokemon.species.evolution_chain.chain.evolves_to.length > 0) {

          let hasNext = true;
          
          let evolves_to = pokemon.species.evolution_chain.chain.evolves_to;
          
          do {
            let evolution = await getNextEvolution(evolves_to);
  
            if(Object.keys(evolution.next).length) {
              evolves_to = evolution.next;
            } else {
              hasNext = false;
            }
            
          } while (hasNext);
        }
      }
    }
  }

  async function getNextEvolution(evolves_to) {
    let pokemon = {};
    let next = {};

    for(let i = 0; i < evolves_to.length; i++) {
      if(evolves_to[i].species.name) {
        pokemon = await Pokeapi.GetPokemon(evolves_to[i].species.name);
        let newArray = evolutionList;
        newArray.push(pokemon);
        setEvolutionList(Array.from(newArray));
      }
    }

    if(evolves_to.length > 0) {
      if(evolves_to[0].evolves_to.length > 0) {
        next = evolves_to[0].evolves_to;
      } else {
        next = {};
      }
    } else {
      if(evolves_to.evolves_to.length > 0) {
        console.log(evolves_to.evolves_to)
        next = evolves_to.evolves_to;
        console.log(next)
      } else {
        next = {};
      }
    }
    

    return {
      pokemon,
      next
    }
    
  }

  useEffect(() => {
    if(pokemons.length === 0) {
      getAllPokemon();
    }
    if(filteredPokemons.length === 1) {
      getAllEvolution(filteredPokemons[0]);
    }
    // eslint-disable-next-line
  });

  return (
    <Container ref={ref}>
      { loading && <div id="load"><img src={pokeballLoad} alt="" /></div>}

      <div id="filtro">
        <input id="filtroInput" value={filter} onChange={handleChange} placeholder="Pesquisar por Nome, Numero ou Tipo" />
      </div>
      <div id="pokemonList">
        {filteredPokemons.slice(actualPage, nextPage).map((pokemon, index) => <Pokemon key={index} pokemon={pokemon} detailed={filteredPokemons.length === 1 || details} />  )}
      </div>
      { filteredPokemons.length === 1 &&
        <div id="evolutionList">
          {evolutionList.map((evolution, index) => <Pokemon key={index} pokemon={evolution.data} detailed={false} />)}
        </div>
      }
      <div id="paginacao">
        {!(actualPage === 0) && <button onClick={pokemonPrev}><MdArrowBack size={26}></MdArrowBack></button>}
        {!(filteredPokemons.slice(actualPage, nextPage).length < 32) && <button onClick={pokemonNext}><MdArrowForward size={26}></MdArrowForward></button>}
      </div>
    </Container>
  );
}

function mapStateToProps(state) {
  const {filter} = state.search;
  const {pokemons} = state.pokemon;

  return {
    filteredPokemons: pokemons.filter(
      p => filter.includes(p.name) || 
      p.name.includes(filter) || 
      (p.types.every(t => filter.includes(t.type.name)) && filter.split('&').length < 3) || 
      (p.types.some(t => filter.includes(t.type.name)) && !filter.includes('&'))
    ),
    loading: state.pokemon.loading,
    actualPage: state.pokemon.actualPage,
    nextPage: state.pokemon.nextPage,
    filter,
    pokemons
  }

}

const mapDispatchToProps = dispatch =>  
  bindActionCreators(Object.assign({}, SearchActions, PokemonActions, PokedexActions), dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(List);