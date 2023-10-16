import React, { useState, useEffect } from 'react';
import './FormStyle.css';
import { initialPets } from './initialPets';

function PetForm({ addPet }) {
  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    species: '',
    birthYear: '',
    description: ''
  });
  
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const storedPets = localStorage.getItem('pets');
    
    if (storedPets) {
      // Combine predefined data with stored data
      setPets([...initialPets, ...JSON.parse(storedPets)]);
    } else {
      setPets(initialPets);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Log formData to see the data being added
    console.log('formData:', formData);
  
    if (!formData.name || !formData.species || !formData.description) {
      alert("Please fill out the name, species, and description fields at least.");
      return;
    }
  
    const newPets = [...pets, formData];
    setPets(newPets);
  
    // Store only the new pets in local storage (without the predefined data)
    localStorage.setItem('pets', JSON.stringify(newPets.slice(initialPets.length)));
    
    addPet(formData);

    // Clear form data after submission
    setFormData({
      name: '',
      photo: '',
      species: '',
      birthYear: '',
      description: ''
    });
  };  

  return (
    <div style={{background: "linear-gradient(to left, rgb(204, 0, 255), #0059ff)", color: "white", fontWeight: "bold"}}>
      <form onSubmit={handleSubmit} style={{maxWidth: "500px", margin: "0 auto", padding: "20px", borderRadius: "8px", background: "linear-gradient(to left, rgb(238, 197, 248), #2a3852)"}}>
        
        <fieldset>
          <legend>About You</legend>

          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required onChange={handleChange} value={formData.name} />

          {/* You can add more fields for email and phone here if needed. */}
        </fieldset>
        
        <fieldset>
          <legend>About Your Pet</legend>

          <label htmlFor="pet_name">Pet's Name:</label>
          <input type="text" id="pet_name" name="pet_name" required onChange={handleChange} value={formData.name} />

          <label htmlFor="species">Species:</label>
          <select id="species" name="species" required onChange={handleChange} value={formData.species}>
            <option value="">--Please choose--</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="rabbit">Rabbit</option>
          </select>

          <label htmlFor="pet_age">Pet's Birth Year:</label>
          <input type="text" id="pet_age" name="birthYear" required onChange={handleChange} value={formData.birthYear} />

          <label htmlFor="description">Pet Description:</label>
          <textarea id="description" name="description" required onChange={handleChange} value={formData.description}></textarea>

          {/* Note: We're not handling file uploads in this example, so this field won't store the photo. */}
          <label htmlFor="photo">Upload Photo:</label>
          <input type="file" id="photo" name="photo" accept="image/*" />
        </fieldset>

        <button type="submit">Submit</button>
        {/* The "Cancel" button redirects to the homepage. This requires React Router to work in a React app, but I'll leave the basic structure here. */}
        <button type="button"><a href="/">Cancel</a></button>
      </form>
      
      <h2>Stored Pets</h2>
      <ul>
        {pets.map((pet, index) => (
          <li key={index}>
            <strong>{pet.name}</strong> ({pet.species}) - {pet.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PetForm;