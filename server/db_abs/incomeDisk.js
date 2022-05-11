const Constants = require('../constants');

function initializeParse(){
	var Parse = require('parse/node');

	const APP_ID     = process.env.APP_ID
	const MASTER_KEY = process.env.MASTER_KEY
	const SERVER_URL = process.env.SERVER_URL

	Parse._initialize(APP_ID, "", MASTER_KEY)
	Parse.serverURL = SERVER_URL
}

class IncomeDisk
{
    constructor(number, id_disk)
    {
        this.number = number;
        this.id_disk = id_disk;

    }

    static getEmpty()
    {
        return new cIncomeDisk({id:null});/*TODO make all the field*/
    }

    static getById(id)
    {
        let oIncomeDisk = oIncomeDisk.getEmpty();
        /*TODO implement*/
        return oIncomeDisk;
    }

    static registerIncomingDisk(number, id_disk){
        const incomeDisk = new Parse.Object(Constants.IncomeDisk);
        incomeDisk.set('number', parseInt(number));
        incomeDisk.set('id_disk', id_disk);
        return incomeDisk;
    }

    static getAllDisks(){
        const disks = new Parse.Query(Constants.Disk);
        disks.select("objectId", "name");
        disks.notEqualTo("delete", "True");
        return disks.find();
    }

}

module.exports = IncomeDisk;