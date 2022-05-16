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

    /**
   * registerIncomingDisk
   * @description Register new incoming disk
   * @param number: Number of disks registered
   * @param id_disk: Id of the disks registered
   * @returns Parse object with number and id_disk
   */
    static registerIncomingDisk(number, id_disk){
        const incomeDisk = new Parse.Object(Constants.IncomeDisk);
        incomeDisk.set('number', parseInt(number));
        incomeDisk.set('id_disk', id_disk);
        return incomeDisk;
    }

    /**
   * getAllDisks
   * @description Query to get all existing disks
   * @returns Parse object with name and Id of the disks in table "Disks"
   */
    static getAllDisks(){
        const disks = new Parse.Query(Constants.Disk);
        disks.select("objectId", "name");
        disks.notEqualTo("delete", "True");
        return disks.find();
    }

    static getDisksQuantity(){
        var disks = {};
        const inventoryQuery = new Parse.Query(Constants.IncomeDisk);
        inventoryQuery.equalTo("id_disk", "CfPcQ4ivgE")
        inventoryQuery.each(
            function (result) {
                var num = result.get("number");
                if (result.get("CfPcQ4ivgE") in disks) {
                    disks[result.get("CfPcQ4ivgE")] += num;
                }
                else {
                    disks[result.get("CfPcQ4ivgE")] = num;
                }
            }, {
            success: function () {
                return disks;
            },
            error: function (error) {
                response.error("Query failed. Error = " + error.message);
            }
        });
        return disks;
    }
}

module.exports = IncomeDisk;