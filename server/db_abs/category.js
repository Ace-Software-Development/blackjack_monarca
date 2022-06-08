// CU 38 39 40 41
// MT https://docs.google.com/spreadsheets/d/1geuVnd1ByaFLBXFXNAlN5PL-K0QVR2rq/edit?usp=sharing&ouid=103960253138118107632&rtpof=true&sd=true

class Category {
    constructor(pAssignObj) {
        this.id = pAssignObj.id;
        /*TODO make all the field*/
    }
    /**
* registerCategory
* @description Register new category
* @param name: Name of category registered
* @returns Parse object
*/
    static registerCategory(name) {
        const category = new Parse.Object("Category");
        category.set('name', name);
        category.set("delete", false);

        return category;
    }

    /**
* modifyCategory
* @description Modify category
* @param name: name of category
* @param id: Id of category
* @returns Parse object
*/
    static modifyCategory(name, id) {
        console.log("cos que no sirve");
        const category = new Parse.Object("Category");
        category.set('objectId', id);
        category.set('name', name);

        return category;
    }

    /**
* deleteCategory
* @description Delete a category
* @param id: id of category
* @returns Parse object
*/
    static deleteCategory(id) {
        const category = new Parse.Object("Category");
        category.set('objectId', id);
        category.set("delete", true);

        return category;
    }


}

module.exports = Category;
