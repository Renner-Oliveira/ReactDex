import React, { useState, useEffect } from 'react';
import { MdArrowForward, MdArrowBack } from 'react-icons/md';

import Pokeapi from '../../services/api';
import Pokemon from '../Pokemon';

import { Container } from './styles';
import pokeballLoad from '../../styles/pokeball-load.png'

export default function List() {

  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [shiny, setShiny] = useState(false);
  const [filtro, setFiltro] = useState('');
  const [evolutionList, setEvolutionList] = useState([]);

  const pokemonNext = () => {

    async function getNextPage() {
      setLoading(true);

      if(!nextUrl || nextUrl === 'type') {
        let data = await Pokeapi.GetPokemonList(32);
        setPokemons(data.results);
        setNextUrl(data.next);
      } else {
        let data = await Pokeapi.GetResource(nextUrl);
        setPokemons(data.results);
        setNextUrl(data.next);
        setPrevUrl(data.previous);
      }

      setLoading(false);
    } 

    getNextPage();
  }

  function pokemonPrev() {
    
    async function getPrevPage() {
      setLoading(true);
      let data = await Pokeapi.GetResource(prevUrl);
      setPokemons(data.results);
      setPrevUrl(data.previous);
      setNextUrl(data.next);
      
      setLoading(false);
    }

    getPrevPage();
  }

  function pesquisarPokemon(filtro, evolutions = false) {
    async function getPokemon() {
      if(filtro) {
        let data = await Pokeapi.GetPokemon(filtro, evolutions);
        if(data) {
          await getAllEvolution(data.data);
          setPokemons([data.data]);
          setPrevUrl('');
          setNextUrl('');
        } else {
          if(!nextUrl || nextUrl === 'type') {
            pokemonNext();
          }
        }
      } else {
        if(!nextUrl || nextUrl === 'type') {
          pokemonNext();
        }
      }
      setLoading(false);
    }
    getPokemon();
  }

  function pesquisarPokemonByTipo(filtro) {
    async function getPokemon() {
      if(nextUrl !== 'type') {
        setLoading(true);
      }
      let data = await Pokeapi.GetPokemonListByType(filtro);

      if(data.length > 0) {
        setPokemons(data);
        setPrevUrl('type');
        setNextUrl('type');
      }
      setLoading(false);
    }
    if(filtro) {
      getPokemon();
    }
  }

  function handleChange(event) {

    const types = ['water','bug','dark','dragon','electric','fairy','fighting','fire','flying','ghost','grass','ground','ice','normal','poison','psychic','rock','steel'];
    
    let filtro = event.target.value.toLowerCase().split(' ')[0];

    setFiltro(event.target.value);

    if(types.includes(filtro)) {
      pesquisarPokemonByTipo(filtro);
    } else {
      pesquisarPokemon(filtro, true);
    }

    if(event.target.value.toLowerCase() === "shiny") {
      setShiny(!shiny);
    } else {
      if(event.target.value.toLowerCase().split(' ')[1] === "shiny") {
        setShiny(true);
      } else {
        setShiny(false);
      }
    }
  }

  function detailPokemon(name) {
    setFiltro(name);
    pesquisarPokemon(name, true);
  }

  async function getAllEvolution(pokemon) {
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
    setLoading(true);

    pokemonNext();
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      { loading && <div id="load"><img src={pokeballLoad} alt="" /></div>}

      <div id="filtro">
        <input id="filtroInput" value={filtro} onChange={handleChange} placeholder="Pesquisar por Nome, Numero ou Tipo" />
      </div>
      <div id="pokemonList">
        {pokemons.map((pokemon, index) => pokemon.sprites.front_default && <Pokemon key={index} pokemon={pokemon} shiny={shiny} onClick={ () => detailPokemon(pokemon.name) } detailed={pokemons.length === 1} />  )}
      </div>
      { pokemons.length === 1 &&
        <div id="evolutionList">
          {evolutionList.map((evolution, index) => <Pokemon key={index} pokemon={evolution.data} shiny={shiny} onClick={ () => detailPokemon(evolution.data.name) } detailed={false} />)}
        </div>
      }
      <div id="paginacao">
        {(prevUrl && prevUrl !== 'type') && <button onClick={pokemonPrev}><MdArrowBack size={26}></MdArrowBack></button>}
        {(nextUrl && nextUrl !== 'type') && <button onClick={pokemonNext}><MdArrowForward size={26}></MdArrowForward></button>}
      </div>
    </Container>
  );
}
