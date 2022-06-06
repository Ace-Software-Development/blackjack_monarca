class Disk {
    constructor(pAssignObj) {
        this.id = pAssignObj.id;
        /*TODO make all the field*/
    }
    /**
* registerCategory
* @description Register new disk
* @param name: Name of disk registered
* @returns Parse object
*/
    static registerDisk(name) {
        const disk = new Parse.Object("Disk");
        disk.set('name', name);
        disk.set("delete", false);

        return disk;
    }

    /**
* modifyCategory
* @description Modify disk
* @param name: name of disk
* @param id: Id of disk
* @returns Parse object
*/
    static modifyDisk(name, id) {
        const disk = new Parse.Object("Disk");
        disk.set('objectId', id);
        disk.set('name', name);

        return disk;
    }

    /**
* deleteCategory
* @description Delete a disk
* @param id: id of disk
* @returns Parse object
*/
    static deleteDisk(id) {
        const disk = new Parse.Object("Disk");
        disk.set('objectId', id);
        disk.set("delete", true);

        return disk;
    }


}

module.exports = Disk;
