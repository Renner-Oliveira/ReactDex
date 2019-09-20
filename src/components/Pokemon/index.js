import React from 'react';

import { Container } from './styles';

export default function Pokemon({ pokemon, shiny, detailed, onClick }) {
  console.log(pokemon)
  return (
    <Container onClick={onClick} detailed={detailed}>
        <header>
            <span>{pokemon.id} -</span>&nbsp;<span>{pokemon.name}</span>
            <img src={`https://www.serebii.net/pokedex-sm/icon/${pokemon.id < 100 ? pokemon.id < 10 ? '00' + pokemon.id : '0' + pokemon.id : pokemon.id}.png`} alt="" />
        </header>
        <div>
            <img src={shiny ? pokemon.sprites.front_shiny ? pokemon.sprites.front_shiny : pokemon.sprites.front_default : pokemon.sprites.front_default} alt="" />
        </div>
        <div className="badges">
            { pokemon.types.map(({type}, index) => <span key={index} className={type.name}>{type.name} </span>) }
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
