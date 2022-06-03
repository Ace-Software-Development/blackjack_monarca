class Category {
    constructor(pAssignObj) {
        this.id = pAssignObj.id;
        /*TODO make all the field*/
    }
    /**
* registerIncomingDisk
* @description Register new incoming disk
* @param number: Number of disks registered
* @param id_disk: Id of the disks registered
* @returns Parse object with number and id_disk
*/
    static registerCategory(name) {
        const category = new Parse.Object("Category");
        category.set('name', name);

        return category;
    }

    /**
* registerIncomingDisk
* @description Register new incoming disk
* @param number: Number of disks registered
* @param id_disk: Id of the disks registered
* @returns Parse object with number and id_disk
*/
    static modifyCategory(name, id) {
        console.log("cos que no sirve");
        const category = new Parse.Object("Category");
        category.set('objectId', id);
        category.set('name', name);

        return category;
    }

    /**
* registerIncomingDisk
* @description Register new incoming disk
* @param number: Number of disks registered
* @param id_disk: Id of the disks registered
* @returns Parse object with number and id_disk
*/
    static deleteCategory(id) {
        const category = new Parse.Object("Category");
        category.set('objectId', id);
        category.destroy();

        return category;
    }


}

module.exports = Category;
