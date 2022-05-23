Parse.initialize(process.env.APP_ID, "YOUR_JAVASCRIPT_KEY", process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;
const { getAllIncomeDisks } = require('../db_abs/incomeDisk');

exports.getDisksQuantityController = async function (request, response) {
    const disks = await getAllIncomeDisks();
    response.status(200).send({ status: "success", data: disks });
}