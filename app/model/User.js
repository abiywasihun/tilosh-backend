const { sequelize, DataTypes } = require( "../config/db");

const UserModel = sequelize.define("users", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    fullName: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    organizationName: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    tagline: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    industry: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    about: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    avatar: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    medias: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    location: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    website: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    phoneNo: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    instagram: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    facebook: {
        type: DataTypes.STRING(100),
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

module.exports= UserModel;

