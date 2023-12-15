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
        if (friendship_level >= 251) {
            return `<p>You and your pet are the bestest friends ever!!</p>`;
        } else if (friendship_level < 250) {
            return `<p>You are your pet are very close!</p>`;
        } else if (friendship_level < 200) {
            return `<p>You and your pet are very good friends!</p>`;
        } else if (friendship_level < 150) {
            return `<p>You and your pet are good friends.</p>`;
        } else if (friendship_level < 100) {
            return `<p>You and your pet are friends.</p>`;
        } else if (friendship_level < 50) {
            return `<p>You should spend more time with your pet...</p>`;
        } else {
            return `<p>Your pet kinda hates you...</p>`
        }
    }
  };
  