import React from 'react';
import './style.css';


function AnimalAdoption({ pets }) {
    // const currentYear = new Date().getFullYear();
    // const age = currentYear -parseInt( pets.birthYear);
    const filterButton = document.querySelectorAll(".filter-nav a")
    filterButton.forEach(btn => {
        btn.addEventListener("click", e => handleBtnFilter(e))
    })

    function handleBtnFilter(e) {
        let target = e.target

        e.preventDefault()

        filterButton.forEach(el => {
            el.classList.remove("active")
        })
        target.classList.add("active")

        filterPets(target.dataset.filter)
    }

    function filterPets(species) {
        const allPets = document.querySelectorAll(".animal-card")
        if (species == "all") {
            allPets.forEach(el => {
                el.style.display = ""
            })
        } else {
            allPets.forEach(el => {
                if (el.querySelector(".species").textContent == species) {
                    el.style.display = ""
                } else {
                    el.style.display = "none"
                }
            })
        }

    }
    return (

        <div>
            <div className="hero">
                <h1>Welcome.</h1>
                <h2>Our friends needs a home</h2>
            </div>

            <div className="filter-nav">
                <a href="#" data-filter="all">All Animals</a>
                <a href="#" data-filter="dog">Only dogs</a>
                <a href="#" data-filter="cat">Only cats</a>
                <a href="#" data-filter="rabbit">Only rabbits</a>
            </div>

            <button><a href="aboutMe.html">About Us</a></button>
            <button><a href="/PetForm.js">Put your animal for adoption</a></button>

            <div className="animals">
                {
                    pets && pets.map((pet, index) => (
                        <div key={index} className="animal-card">
                            <div className="animal-card-text">
                                <h3>{pet.name}</h3>
                                <small>
                                    <span className="age">{pet.birthYear}</span> - <span className="species">{pet.species}</span>
                                </small>
                                <p className="description">{pet.description}</p>
                                <a href="#" className="primary-btn">Adopt {pet.name}</a>
                            </div>
                            <div className="animal-card-photo">
                                <img src={pet.image} alt={pet.name} />
                            </div>
                        </div>
                    ))
                }
            </div>

            <footer id="footer" role="contentinfo"></footer>
        </div>
    );
}

export default AnimalAdoption;
