Parse.initialize(process.env.APP_ID, "YOUR_JAVASCRIPT_KEY", process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;
const { registerIncomingDisk, getAllDisks, modifyIncomingDisk } = require('../db_abs/incomeDisk');

/**
   * postIncomingDiskController
   * @description Post new incoming disk registered
   * @param request: values registered by user
   * @param response: status of the post
   */
exports.postIncomingDiskController = async function (request, response){
    console.log("arriving incoming disc: ", request.body.number);
    try{
        const incomeDisk = registerIncomingDisk(request.body.number, request.body.name);
        await incomeDisk.save();
    } catch(error){
        console.error(error.message);
        return(response.status(500).send({status:"can't save"}));
    }
    response.status(200).send({status:"success"});
}

/**
   * getAllDisksController
   * @description Get all existing disks from table "Disks"
   * @param response: status of the get and values of the query
   */
exports.getAllDisksController = async function (request, response){
    const disks = await getAllDisks();
    response.status(200).send({status:"success", data:disks});
}

/**
   * modifyIncomingDiskController
   * @description Modify incoming disk registered
   * @param request: values modified by user
   * @param response: status of the post
   */
 exports.modifyIncomingDiskController = async function (request, response){
    try{
        const incomeDisk = modifyIncomingDisk(request.body.number, request.body.objectId);
        await incomeDisk.save();
    } catch(error){
        console.error(error.message);
        return(response.status(500).send({status:"can't save"}));
    }
    response.status(200).send({status:"success"});
}



