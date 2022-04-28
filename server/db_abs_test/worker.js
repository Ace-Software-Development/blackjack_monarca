class Worker
{
    constructor(AssignObj)
    {
        this.Id = AssignObj.Id;
        /*TODO make all the field*/
    }

    static getEmpty()
    {
        return new Worker({Id:null});/*TODO make all the field*/
    }

    static getById(Id)
    {
        let oWorker = Worker.getEmpty();
        /*TODO implement*/
        return oWorker;
    }

    static getByAssign(Process)
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