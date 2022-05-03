class Worker
{
    constructor(pAssignObj)
    {
        this.id = pAssignObj.id;
        /*TODO make all the field*/
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