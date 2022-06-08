// CU 30 31 33 34
// MT https://docs.google.com/spreadsheets/d/1geuVnd1ByaFLBXFXNAlN5PL-K0QVR2rq/edit?usp=sharing&ouid=103960253138118107632&rtpof=true&sd=true

const Constants = require('../constants');

class Worker {
    constructor(pAssignObj) {
        this.id = pAssignObj.id;
        /*TODO make all the field*/
    }

    /**
   * getAllWorkers
   * @description Query to get all existing workers
   * @returns Parse object with name and Id of the parts in table "Workers"
   */
    static getAllWorkers(process) {
        const workers = new Parse.Query(Constants.Worker);
        workers.select("objectId", "nick_name");
        workers.equalTo("id_process", process);
        workers.equalTo("delete", false);
        return workers.find();
    }

    /**
* getAllWorkers
* @description Query to get all existing workers
* @returns Parse object with name and Id of the parts in table "Workers"
*/
    static getAllWorkersWOP() {
        const workers = new Parse.Query(Constants.Worker);
        workers.equalTo("delete", false);
        return workers.find();
    }

    /**
* registerWorker
* @description Register new worker
* @param name: Name of worjer
* @param nick_name: nick of worker
* @param id_process: Id of the disks registered
* @returns Parse object
*/
    static registerWorker(name, nick_name, id_process) {
        const worker = new Parse.Object(Constants.Worker);
        worker.set('name', name);
        worker.set('nick_name', nick_name);
        worker.set('id_process', id_process);
        worker.set("delete", false);

        return worker;
    }

    /**
* registerIncomingDisk
* @description Modify worker
* @param name: Name of worker
* @param nick_name: nick of worker
* @param id_process: Id of the disks registered
* @returns Parse object with number and id_disk
*/
    static modifyWorker(name, nick_name, id_process, id) {
        const worker = new Parse.Object(Constants.Worker);
        worker.set('objectId', id);
        worker.set('name', name);
        worker.set('nick_name', nick_name);
        worker.set('id_process', id_process);

        return worker;
    }

    /**
* deleteWorker
* @description Delete worker
* @param id: Id of the worker
* @returns Parse object
*/
    static deleteWorker(id) {
        const worker = new Parse.Object(Constants.Worker);
        worker.set('objectId', id);
        worker.set("delete", true);
        return worker;
    }

    /**
  * getWorkerById
  * @description Query to get a worker by id
  * @returns Parse object with name and Id of the parts in table "Workers"
  */
    static getWorkerById(id) {
        const worker = new Parse.Query(Constants.Worker);
        worker.select("nick_name");
        worker.equalTo("objectId", id);

        return worker.first();
    }

    /**
    * getAllWorkersQuery
    * @description Query to get all active workers
    * @returns Parse object with name and Id of the workers in table "Worker"
    */
    static getAllWorkersQuery() {
        var query = new Parse.Query(Constants.Worker);
        query.notEqualTo("delete", true);
        return query.find();
    }

    static getEmpty() {
        return new Worker({ id: null });/*TODO make all the field*/
    }

    static getById(id) {
        let oWorker = Worker.getEmpty();
        /*TODO implement*/
        return oWorker;
    }

    static getByAssign(process) {
        let listWorker = [];
        /*TODO implement*/
        return listWorker;
    }

    add() {

    }

    delete() {

    }
}

module.exports = Worker;
