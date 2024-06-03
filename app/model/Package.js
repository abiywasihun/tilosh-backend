const { sequelize, DataTypes } = require( "../config/db");

const PackageModel = sequelize.define("package", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    packageName: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    price: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    PackageType: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    medias: {
        type: DataTypes.TEXT,
        allowNull: true,
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

module.exports= PackageModel;

