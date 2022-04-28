class IncomeDisk
{
    constructor(AssignObj)
    {
        this.Id = AssignObj.Id;
        /*TODO make all the field*/
    }

    static getEmpty()
    {
        return new cIncomeDisk({Id:null});/*TODO make all the field*/
    }

    static getById(Id)
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