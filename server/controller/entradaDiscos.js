const incomeDisk = require('../db_abs/incomeDisk');
Parse.initialize(process.env.APP_ID, "YOUR_JAVASCRIPT_KEY", process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;
const { request, response, query } = require('express');
const Constants = require('../constants');
var util = require('util');
const { registerIncomingDisk, getAllDisks } = require('../db_abs/incomeDisk');

exports.post = async function (request, response){
    const incomeDisk = registerIncomingDisk(request.body.number, request.body.id_disk);
    await incomeDisk.save();
    response.status(200).send({status:"success"});
}

exports.get = async function (request, response){
    const disks = await getAllDisks();
    response.status(200).send({status:"success", data:disks});
}

