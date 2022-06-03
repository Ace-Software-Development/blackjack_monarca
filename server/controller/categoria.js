Parse.initialize(process.env.APP_ID, "YOUR_JAVASCRIPT_KEY", process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;
const { registerCategory, modifyCategory, deleteCategory } = require('../db_abs/category');

/**
   * postCategoryController
   * @description Post new category
   * @param request: values registered by user
   * @param response: status of the post
   */
exports.postCategoryController = async function (request, response) {
    try {
        console.log(request);
        const category = registerCategory(request.body.name);
        await category.save();
    } catch (error) {
        console.error(error.message);
        return (response.status(500).send({ status: "can't save" }));
    }
    response.status(200).send({ status: "success" });
}

/**
   * modifyCategoryController
   * @description Modify category registered
   * @param request: values modified by user
   * @param response: status of the post
   */
exports.modifyCategoryController = async function (request, response) {
    try {
        const category = modifyCategory(request.body.name, request.body.objectId);
        await category.save();
    } catch (error) {
        console.error(error.message);
        return (response.status(500).send({ status: "can't save" }));
    }
    response.status(200).send({ status: "success" });
}

/**
   * deleteCategoryController
   * @description Delte category registered
   * @param request: values object id
   * @param response: status of the post
   */
exports.deleteCategoryController = async function (request, response) {
    try {
        const category = deleteCategory(request.body.objectId);
        await category.save();
    } catch (error) {
        console.error(error.message);
        return (response.status(500).send({ status: "can't save" }));
    }
    response.status(200).send({ status: "success" });
}




