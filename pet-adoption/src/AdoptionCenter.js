import React, { useState, useEffect } from 'react';
import PetForm from './PetForm';
import AnimalAdoption from './AnimalAdoption';
import { initialPets } from './initialPets'; 

function AdoptionCenter() {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        const storedPets = localStorage.getItem('pets');
    
        if (storedPets) {
            setPets([...initialPets, ...JSON.parse(storedPets)]);
        } else {
            setPets(initialPets);
        }
    }, []);

    const addPet = (newPet) => {
        const newPets = [...pets, newPet];
        setPets(newPets);
        localStorage.setItem('pets', JSON.stringify(newPets.slice(initialPets.length)));
    };

    return (
        <div>
            <AnimalAdoption pets={pets} />
            <PetForm addPet={addPet} />
        </div>
    );
}

export default AdoptionCenter;
