const { Request, Response } = require("express");
const CartModel = require("../model/Cart");

//create blog
const createCartController = async (req, res) => {
    try {
        const userData={...req.body}
        const package = await CartModel.create(userData);

        res.status(201).json({
            status: "success",
            data: {
                package,
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
const updateCartController = async (req,  res) => {
    try {
            const userData={...req.body}

            const result = await CartModel.update(
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
        const package = await CartModel.findByPk(req.params.userId);

        res.status(200).json({
            status: "success",
            data: {
                package,
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
const findCartController = async (req , res) => {
    try {
        const package = await CartModel.findByPk(req.params.userId);

        if(!user) {
            return res.status(404).json({
                status: "fail",
                message: "Blog not found",
            });
        }

        res.status(200).json({
            status: "success",
            data: {
                package,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

const findCartByUserController = async (req , res) => {
    try {
        const { userId } = req.body
        const package = await CartModel.findAll({
              where: { 
                userId
                }});

        if(!package) {
            return res.status(404).json({
                status: "fail",
                message: "package not found",
            });
        }

        res.status(200).json({
            status: "success",
            data: {
                package,
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
const findAllCartsController = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;

        const packages = await CartModel.findAll({ limit, offset: skip});

        res.status(200).json({
            status: "success",
            results: users.length,
            packages,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

//delete blog
const deleteCartController = async (req , res) => {
    try {
        const result = await CartModel.destroy({
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

module.exports={createCartController,findCartController, findCartByUserController, findAllCartsController,updateCartController,deleteCartController}