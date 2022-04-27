class cIncomeDisk
{
    constructor(assign_obj)
    {
        this.id = assign_obj.id;
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