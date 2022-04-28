class Part
{
    constructor(AssignObj)
    {
        this.Id = AssignObj.Id;
        /*TODO make all the field*/
    }

    static getEmpty()
    {
        return new Part({Id:null});/*TODO make all the field*/
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