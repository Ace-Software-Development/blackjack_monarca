const role = require('../model/role');
const { request, response } = require('express');

exports.getRole = (request, response) => {
    role.fetchValue(1)
    .then(([rows, fieldData]) => {
        response.send(rows[0].name);
    })
    .catch(err => {
        console.log(err);
    }); 
}
