const incomeDisk = require('../db_abs/incomeDisk');
Parse.initialize(process.env.APP_ID, "YOUR_JAVASCRIPT_KEY", process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;
const { request, response } = require('express');
const Constants = require('../constants');
var util = require('util')

exports.add = async function (request, response){
    const incomeDisk = new Parse.Object(Constants.IncomeDisk);
    incomeDisk.set('number', parseInt(request.body.number));
    incomeDisk.set('id_disk', request.body.id_disk);
    await incomeDisk.save();
    response.status(200).send({status:"success"});
}


