// CU 12 13
// MT https://docs.google.com/spreadsheets/d/1geuVnd1ByaFLBXFXNAlN5PL-K0QVR2rq/edit?usp=sharing&ouid=103960253138118107632&rtpof=true&sd=true

const Constants = require("../constants");

class Incident {
    /**
   * registerCompleted
   * @description Register new partInventory
   * @param id_worker: Id of the worker that fix the part
   * @param completeNumber: Number of confirmed parts
   * @param is_process: Id of the process that fix
   * @param is_part: Id of the part fixed
   * @param id_product: Id of the model and aluminium fixed
   * @param status: Status (pending, confirmed, scrap, rejected)
   * @param is_incident: Bool to know if its an incident
   * @param is_second: Bool to know if its a second product
   * @returns Parse object with all data
   */
    static registerCompleted(id_worker, completedNumber, id_process, id_part, id_product, status, is_incident, is_second) {

        const Part = Parse.Object.extend("Part");
        const pointerToPart = new Part();
        pointerToPart.id = id_part;

        const Worker = Parse.Object.extend("Worker");
        const pointerToWorker = new Worker();
        pointerToWorker.id = id_worker;

        const Product = Parse.Object.extend("Product");
        const pointerToProduct = new Product();
        pointerToProduct.id = id_product;

        const newRegist = new Parse.Object(Constants.PartInventory);
        newRegist.set('id_worker', pointerToWorker);
        newRegist.set('number', completedNumber);
        newRegist.set('id_process', id_process);
        newRegist.set('id_part', pointerToPart);
        newRegist.set('id_product', pointerToProduct);
        newRegist.set('status', status);
        newRegist.set('is_incident', is_incident);
        newRegist.set('is_second', is_second);

        return newRegist;
    }

    /**
    * modifyIncident
    * @description Register new partInventory
    * @param id_incident: Id of the incident
    */
    static modifyIncident(id_incident) {
        const modRegist = new Parse.Object(Constants.PartInventory);
        modRegist.set('objectId', id_incident);
        modRegist.set('status', 'confirmed');

        return modRegist;
    }

}

module.exports = Incident;