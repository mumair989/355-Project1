const petPromise = await fetch("animals.json")
const pets = await petPromise.json()

const template = document.querySelector("#animal-card")
const wrapper = document.createElement("div")
pets.forEach(pet => {
    const clone = template.content.cloneNode(true)
    clone.querySelector("h3").textContent = pet.name
    
    const img = clone.querySelector("img")
    img.src = pet.photo
    img.alt = `A ${pet.species} named ${pet.name}`

    wrapper.appendChild(clone)

});

document.querySelector(".animals").appendChild(wrapper)