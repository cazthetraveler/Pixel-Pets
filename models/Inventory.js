const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/connection");

class Inventory extends Model {};

Inventory.init(
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
        item_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "items",
                key: "id",
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            validate: {
                max: 20,
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "items"
    }
);

module.exports = Inventory;