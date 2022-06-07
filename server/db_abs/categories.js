const Constants = require('../constants');

class Category {
    constructor(pAssignObj) {
        this.id = pAssignObj.id;
        /*TODO make all the field*/
    }

    /**
   * getAllCategories
   * @description Query to get all existing categories
   * @returns Parse object with name and Id of the parts in table "Categories"
   */
    static getAllCategories() {
        const categories = new Parse.Query(Constants.Category);
        categories.select("objectId", "name");
        categories.equalTo("delete", false);
        return categories.find();
    }

    /**
   * getCategoryById
   * @description Query to get a category with the id
   * @returns Parse object with name and Id of the parts in table "Categories"
   */
    static getCategoryById(id) {
        const categories = new Parse.Query(Constants.Category);
        categories.select("name");
        categories.equalTo("objectId", id);
        return categories.first();
    }


    static getEmpty() {
        return new Category({ id: null });/*TODO make all the field*/
    }


    static getById(id) {
        let oCategory = Category.getEmpty();
        /*TODO implement*/
        return oCategory;
    }

    static getByAssign(process) {
        let listCategory = [];
        /*TODO implement*/
        return listCategory;
    }

    add() {

    }

    delete() {

    }
}

module.exports = Category;