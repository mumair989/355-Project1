const petPromise = await fetch("animals.json")
const pets = await petPromise.json()
// Arup Changes
/*
fetch('pets.json')
  .then(response => response.json())
  .then(data => {
    // data contains the parsed JSON
  });
  const submissions = data.submissions;
  submissions.forEach(sub => {

    const petHTML = `
      <div class="pet">
        <h2>${sub.petName}</h2>
        <img src="${sub.petImg}" alt="${sub.petName} image">
        <p>${sub.petDescription}</p>
        <p>Submitted by ${sub.name}</p>
      </div>
    ;
  
    document.querySelector('.pet-list').innerHTML += petHTML;
  
  });
// -- Arup changes ends
*/

const template = document.querySelector("#animal-card")
const wrapper = document.createElement("div")

function getAge(age) {
    if(age == 0){
        return "Less than a year old"
    }

    return age > 1 ? `${age} years old` : "1 year old"
}

pets.forEach(pet => {
    const clone = template.content.cloneNode(true)
    clone.querySelector("h3").textContent = pet.name
    
    const img = clone.querySelector("img")
    img.src = pet.photo
    img.alt = `A ${pet.species} named ${pet.name}`

    const age = new Date().getFullYear() - pet.birthYear
    const ageText = getAge(age)
    clone.querySelector(".age").textContent = ageText
    clone.querySelector(".species").textContent = pet.species
    clone.querySelector(".description").textContent = pet.description
    clone.querySelector(".name").textContent = pet.name

    wrapper.appendChild(clone)

});

document.querySelector(".animals").appendChild(wrapper)

const filterButton = document.querySelectorAll(".filter-nav a")
filterButton.forEach(btn =>{
    btn.addEventListener("click", e => handleBtnFilter(e)) 
})

function handleBtnFilter(e){
    let target = e.target

    e.preventDefault()

    filterButton.forEach(el =>{
        el.classList.remove("active")
    })
    target.classList.add("active")

    filterPets(target.dataset.filter)
}

function filterPets(species){
    const allPets = document.querySelectorAll(".animal-card")
    if(species == "all"){
        allPets.forEach(el =>{
            el.style.display=""
        })
    }else{
    allPets.forEach(el =>{
        if(el.querySelector(".species").textContent == species){
            el.style.display=""
        }else{
            el.style.display="none"
        }
    })
    }

}
// Arup - Created from here
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

// Open JSON file and parse data
let jsonData = [];
fetch('pets.json')
  .then(response => response.json())
  .then(data => {
    jsonData = data;
  });
  
// Add new pet object to array  
jsonData.push(pet);

// Stringify array back to JSON and save
const updatedJson = JSON.stringify(jsonData);

fetch('pets.json', {
  method: 'PUT',
  body: updatedJson
});

// Redirect to index.html
window.location.href = 'index.html';