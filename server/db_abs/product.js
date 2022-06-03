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
        products.ascending("id_category")
        return products.find();
    }

    /**
       * modifyProductInventory
       * @description Query to modify the state and quantity of a product
       * @returns Parse object with the new data of the product
       */
    static modifyProductInventory(with_lid, withOut_lid, id) {
        let product = new Parse.Object('Product');
        product.set('objectId', id);
        product.set('with_lid', parseInt(with_lid));
        product.set('withOut_lid', parseInt(withOut_lid));
        return product;
    }

    /**
   * modifyProductInventory
   * @description Query to modify the state and quantity of a product
   * @returns Parse object with the new data of the product
   */
    static postProduct(category, model, aluminium, key) {
        var Category = Parse.Object.extend("Category");
        var pointerToCategory = new Category();
        pointerToCategory.id = category;
        console.log("categoria", category);

        let product = new Parse.Object('Product');
        product.set('id_category', pointerToCategory);
        product.set('model', model);
        product.set('aluminium', aluminium);
        product.set('key', key);

        return product;
    }

    /**
   * modifyProductInventory
   * @description Query to modify the state and quantity of a product
   * @returns Parse object with the new data of the product
   */
    static modifyProduct(id, category, model, aluminium, key) {
        var Category = Parse.Object.extend("Category");
        var pointerToCategory = new Category();
        pointerToCategory.id = category;
        console.log("categoria", category);

        let product = new Parse.Object('Product');
        product.set('objectId', id);
        product.set('id_category', pointerToCategory);
        product.set('model', model);
        product.set('aluminium', aluminium);
        product.set('key', key);

        return product;
    }

    /**
* registerIncomingDisk
* @description Register new incoming disk
* @param number: Number of disks registered
* @param id_disk: Id of the disks registered
* @returns Parse object with number and id_disk
*/
    static deleteProduct(id) {
        const product = new Parse.Object("Product");
        product.set('objectId', id);
        product.destroy();

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