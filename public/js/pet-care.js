const feedBtn = document.querySelector("#feed");
const napBtn = document.querySelector("#nap");
const playBtn = document.querySelector("#play");

let action;

const feedPet = async (event) => {
    event.preventDefault();

    action = "feed";

    let hunger_level = parseInt(document.querySelector("#hunger").getAttribute("value")); //don't have it as const, oops lol
    const petId = window.location.pathname.split("/").pop();

    if (hunger_level < 100) {
        hunger_level += 10;
        
        const response = await fetch(`/api/pets/${petId}`, {
            method: "POST",
            body: JSON.stringify({action, hunger_level}),
            headers: {"Content-Type": "application/json"},
        });

        if (response.ok) {
            document.location.replace(`/pets/${petId}`);
        } else {
            alert("Failed to feed!");
        };
    } else if (hunger_level === 100) {
        alert("Your pet is full!!");
    };
};

const napPet = async (event) => {
    event.preventDefault();

    action = "nap";

    let energy_level = parseInt(document.querySelector("#energy").getAttribute("value"));
    let hunger_level = parseInt(document.querySelector("#hunger").getAttribute("value"));
    const petId = window.location.pathname.split("/").pop();

    if (energy_level < 100) {
        energy_level += 10;
        hunger_level -= 5;
        console.log(hunger_level);
        
        const response = await fetch(`/api/pets/${petId}`, {
            method: "POST",
            body: JSON.stringify({action, hunger_level, energy_level}),
            headers: {"Content-Type": "application/json"},
        });

        if (response.ok) {
            document.location.replace(`/pets/${petId}`);
        } else {
            alert("Failed to sleep!");
        };
    } else if (energy_level === 100) {
        alert("Your pet is full of energy!!");
    };
};

const playPet = async (event) => {
    event.preventDefault();

    action = "play";

    let friendship_level = parseInt(document.querySelector("#friendship").getAttribute("value"));
    let energy_level = parseInt(document.querySelector("#energy").getAttribute("value"));
    let hunger_level = parseInt(document.querySelector("#hunger").getAttribute("value"));
    const petId = window.location.pathname.split("/").pop();

    if (energy_level >= 10 && hunger_level >=10) {
        hunger_level -= 10;
        energy_level -= 15;
        friendship_level += 10;
        
        const response = await fetch(`/api/pets/${petId}`, {
            method: "POST",
            body: JSON.stringify({action, hunger_level, energy_level, friendship_level}),
            headers: {"Content-Type": "application/json"},
        });

        if (response.ok) {
            document.location.replace(`/pets/${petId}`);
        } else {
            alert("Failed to play!");
        };
    } else if (hunger_level <=10 || energy_level <= 10) {
        alert("Your pet is not in the mood to play.");
    }
};

feedBtn.addEventListener("click", feedPet);
napBtn.addEventListener("click", napPet);
playBtn.addEventListener("click", playPet);