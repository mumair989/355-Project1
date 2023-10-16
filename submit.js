// Get form data
// const form = document.querySelector('form');
// const formData = new FormData(form);

// // Map form data to JSON object
// const pet = {
//   id: Date.now(),
//   name: formData.get('name'),
//   email: formData.get('email'),
//   phone: formData.get('phone'),
//   pet_name: formData.get('pet_name'),
//   species: formData.get('species'),
//   description: formData.get('description'),
//   photo: formData.get('photo')
// };

// // Fetch JSON file and append new pet object
// fetch('pets.json')
//   .then(response => response.json())
//   .then(data => {
//     const jsonData = data || []; // Initialize with an empty array if 'pets.json' is empty or doesn't exist
//     jsonData.push(pet);

//     // Stringify array back to JSON
//     const updatedJson = JSON.stringify(jsonData);

//     // Save updated JSON data back to 'pets.json'
//     fetch('animals.json', {
//       method: 'PUT', // This will not work without a server-side handler
//       body: updatedJson
//     })
//       .then(() => {
//         // Redirect to index.html
//         window.location.href = 'index.html';
//       })
//       .catch(error => {
//         console.error('Error saving data:', error);
//         // Handle the error gracefully
//       });
//   })
//   .catch(error => {
//     console.error('Error fetching data:', error);
//     // Handle the error gracefully
//   });







  const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/submit') {
    let data = '';

    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', () => {
      const formData = qs.parse(data);

      // Create an object with the form data
      const petData = {
        name: formData.pet_name,
        species: formData.species,
        birthYear: formData.pet_age,
        description: formData.description,
        photo: formData.photo,
      };

      // Read existing data from the JSON file (if any)
      let jsonData = [];
      try {
        const existingData = fs.readFileSync('pet_data.json', 'utf8');
        jsonData = JSON.parse(existingData);
      } catch (error) {
        // Handle the case where the JSON file doesn't exist yet
      }

      // Add the new pet data to the existing data
      jsonData.push(petData);

      // Write the updated data back to the JSON file
      fs.writeFileSync('pet_data.json', JSON.stringify(jsonData, null, 2), 'utf8');

      // Respond with a success message
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Form data submitted successfully.');

      console.log('Form data submitted:', petData);
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
