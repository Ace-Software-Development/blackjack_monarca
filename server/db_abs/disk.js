// CU 43 44 45
// MT https://docs.google.com/spreadsheets/d/1geuVnd1ByaFLBXFXNAlN5PL-K0QVR2rq/edit?usp=sharing&ouid=103960253138118107632&rtpof=true&sd=true

class Disk {
    constructor(pAssignObj) {
        this.id = pAssignObj.id;
        /*TODO make all the field*/
    }
    /**
* registerDisk
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
* modifyDisk
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
