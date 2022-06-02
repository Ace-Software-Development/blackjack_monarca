Parse.initialize(process.env.APP_ID, "YOUR_JAVASCRIPT_KEY", process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;
const { getMerma, getMermaDate } = require('../db_abs/merma');

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
   const startDay = request.params.startDay;
   const endDay = request.params.endDay;
   
   const merma = await getMermaDate(startDay, endDay);
   response.status(200).send({ status: "success", data: merma });
}