const { request, response } = require('express');

exports.goProcess = (request, response) => {
    response.status(200).send({status: "success", message: "Exito!"});
}
