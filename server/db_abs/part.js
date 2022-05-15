class Part
{
    constructor(pAssignObj)
    {
        this.id = pAssignObj.id;
        /*TODO make all the field*/
    }

    /**
   * getAllParts
   * @description Query to get all existing parts
   * @returns Parse object with name and Id of the parts in table "Parts"
   */
    static getAllParts(){
        const parts = new Parse.Query("Part");
        parts.select("objectId", "name");
        return parts.find();
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