Parse.initialize(process.env.APP_ID, "YOUR_JAVASCRIPT_KEY", process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;
const { getAllParts } = require('../db_abs/part');
const { getAllWorkers } = require('../db_abs/worker');
const { getAllCategories } = require('../db_abs/categories');

/**
   * getAllPartsController
   * @description Get all parts in database
   */
exports.getAllPartsController = async function (request, response){
    const parts = await getAllParts();
    response.status(200).send({status:"success", data:parts});
}

/**
   * getAllWorkersController
   * @description Get all workers in database
   */
 exports.getAllWorkersController = async function (request, response){
    const workers = await getAllWorkers();
    response.status(200).send({status:"success", data:workers});
}

/**
   * getAllCategoriesController
   * @description Get all categories in database
   */
 exports.getAllCategoriesController = async function (request, response){
    const categories = await getAllCategories();
    response.status(200).send({status:"success", data:categories});
}