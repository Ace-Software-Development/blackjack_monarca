Parse.initialize(process.env.APP_ID, "YOUR_JAVASCRIPT_KEY", process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;
const { getAllRegisters, getOneRegister, postRegister, getAllIncidentRegisters, getIncidentRegisters } = require('../db_abs/partInventory');

/**
   * getConfirmarController
   * @description Get all existing registers from table "PartInventory" while is not second
   * @param response: status of the get and values of the query
   */
exports.getConfirmarController = async function (request, response) {
   const id_process = request.params.id_process;
   const registers = await getAllRegisters(id_process, false, 'pending');
   response.status(200).send({ status: "success", data: registers });
}

/**
   * getConfirmarIncidenteController
   * @description Get all existing registers from table "PartInventory" while is not second
   * @param response: status of the get and values of the query
   */
exports.getConfirmarIncidenteController = async function (request, response) {
   const registers = await getAllIncidentRegisters(true, 'pending');
   response.status(200).send({ status: "success", data: registers });
}

exports.getConfirmarIncidenteProductController = async function (request, response) {
   const id = request.params.id_register;
   const registers = await getIncidentRegisters(true, 'pending', id);
   response.status(200).send({ status: "success", data: registers });
}

/**
   * getOneConfirmarController
   * @description Get one existing registers from table "PartInventory" while is not second
   * @param response: status of the get and values of the query
   */
exports.getOneConfirmarController = async function (request, response) {
   const id_register = request.params.id_register;
   const register = await getOneRegister(id_register);
   response.status(200).send({ status: "success", data: register });
}

/**
   * postConfirmarController
   * @description Modify one existing register from table "PartInventory"
   * @param response: status of the get and values of the query
   */
exports.postConfirmarController = async function (request, response) {
   const register = postRegister(request.body.objectId, request.body.status);
   try {
      await register.save();
   } catch (error) {
      console.error(error.message);
      return (response.status(500).send({ status: "can't save" }));
   }
   response.status(200).send({ status: "success", data: register });
}
