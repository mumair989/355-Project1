const petPromise = await fetch("https://learnwebcode.github.io/pet-adoption-data/pets.json")
const pets = await petPromise.json()

const template = document.querySelector("#animal-card")
const wrapper = document.createElement("div")
pets.forEach(pet => {
    const clone = template.content.cloneNode(true)

    wrapper.appendChild(clone)

});

document.querySelector(".animals").appendChild(wrapper)