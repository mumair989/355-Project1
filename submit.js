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

      // Assuming you want to store pet data in a JSON file
      const petData = {
        name: formData.pet_name,
        species: formData.species,
        birthYear: formData.pet_age,
        description: formData.description,
        photo: formData.photo,
      };

      // Load existing data from the JSON file (if any)
      let jsonData = [];
      try {
        const existingData = fs.readFileSync('animals.json', 'utf8');
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
