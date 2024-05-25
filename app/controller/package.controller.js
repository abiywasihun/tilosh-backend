const { Request, Response } = require("express");
const PackageModel = require("../model/Package");

//create blog
const createPackageController = async (req, res) => {
    try {
            const userData={...req.body}
            const reqFiles = [];
            const url = req.protocol + '://' + req.get('host')
            for (var i = 0; i < req.files['medias'].length; i++) {
                reqFiles.push(url + '/app/resources/' + req.files['medias'][i].filename)
            }
            userData.medias=reqFiles.toString()
        const package = await PackageModel.create(userData);

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
const updatePackageController = async (req,  res) => {
    try {
            const userData={...req.body}
            const reqFiles = [];
            const url = req.protocol + '://' + req.get('host')
            for (var i = 0; i < req.files['medias'].length; i++) {
                reqFiles.push(url + '/app/resources/' + req.files['medias'][i].filename)
            }
            userData.medias=reqFiles.toString()

            const result = await PackageModel.update(
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
        const package = await PackageModel.findByPk(req.params.userId);

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
const findPackageController = async (req , res) => {
    try {
        const package = await PackageModel.findByPk(req.params.userId);

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

const findPackageByUserController = async (req , res) => {
    try {
        const { userId } = req.body
        const package = await PackageModel.findAll({
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
const findAllPackagesController = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;

        const packages = await PackageModel.findAll({ limit, offset: skip});

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
const deletePackageController = async (req , res) => {
    try {
        const result = await PackageModel.destroy({
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

module.exports={createPackageController,findPackageController, findPackageByUserController, findAllPackagesController,updatePackageController,deletePackageController}