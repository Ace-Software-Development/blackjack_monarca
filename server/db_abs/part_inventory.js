class cPartInventory
{
    constructor(assign_obj)
    {
        this.id = assign_obj.id;
        /*TODO make all the field*/
    }

    static getEmpty()
    {
        return new cPartInventory({id:null});/*TODO make all the field*/
    }

    static getById(id)
    {
        let oPartInventory = cPartInventory.getEmpty();
        /*TODO implement*/
        return oPartInventory;
    }

    static getByFromProcess(from_process)
    {
        let listPartInventory = [];
        /*TODO implement*/
        return listPartInventory;
    }

    static getByToProcess(to_process)
    {
        let listPartInventory = [];
        /*TODO implement*/
        return listPartInventory;
    }

    checkin()
    {
        /*TODO implement*/
    }
}

module.exports = cPartInventory;