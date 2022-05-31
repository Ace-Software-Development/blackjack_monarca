const Constants = require("../constants");

class Product {
    constructor(pAssignObj) {
        this.id = pAssignObj.id;
        /*TODO make all the field*/
    }

    /**
* getAllModels
* @description Query to get all existing models
* @param categoryId Id of category of model
* @returns Parse object with name and Id of the parts in table "Products" with category category
*/

    static getAllModels(categoryId) {
        var Category = Parse.Object.extend("Category");
        var pointerToCategory = new Category();
        pointerToCategory.id = categoryId;
        const models = new Parse.Query(Constants.Product);
        models.select("objectId", "model", "aluminium");
        models.equalTo("id_category", pointerToCategory);
        return models.find();
    }


    /**
* getModelById
* @description Query to get all existing models
* @param id Id of specific model
* @returns Parse object of the models in table "Product" 
*/
    static getModelById(id) {
        const model = new Parse.Query("Product");
        model.select("objectId", "model", "aluminium");
        model.equalTo("objectId", id);
        return model.first();
    }

    /**
* getAllProducts
* @description Query to get all existing products
* @returns Parse object of the products in table "Products" 
*/
    static getAllProducts() {
        const products = new Parse.Query("Product");

        products.include("id_category");

        products.ascending("id_category")

        return products.find();
    }

    static getEmpty() {
        return new Product({ id: null });/*TODO make all the field*/
    }

    static getById(id) {
        let oProduct = Product.getEmpty();
        /*TODO implement*/
        return oProduct;
    }

    static getByKey(key) {
        let oProduct = Product.getEmpty();
        /*TODO implement*/
        return oProduct;
    }

    static getByName(name) {
        let listProduct = [];
        /*TODO implement*/
        return listProduct;
    }

    static getByCategory(category) {
        let listProduct = [];
        /*TODO implement*/
        return listProduct;
    }

    add() {

    }

    remove() {

    }
}

module.exports = Product;