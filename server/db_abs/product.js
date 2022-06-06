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
        model.equalTo("objectId", id);
        model.include("id_category");
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
        products.equalTo('delete', false);
        products.ascending("id_category");
        return products.find();
    }

    /**
       * modifyProductInventory
       * @description Query to modify the state and quantity of a product
       * @param with_lid: number with lid
       * @param withOut_lid: number with Out lid
       * @param id: id of product
       * @returns Parse object
       */
    static modifyProductInventory(with_lid, withOut_lid, id) {
        let product = new Parse.Object('Product');
        product.set('objectId', id);
        product.set('with_lid', parseInt(with_lid));
        product.set('withOut_lid', parseInt(withOut_lid));
        return product;
    }

    /**
   * postProduct
   * @description Query to create a new product
   * @returns Parse object
   */
    static postProduct(category, model, aluminium, key) {
        var Category = Parse.Object.extend("Category");
        var pointerToCategory = new Category();
        pointerToCategory.id = category;

        let product = new Parse.Object('Product');
        product.set('id_category', pointerToCategory);
        product.set('model', model);
        product.set('aluminium', aluminium);
        product.set('key', key);
        product.set('with_lid', 0);
        product.set('withOut_lid', 0);
        product.set('delete', false);

        return product;
    }

    /**
   * modifyProduct
   * @description Query to modify the state and quantity of a product
    * @param model: model
    * @param aluminium: aluminium of product
    * @param key: key of product
    * @param id: id of product
   * @returns Parse object with the new data of the product
   */
    static modifyProduct(id, category, model, aluminium, key) {
        var Category = Parse.Object.extend("Category");
        var pointerToCategory = new Category();
        pointerToCategory.id = category;

        let product = new Parse.Object('Product');
        product.set('objectId', id);
        product.set('id_category', pointerToCategory);
        product.set('model', model);
        product.set('aluminium', aluminium);
        product.set('key', key);

        return product;
    }

    /**
* deleteProduct
* @description Delete product
* @param id: id of product
* @returns Parse object
*/
    static deleteProduct(id) {
        const product = new Parse.Object("Product");
        product.set('objectId', id);
        product.set("delete", true);
        return product;
    }

    /**
    * getProductById
    * @description Query to get the product by the id
    * @param id Id of specific mproduct
    * @returns Parse object of the product
    */
    static getProductById(id) {
        const product = new Parse.Query("Product");
        product.equalTo("objectId", id);
        product.include("id_category");
        return product.first();
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