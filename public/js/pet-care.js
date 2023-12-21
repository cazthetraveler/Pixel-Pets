const feedBtns = document.querySelectorAll(".feed");
const napBtn = document.querySelector("#nap");
const playBtn = document.querySelector("#play");

const animGif = document.querySelector("#pet-gif");
const petType = document.querySelector("#pet-type").dataset.pettype;

let action;

const feedPet = async (event) => {
    event.preventDefault();

    action = "feed";

    let hunger_level = parseInt(document.querySelector("#hunger").getAttribute("value"));
    let friendship_level = parseInt(document.querySelector("#friendship").getAttribute("value"));
    const petId = window.location.pathname.split("/").pop();

    const favoriteFood = document.querySelector(".favorite-food").textContent;
    const hatedFood = document.querySelector(".hated-food").textContent;

    const food = event.target.value;

    let react;

    if (hunger_level < 100) {
        let fetchBody;
        switch (food) {
            case "Cheese":
            case "Carrot":
            case "Soop":
                if (favoriteFood == food) {
                    hunger_level += 15;
                    react = "favefood"
                } else if (hatedFood == food) {
                    friendship_level -= 10;
                    hunger_level += 5;
                    react = "hatefood"
                } else if (hunger_level === 100) {
                    alert("Your pet is full!!");
                } else {
                    hunger_level += 5;
                    react = "normfood"
                }
                fetchBody = JSON.stringify({action, hunger_level, friendship_level});
            break;
            default:
                return;
        };

        if (hunger_level < 100) {
            const response = await fetch(`/api/pets/${petId}`, {
                method: "POST",
                body: fetchBody,
                headers: {"Content-Type": "application/json"},
            });

            if (response.ok) {
                animGif.setAttribute("src", "/images/pets/pixel_" + petType + "_" + react + "_anim.gif"); //changes gif animation to a food reaction for a few seconds before refreshing :PP
                setTimeout(() => {
                    document.location.replace(`/pets/${petId}`);
                }, 2500);
            };
        } else {
            alert("Your pet is full!");
        };
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
            animGif.setAttribute("src", "/images/pets/pixel_" + petType + "_sleep_anim.gif"); //changes gif animation to sleep for a few seconds before refreshing :PP
            setTimeout(() => {
                document.location.replace(`/pets/${petId}`);
            }, 2500);
        } //else {
        //     alert("Failed to sleep!");
        // };
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
        friendship_level += 5;
        
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

feedBtns.forEach((btn) => {
    btn.addEventListener("click", feedPet);
});

napBtn.addEventListener("click", napPet);
playBtn.addEventListener("click", playPet);

// change color on stats :PP

const friendshipLv = parseInt(document.querySelector("#friendship").getAttribute("value"));
const energyLv = parseInt(document.querySelector("#energy").getAttribute("value"));
const hungerLv = parseInt(document.querySelector("#hunger").getAttribute("value"));

const hungerEl = document.querySelector("#hunger");
const energyEl = document.querySelector("#energy");
const friendshipEl = document.querySelector("#friendship");

if (hungerLv >= 50) {
    hungerEl.style.backgroundColor = "green";
} else if (hungerLv >= 25) {
    hungerEl.style.backgroundColor = "orange";
} else if (hungerLv >= 0) {
    hungerEl.style.backgroundColor = "red";
};

if (energyLv >= 50) {
    energyEl.style.backgroundColor = "green";
} else if (energyLv >= 25) {
    energyEl.style.backgroundColor = "orange";
} else if (energyLv >= 0) {
    energyEl.style.backgroundColor = "red";
};

if (friendshipLv >= 50) {
    friendshipEl.style.backgroundColor = "green";
} else if (friendshipLv >= 25) {
    friendshipEl.style.backgroundColor = "orange";
} else if (friendshipLv >= 0) {
    friendshipEl.style.backgroundColor = "red";
};