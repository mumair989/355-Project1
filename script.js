const petPromise = await fetch("animals.json")
const pets = await petPromise.json()

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