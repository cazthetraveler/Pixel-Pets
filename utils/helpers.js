module.exports = {
    checkHunger: (hunger_level) => {
        if (hunger_level <= 25) {
            return `<p>Your pet is hungry...</p>`;
        };
    },
    checkEnergy: (energy_level) => {
        if (energy_level <= 25) {
            return `<p>Your pet is tired...</p>`
        };
    },
    checkFriendship: (friendship_level) => {
        if (friendship_level === 100) {
            return `<p>You and your pet are the bestest friends ever!!</p>`;
        } else if (friendship_level >= 90) {
            return `<p>You are your pet are very close!</p>`;
        } else if (friendship_level >= 75) {
            return `<p>You and your pet are very good friends!</p>`;
        } else if (friendship_level >= 50) {
            return `<p>You and your pet are good friends.</p>`;
        } else if (friendship_level >= 35) {
            return `<p>You and your pet are friends.</p>`;
        } else if (friendship_level >= 25) {
            return `<p>You should spend more time with your pet...</p>`;
        } else {
            return `<p>Your pet kinda hates you...</p>`
        };
    },
    checkPetCount: (petCount) => {
        if (petCount === 3) {
            return ``;
        } else {
            return `<button type="button" id="add-pet">Create Pet</button>`;
        };
    },
    checkPetCountScript: (petCount) => {
        if (petCount < 3) {
            return `<script src="/js/create-pet.js"></script>`;
        } else {
            return ``
        }
    },
    checkOwner: (petUserId, userId) => {
        if (petUserId === userId) {
            return `<section class="pet-buttons">
      <h2>Food:</h2>
      <div class="food-buttons">
        <button class="material-symbols-outlined feed" title="Cheese" value="Cheese">local_pizza</button>
        <button class="material-symbols-outlined feed" title="Carrot" value="Carrot">nutrition</button>
        <button class="material-symbols-outlined feed" title="Soop" value="Soop">soup_kitchen</button>
        <button class="material-symbols-outlined feed" title="Cookie" value="Cookie">cake</button>
        <button class="material-symbols-outlined feed" title="Lettuce" value="Lettuce">bakery_dining</button>
      </div>
      <h2>Play:</h2>
      <button type="button" id="play" class="material-symbols-outlined">videogame_asset</button>
      <h2>Sleep:</h2>
      <button type="button" id="nap" class="material-symbols-outlined">bedtime</button>
    </section>

    <script src="/js/pet-care.js"></script>`;
        } else {
            return ``;
        };
    },
    checkOwnerTwo: (petUserId, userId) => {
        if (petUserId === userId) {
            return ``;
        } else {
            return `<div style='margin-top: 1rem;'>
            <h2>This is your friend's pet!</h2>
            </div>`;
        };
    }
  };
  
