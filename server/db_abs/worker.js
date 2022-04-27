class cWorker
{
    constructor(assign_obj)
    {
        this.id = assign_obj.id;
        /*TODO make all the field*/
    }

    static getEmpty()
    {
        return new cWorker({id:null});/*TODO make all the field*/
    }

    static getById(id)
    {
        let oWorker = cWorker.getEmpty();
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