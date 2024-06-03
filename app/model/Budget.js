const { sequelize, DataTypes } = require( "../config/db");

const BudgetModel = sequelize.define("budgets", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    amount: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    clothe: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    venue: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    ft: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
});

module.exports= BudgetModel;