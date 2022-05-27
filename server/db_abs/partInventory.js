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
   * @param id_part: Number of disks registered
   * @param id_worker: Id of the disks registered
   * @param id_process: Number of disks registered
   * @param id_product: Id of the disks registered
   * @param number: Id of the disks registered
   * @param is_second: stat of part
   * @returns Parse object with number and id_disk
   */
     static registerPart(id_part, id_worker, id_process, number, id_product, is_second){

        var Part = Parse.Object.extend("Part");
        var pointerToPart = new Part();
        pointerToPart.id = id_part;

        var Worker = Parse.Object.extend("Worker");
        var pointerToWorker = new Worker();
        pointerToWorker.id = id_worker;

        var Product = Parse.Object.extend("Product");
        var pointerToProduct = new Product();
        pointerToProduct.id = id_product;

        const part = new Parse.Object(Constants.PartInventory);
        part.set('id_part', pointerToPart);
        part.set('id_worker', pointerToWorker);
        part.set('id_process', id_process);
        part.set('number', parseInt(number));
        part.set('id_product', pointerToProduct);
        part.set('is_second', is_second);
        part.set('status', 'pending');
        return part;
    }

    /**
   * getAllRegisters
   * @description Get al registers
   * @param id_process: to which process it belongs
   * @param is_second: stat of part
   * @returns Parse object with number and id_disk
   */
    static getAllRegisters(id_process, is_second, status){
        const query = new Parse.Query("PartInventory");

        query.equalTo("is_second", is_second);
        query.equalTo("status", status);
        query.equalTo("id_process", id_process);

        query.include("id_worker");
        query.include("id_product");
        query.include("id_product.id_category");
        query.include("id_part");

        console.log(query);

        return query.find();
    }

     /**
   * getAllIncidentRegisters
   * @description Get al registers
   * @param is_second: stat of part
   * @returns Parse object with number and id_disk
   */
      static getAllIncidentRegisters(is_second, status){
        const query = new Parse.Query("PartInventory");

        query.equalTo("is_second", is_second);
        query.equalTo("status", status);

        query.include("id_worker");
        query.include("id_product");
        query.include("id_product.id_category");
        query.include("id_part");

        console.log(query);

        return query.find();
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