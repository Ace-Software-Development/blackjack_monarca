Parse.initialize(process.env.APP_ID, "YOUR_JAVASCRIPT_KEY", process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;
const {
   getAllIncidents,
   getAllDisks,
   getAllEsmerilados,
   getEsmeriladosIncident,
   getAllPulidos,
   getPulidosIncident,
   getAllRemachados,
   getRemachadosIncident,
   getAllEmpaquetados
} = require('../db_abs/procesos');

/**
   * getAllIncidentsController
   * @description Get all pieces of processes from today
   * @param response: status of the get and values of the query
   */
exports.getAllIncidentsController = async function (request, response) {
   const incidentes = await getAllIncidents();
   response.status(200).send({ status: "success", data: incidentes });
}

/**
   * getAllDisksController
   * @description Get all pieces of processes from today
   * @param response: status of the get and values of the query
   */
 exports.getAllDisksController = async function (request, response) {
   const disks = await getAllDisks();
   response.status(200).send({ status: "success", data: disks });
}

/**
   * getAllEsmeriladosController
   * @description Get all pieces of processes from today
   * @param response: status of the get and values of the query
   */
 exports.getAllEsmeriladosController = async function (request, response) {
   const esmerilados = await getAllEsmerilados();
   response.status(200).send({ status: "success", data: esmerilados });
}

/**
   * getEsmeriladosIncidentController
   * @description Get all pieces of processes from today
   * @param response: status of the get and values of the query
   */
 exports.getEsmeriladosIncidentController = async function (request, response) {
   const esmeriladosIncident = await getEsmeriladosIncident();
   response.status(200).send({ status: "success", data: esmeriladosIncident });
}

/**
   * getAllPulidosController
   * @description Get all pieces of processes from today
   * @param response: status of the get and values of the query
   */
 exports.getAllPulidosController = async function (request, response) {
   const pulidos = await getAllPulidos();
   response.status(200).send({ status: "success", data: pulidos });
}

/**
   * getPulidosIncidentController
   * @description Get all pieces of processes from today
   * @param response: status of the get and values of the query
   */
 exports.getPulidosIncidentController = async function (request, response) {
   const pulidosIncident = await getPulidosIncident();
   response.status(200).send({ status: "success", data: pulidosIncident });
}

/**
   * getAllRemachadosController
   * @description Get all pieces of processes from today
   * @param response: status of the get and values of the query
   */
 exports.getAllRemachadosController = async function (request, response) {
   const remachados = await getAllRemachados();
   response.status(200).send({ status: "success", data: remachados });
}

/**
   * getRemachadosIncidentController
   * @description Get all pieces of processes from today
   * @param response: status of the get and values of the query
   */
 exports.getRemachadosIncidentController = async function (request, response) {
   const remachadosIncident = await getRemachadosIncident();
   response.status(200).send({ status: "success", data: remachadosIncident });
}

/**
   * getAllEmpaquetadosController
   * @description Get all pieces of processes from today
   * @param response: status of the get and values of the query
   */
 exports.getAllEmpaquetadosController = async function (request, response) {
   const empaquetados = await getAllEmpaquetados();
   response.status(200).send({ status: "success", data: empaquetados });
}