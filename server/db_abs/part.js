class cPart
{
    constructor(assign_obj)
    {
        this.id = assign_obj.id;
        /*TODO make all the field*/
    }

    static getEmpty()
    {
        return new cPart({id:null});/*TODO make all the field*/
    }

    static getById(id)
    {
        let oPart = cPart.getEmpty();
        /*TODO implement*/
        return oPart;
    }

    add()
    {

    }

    delete()
    {
        
    }
}