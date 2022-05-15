class Worker
{
    constructor(pAssignObj)
    {
        this.id = pAssignObj.id;
        /*TODO make all the field*/
    }

    /**
   * getAllParts
   * @description Query to get all existing workers
   * @returns Parse object with name and Id of the parts in table "Workers"
   */
    static getAllWorkers(){
        const workers = new Parse.Query("Worker");
        workers.select("objectId", "nick_name");
        workers.equalTo("id_process", "Rechazado");
        return workers.find();
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