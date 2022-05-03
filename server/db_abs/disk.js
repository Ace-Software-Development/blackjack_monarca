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
        let listDisk = [];
        /*TODO implement*/
        return listDisk;
        /*
        return db.execute('SELECT * FROM Disk')
        .then(([rows, fieldData]) => {
            let listDisk = [...rows];
            return listDisk;
        })
        .catch(err => {
            console.log(err);
        });
        */
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