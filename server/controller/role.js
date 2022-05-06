const role = require('../db_abs/role');
const { request, response } = require('express');

exports.getRole = async function (request, response){
    let data = await role.fetchValues();
    response.status(200).send({status:"success",error: null, data: data, message:"Welcome To Roles"});
}
