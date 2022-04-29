class Part
{
    constructor(pAssignObj)
    {
        this.id = pAssignObj.id;
        /*TODO make all the field*/
    }

    static getEmpty()
    {
        return new Part({id:null});/*TODO make all the field*/
    }

    static getById(id)
    {
        let oPart = Part.getEmpty();
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

module.exports = Part;