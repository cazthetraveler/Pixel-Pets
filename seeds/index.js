const sequelize = require("../config/connection");
const {User, Pet} = require("../models");

const userData = require("./userData.json");
const petData = require("./petData.json");

const seedDatabase = async () => {
    await sequelize.sync({force: true});

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    await Pet.bulkCreate(petData, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
};

seedDatabase();