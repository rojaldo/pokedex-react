import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pokedex from './components/pokedex/Pokedex';

function App() {
  return (
    <div className="main-container">
      <Pokedex></Pokedex>
    </div>
  );
}

export default App;
