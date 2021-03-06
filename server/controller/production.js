// CU 20
// MT https://docs.google.com/spreadsheets/d/1geuVnd1ByaFLBXFXNAlN5PL-K0QVR2rq/edit?usp=sharing&ouid=103960253138118107632&rtpof=true&sd=true

Parse.initialize(process.env.APP_ID, "YOUR_JAVASCRIPT_KEY", process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;
const { getProductionDay } = require('../db_abs/production');
const moment = require('moment');

/**
  * getProductionWorkerDay
  * @description Gets all the work from a worker on specific days
  * @param response: status of the get and values of the query
  */
exports.getProductionWorkerDay = async function (request, response) {
    const startDay = new Date(parseInt(request.params.startDay));
    const endDay = new Date(parseInt(request.params.endDay));
    const idWorker = request.params.id_worker;
    const production = await getProductionDay(startDay, endDay, idWorker);
    for (let i = 0; i < production.length; i += 1) {
        production[i].set('labelFecha', moment(production[i].createdAt).format('MMM Do YY'));
    }
    response.status(200).send({ status: "success", data: production });
}