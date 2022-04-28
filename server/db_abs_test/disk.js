class Disk
{
    constructor(AssignObj)
    {
        this.Id = AssignObj.Id;
        this.Name = AssignObj.Name;
        this.Delete = AssignObj.Delete;
        /*TODO make all the field*/
    }

    static getEmpty()
    {
        return new Disk({Id:null, Name:null, Delete:false});/*TODO make all the field*/
    }

    static getById(Id)
    {
        let oDisk = Disk.getEmpty();
        /*TODO implement*/
        return oDisk;
    }

    static getByName_NonDelete(NameMatch)
    {
        let listDisk = [];
        /*TODO implement*/
        return listDisk;
    }

    static getAll_NonDelete(NameMatch)
    {
        let listDisk = [{Id:1, Name: "name1", Delete: false}, {Id:2, Name: "name2", Delete: false}];
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