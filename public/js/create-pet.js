const addPetBtn = document.querySelector("#add-pet");
const petCreation = document.querySelector(".pet-creation");
const closeBtnCreate = document.querySelector("#create-close");

addPetBtn.addEventListener("click", function() {
    petCreation.style.display = "block";
});

closeBtnCreate.addEventListener("click", function() {
    petCreation.style.display = "none";
});

const petForm = async (event) => {
    event.preventDefault();

    const pet_type = document.querySelector("[name='pet-type']:checked").value;
    const pet_name = document.querySelector("#pet-name").value.trim();

    console.log(`A ${pet_type} named ${pet_name}.`);

    if (pet_type && pet_name) {
        const response = await fetch("/api/pets", {
            method: "POST",
            body: JSON.stringify({pet_type, pet_name}),
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