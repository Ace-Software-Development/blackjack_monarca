class PartInventory
{
    constructor(pAssignObj)
    {
        this.id = pAssignObj.id;
        /*TODO make all the field*/
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

    checkin()
    {
        /*TODO implement*/
    }
}

module.exports = PartInventory;