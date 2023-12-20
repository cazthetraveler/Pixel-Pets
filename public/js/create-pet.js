const addPetBtn = document.querySelector("#add-pet");
const petCreation = document.querySelector(".pet-creation");
const closeBtnCreate = document.querySelector("#create-close");

const foods = ["Cheese", "Carrot", "Soop"];

addPetBtn.addEventListener("click", function() {
    petCreation.style.display = "block";
});

closeBtnCreate.addEventListener("click", function() {
    petCreation.style.display = "none";
});

function faveFood(foods) {
    return Math.floor(Math.random() * foods.length);
};

function filterFood(foods, excluded) {
    const filterArray = foods.filter(food => food !== excluded);
    const randomFood = faveFood(filterArray);
    return filterArray[randomFood];
}

const petForm = async (event) => {
    event.preventDefault();

    const pet_type = document.querySelector("[name='pet-type']:checked").value;
    const pet_name = document.querySelector("#pet-name").value.trim();
    const favorite_food = foods[faveFood(foods)];
    const hated_food = filterFood(foods, favorite_food);

    console.log(`A ${pet_type} named ${pet_name}.`);

    if (pet_type && pet_name) {
        const response = await fetch("/api/pets", {
            method: "POST",
            body: JSON.stringify({pet_type, pet_name, favorite_food, hated_food}),
            headers: {"Content-Type": "application/json"},
        });

        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            const errorData = await response.json();
            alert(`Failed to create pet! ${JSON.stringify(errorData)}`);
        };
    };    
};

document.querySelector("#create-pet-form").addEventListener("submit", petForm);