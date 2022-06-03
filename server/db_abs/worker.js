const Constants = require('../constants');

class Worker
{
    constructor(pAssignObj)
    {
        this.id = pAssignObj.id;
        /*TODO make all the field*/
    }

    /**
   * getAllWorkers
   * @description Query to get all existing workers
   * @returns Parse object with name and Id of the parts in table "Workers"
   */
    static getAllWorkers(process){
        const workers = new Parse.Query(Constants.Worker);
        workers.select("objectId", "nick_name");
        workers.equalTo("id_process", process);
        return workers.find();
    }

     /**
   * getWorkerById
   * @description Query to get a worker by id
   * @returns Parse object with name and Id of the parts in table "Workers"
   */
    static getWorkerById(id){
        const worker = new Parse.Query(Constants.Worker);
        worker.select("nick_name");
        worker.equalTo("objectId", id);

        return worker.first();
    }

    /**
    * getAllWorkersQuery
    * @description Query to get all existing models
    * @param categoryId Id of category of model
    * @returns Parse object with name and Id of the parts in table "Products" with category category
    */
    static getAllWorkersQuery() {
        var query = new Parse.Query(Constants.Worker);
        query.notEqualTo("delete", true);
        return query.find();
    }

    static getEmpty()
    {
        return new Worker({id:null});/*TODO make all the field*/
    }

    static getById(id)
    {
        let oWorker = Worker.getEmpty();
        /*TODO implement*/
        return oWorker;
    }

    static getByAssign(process)
    {
        let listWorker = [];
        /*TODO implement*/
        return listWorker;
    }

    add()
    {

    }

    delete()
    {

    }
}

module.exports = Worker;
