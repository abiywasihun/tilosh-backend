const { Request, Response } = require("express");
const UserModel = require("../model/User");

//create blog
const createUserController = async (req, res) => {
    try {
        const userData={...req.body}
        const user = await UserModel.create(userData);

        res.status(201).json({
            status: "success",
            data: {
                user,
            },
        });
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(409).json({
                status: "error",
                message: error.message,
            });
        }

        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

// to edit Blog
const updateUserController = async (req,  res) => {
    try {
            const userData={...req.body}
            const reqFiles = [];
            const url = req.protocol + '://' + req.get('host')
            for (var i = 0; i < req.files['medias'].length; i++) {
                reqFiles.push(url + '/app/resources/' + req.files['medias'][i].filename)
            }
            userData.medias=reqFiles.toString()
            userData.avatar=url + '/app/resources/' + req.files['avatar'][0].filename

            const result = await UserModel.update(
                { ...userData, updatedAt: Date.now() },
                {
                    where: {
                        id: req.params.userId,
                    },
                }
            );

        if (result[0] === 0) {
            return res.status(404).json({
                status: "fail",
                message: "Blog not found",
            });
        }

        //to retrieve the updated record
        const user = await UserModel.findByPk(req.params.userId);

        res.status(200).json({
            status: "success",
            data: {
                user,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

//find one blog
const findUserController = async (req , res) => {
    try {
        const user = await UserModel.findByPk(req.params.userId);

        if(!user) {
            return res.status(404).json({
                status: "fail",
                message: "Blog not found",
            });
        }

        res.status(200).json({
            status: "success",
            data: {
                user,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

const loginUserController = async (req , res) => {
    try {
        const { email, password } = req.body
        const user = await UserModel.findOne({
              where: { 
                password,
                email
                }});

        if(!user) {
            return res.status(404).json({
                status: "fail",
                message: "user not found",
            });
        }

        res.status(200).json({
            status: "success",
            data: {
                user,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

// get all blogs
const findAllUsersController = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;

        const users = await UserModel.findAll({ limit, offset: skip});

        res.status(200).json({
            status: "success",
            results: users.length,
            users,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

//delete blog
const deleteUserController = async (req , res) => {
    try {
        const result = await UserModel.destroy({
            where: { id: req.params.userId },
            force: true,
        });

        if (result === 0) {
            return res.status(404).json({
                status: "fail",
                message: "Blog not found",
            });
        }

        // to return to client
        res.status(204).json();
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

module.exports={createUserController,findUserController,loginUserController, findAllUsersController,updateUserController,deleteUserController}