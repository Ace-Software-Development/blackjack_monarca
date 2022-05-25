Parse.initialize(process.env.APP_ID, "YOUR_JAVASCRIPT_KEY", process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;
const { getAllParts } = require('../db_abs/part');
const { getAllWorkers } = require('../db_abs/worker');
const { getAllCategories } = require('../db_abs/categories');
const { getAllModels } = require('../db_abs/product');
const { registerPart } = require('../db_abs/partInventory');
const { getCategoryById } = require('../db_abs/categories');
const { getWorkerById } = require('../db_abs/worker');
const { getModelById } = require('../db_abs/product');

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
    const process = request.params.process;
    const workers = await getAllWorkers(process);
    response.status(200).send({status:"success", data:workers});
}

/**
   * getWorkerById
   * @description Get worker
   */
 exports.getWorkerByIdController = async function (request, response){
    const id = request.params.id;
    const worker = await getWorkerById(id);
    response.status(200).send({status:"success", data:worker});
}  

/**
   * getAllCategoriesController
   * @description Get all categories in database
   */
 exports.getAllCategoriesController = async function (request, response){
    const categories = await getAllCategories();
    response.status(200).send({status:"success", data:categories});
}

/**
   * getCategoryById
   * @description Get a category
   */
 exports.getCategoryById = async function (request, response){
    const id = request.params.id;
    const categories = await getCategoryById(id);
    response.status(200).send({status:"success", data:categories});
}

/**
   * getAllModelsController
   * @description Get all models of a category
   */
exports.getAllModelsController = async function (request, response){
   const categoryId = request.params.categoryId;
   const models = await getAllModels(categoryId);
   response.status(200).send({status:"success", data:models});
}

/**
   * getModelById
   * @description Get model
   */
 exports.getModelByIdController = async function (request, response){
   const id = request.params.id;
   const model = await getModelById(id);
   response.status(200).send({status:"success", data:model});
}  

/**
   * postPartController
   * @description Post a part in database
   */
 exports.postPartController = async function (request, response){
   try{
      const completed = registerPart(request.body.part, request.body.worker, request.body.process, request.body.numberCompleted, request.body.model, false);
      await completed.save();
   } catch(error){
      console.error(error.message);
      return(response.status(500).send({status:"can't save"}));
   }

   if(request.body.numberSecond != 0){
      try{
         const second = registerPart(request.body.part, request.body.worker, request.body.process, request.body.numberSecond, request.body.model, true);
         await second.save();
      } catch(error){
         console.error(error.message);
         return(response.status(500).send({status:"can't save"}));
      }
   }

   response.status(200).send({status:"success"});
}