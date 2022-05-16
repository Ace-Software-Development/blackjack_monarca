Parse.initialize(process.env.APP_ID, "YOUR_JAVASCRIPT_KEY", process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;
const { getDisksQuantity } = require('../db_abs/incomeDisk');

exports.getDisksQuantityController = async function (request, response) {
    const disks = await getDisksQuantity();
    response.status(200).send({ status: "success", data: disks });
}