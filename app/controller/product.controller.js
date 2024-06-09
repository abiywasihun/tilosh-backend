const { Request, Response } = require("express");
const ProductModel = require("../model/Product");

//create blog
const createProductController = async (req, res) => {
    try {
            const userData={...req.body}
            const reqFiles = [];
            const url = req.protocol + '://' + req.get('host')
            for (var i = 0; i < req.files['medias'].length; i++) {
                reqFiles.push(url + '/app/resources/' + req.files['medias'][i].filename)
            }
            userData.medias=reqFiles.toString()
        const product = await ProductModel.create(userData);

        res.status(201).json({
            status: "success",
            data: {
                product,
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
const updateProductController = async (req,  res) => {
    try {
            const userData={...req.body}
            const reqFiles = [];
            const url = req.protocol + '://' + req.get('host')
            for (var i = 0; i < req.files['medias'].length; i++) {
                reqFiles.push(url + '/app/resources/' + req.files['medias'][i].filename)
            }
            userData.medias=reqFiles.toString()

            const result = await ProductModel.update(
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
        const product = await ProductModel.findByPk(req.params.userId);

        res.status(200).json({
            status: "success",
            data: {
                product,
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
const findProductController = async (req , res) => {
    try {
        const product = await ProductModel.findByPk(req.params.userId);

        if(!user) {
            return res.status(404).json({
                status: "fail",
                message: "Blog not found",
            });
        }

        res.status(200).json({
            status: "success",
            data: {
                product,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};


const findProductByUserController = async (req , res) => {
    try {
        const { userId } = req.body
        const product = await ProductModel.findAll({
              where: { 
                userId
                }});

        if(!product) {
            return res.status(404).json({
                status: "fail",
                message: "product not found",
            });
        }

        res.status(200).json({
            status: "success",
            data: {
                product,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

const findProductByCategoryController = async (req , res) => {
    try {
        const { category } = req.body
        const product = await ProductModel.findAll({
              where: { 
                category
                }});

        if(!product) {
            return res.status(404).json({
                status: "fail",
                message: "product not found",
            });
        }

        res.status(200).json({
            status: "success",
            data: {
                product,
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
const findAllProductsController = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;

        const products = await ProductModel.findAll({ limit, offset: skip});

        res.status(200).json({
            status: "success",
            results: products.length,
            products,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

//delete blog
const deleteProductController = async (req , res) => {
    try {
        const result = await ProductModel.destroy({
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

module.exports={createProductController,findProductController, findProductByUserController,
 findAllProductsController, findProductByCategoryController, updateProductController,
 deleteProductController}