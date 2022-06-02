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
        return workers.find();
    }

    /**
* getAllWorkers
* @description Query to get all existing workers
* @returns Parse object with name and Id of the parts in table "Workers"
*/
    static getAllWorkersWOP() {
        const workers = new Parse.Query(Constants.Worker);
        return workers.find();
    }

    /**
* registerIncomingDisk
* @description Register new incoming disk
* @param number: Number of disks registered
* @param id_disk: Id of the disks registered
* @returns Parse object with number and id_disk
*/
    static registerWorker(name, nick_name, id_process) {
        const worker = new Parse.Object(Constants.Worker);
        worker.set('name', name);
        worker.set('nick_name', nick_name);
        worker.set('id_process', id_process);

        return worker;
    }

    /**
* registerIncomingDisk
* @description Register new incoming disk
* @param number: Number of disks registered
* @param id_disk: Id of the disks registered
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
* registerIncomingDisk
* @description Register new incoming disk
* @param number: Number of disks registered
* @param id_disk: Id of the disks registered
* @returns Parse object with number and id_disk
*/
    static deleteWorker(id) {
        const worker = new Parse.Object(Constants.Worker);
        worker.set('objectId', id);
        worker.destroy();

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