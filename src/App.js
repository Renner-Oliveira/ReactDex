import React from 'react';
import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend'

import Header from './components/Header';
import Panel from './components/Panel';

import store from './store'

import GlobalStyle from './styles/global.js';

function App() {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <Header/>
        <Panel/>

        <GlobalStyle/>
      </DndProvider>
    </Provider>
  );
}

export default App;
