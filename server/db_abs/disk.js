class cDisk
{
    constructor(assign_obj)
    {
        this.id = assign_obj.id;
        /*TODO make all the field*/
    }

    static getEmpty()
    {
        return new cDisk({id:null});/*TODO make all the field*/
    }

    static getById(id)
    {
        let oDisk = cDisk.getEmpty();
        /*TODO implement*/
        return oDisk;
    }

    static getByName_NonDelete(name_match)
    {
        let listDisk = [];
        /*TODO implement*/
        return listDisk;
    }

    static getAll_NonDelete(name_match)
    {
        let listDisk = [];
        /*TODO implement*/
        return listDisk;
    }

    add()
    {
        /*TODO implement*/
    }

    delete()
    {
        /*TODO implement*/
    }
}