Parse.initialize(process.env.APP_ID, "YOUR_JAVASCRIPT_KEY", process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;
const { getMerma, getMermaDate } = require('../db_abs/merma');
const moment = require('moment');

/**
   * getAllMerma
   * @description Gets all the scrap
   * @param response: status of the get and values of the query
   */
exports.getAllMerma = async function (request, response) {
    const process = request.params.process;
    const merma = await getMerma(process);
    response.status(200).send({ status: "success", data: merma });
}

 /**
   * getAllMerma
   * @description Gets all the scrap
   * @param response: status of the get and values of the query
   */
exports.getAllMermaDate = async function (request, response) {
   const startDay = new Date(parseInt(request.params.startDay));
   const endDay = new Date(parseInt(request.params.endDay));
   console.log("merma date controller");
   const merma = await getMermaDate(startDay, endDay);
   for (let i = 0; i < merma.length; i += 1) {
      merma[i].set('labelFecha', moment(merma[i].createdAt).format('MMM Do YY'));
   }
   response.status(200).send({ status: "success", data: merma });
}