// CU 39
// MT https://docs.google.com/spreadsheets/d/1geuVnd1ByaFLBXFXNAlN5PL-K0QVR2rq/edit?usp=sharing&ouid=103960253138118107632&rtpof=true&sd=true

const Constants = require('../constants');

class Category {
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

}

module.exports = Category;