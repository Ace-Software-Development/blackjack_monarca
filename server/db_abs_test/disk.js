class Disk
{
    constructor(pAssignObj)
    {
        this.id = pAssignObj.id;
        this.name = pAssignObj.name;
        this.delete = pAssignObj.delete;
        /*TODO make all the field*/
    }

    static getEmpty()
    {
        return new Disk({id:null, name:null, delete:false});/*TODO make all the field*/
    }

    static getById(id)
    {
        let oDisk = Disk.getEmpty();
        /*TODO implement*/
        return oDisk;
    }

    static getByName_NonDelete(name)
    {
        let listDisk = [];
        /*TODO implement*/
        return listDisk;
    }

    static getAll_NonDelete(name)
    {
        let listDisk = [{id:1, name: "name1", delete: false}, {id:2, name: "name2", delete: false}];
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

module.exports = Disk;