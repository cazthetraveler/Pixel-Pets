const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/connection");

class Pet extends Model {};

Pet.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id",
            }
        },
        pet_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pet_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hunger_level: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                max: 100,
                min: 0,
            },
            defaultValue: 50,
        },
        energy_level: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                max: 100,
                min: 0,
            },
            defaultValue: 50,
        },
        friendship_level: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                max: 255,
                min: 0,
            },
            defaultValue: 100,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "pet"
    }
);

module.exports = Pet;