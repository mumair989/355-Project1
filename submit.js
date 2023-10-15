// Get form data
const form = document.querySelector('form');
const formData = new FormData(form);

// Map form data to JSON object
const pet = {
  id: Date.now(),
  name: formData.get('name'),
  email: formData.get('email'),
  phone: formData.get('phone'),
  pet_name: formData.get('pet_name'),
  species: formData.get('species'),
  description: formData.get('description'),
  photo: formData.get('photo')
};

// Fetch JSON file and append new pet object
fetch('pets.json')
  .then(response => response.json())
  .then(data => {
    const jsonData = data || []; // Initialize with an empty array if 'pets.json' is empty or doesn't exist
    jsonData.push(pet);

    // Stringify array back to JSON
    const updatedJson = JSON.stringify(jsonData);

    // Save updated JSON data back to 'pets.json'
    fetch('animals.json', {
      method: 'PUT', // This will not work without a server-side handler
      body: updatedJson
    })
      .then(() => {
        // Redirect to index.html
        window.location.href = 'index.html';
      })
      .catch(error => {
        console.error('Error saving data:', error);
        // Handle the error gracefully
      });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    // Handle the error gracefully
  });
