import React from 'react';

import List from '../List/index'

import { Container } from './styles';
import Pokedex from '../Pokedex';

export default function Panel() {
  return (
    <Container>
        <List/>
        <Pokedex/>
    </Container>
  );
}
