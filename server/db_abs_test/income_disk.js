class IncomeDisk
{
    constructor(pAssignObj)
    {
        this.id = pAssignObj.id;
        /*TODO make all the field*/
    }

    static getEmpty()
    {
        return new cIncomeDisk({id:null});/*TODO make all the field*/
    }

    static getById(id)
    {
        let oIncomeDisk = oIncomeDisk.getEmpty();
        /*TODO implement*/
        return oIncomeDisk;
    }

    add()
    {

    }
}

module.exports = IncomeDisk;