import React from 'react';
import './App.css';
import PetForm from './PetForm';
import AnimalAdoption from './AnimalAdoption';
import { initialPets } from './initialPets';

function App() {
  return (
    <div>
      <AnimalAdoption pets={initialPets} />
      <PetForm />
    </div>
  );
}

export default App;
