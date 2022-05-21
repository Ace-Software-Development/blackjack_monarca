const Constants = require('../constants');

class PartInventory
{
    constructor(pAssignObj)
    {
        this.id = pAssignObj.id;
        /*TODO make all the field*/
    }

    /**
   * registerPart
   * @description Register incoming part
   * @param number: Number of disks registered
   * @param id_disk: Id of the disks registered
   * @returns Parse object with number and id_disk
   */
     static registerPart(id_part, id_worker, id_process, number, id_product, is_second){
        const part = new Parse.Object(Constants.PartInventory);
        part.set('id_part', id_part);
        part.set('id_worker', id_worker);
        part.set('id_process', id_process);
        part.set('number', parseInt(number));
        part.set('id_product', id_product);
        part.set('is_second', is_second);
        return part;
    }

    static getEmpty()
    {
        return new PartInventory({id:null});/*TODO make all the field*/
    }

    static getById(id)
    {
        let oPartInventory = PartInventory.getEmpty();
        /*TODO implement*/
        return oPartInventory;
    }

    static getByFromProcess(fromProcess)
    {
        let listPartInventory = [];
        /*TODO implement*/
        return listPartInventory;
    }

    static getByToProcess(toProcess)
    {
        let listPartInventory = [];
        /*TODO implement*/
        return listPartInventory;
    }

}

module.exports = PartInventory;