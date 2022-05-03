const role = require('../model/role');
const { request, response } = require('express');

exports.getRole = (request, response) => {
    role.fetchValues()
    .then(([rows, fieldData]) => {
        response.status(200).send({status:"success",error: null, data: rows, message:"Welcome To Roles"});
    })
    .catch(err => {
        console.log(err);
    });
}
