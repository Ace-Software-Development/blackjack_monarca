const Constants = require("../constants");

class Product {
    constructor(pAssignObj) {
        this.id = pAssignObj.id;
        /*TODO make all the field*/
    }

    modifyProductInventoryController = async function (request, response, id, with_lid, without_lid) {
        
        try{
            const Product = new Parse.Object(Constants.Product);
            Product.set('objectId', id);
    
            const model = new Parse.Query("Product");
            model.equalTo('objectId', id);
    
            let result = await model.first();
    
            result.set("with_lid", result.get("with_lid") + pareInt(with_lid));
            result.set("withOut_lid", result.get("withOut_lid") + pareInt(without_lid));
    
            await result.save();
            
            response.status(200).send({ status: "success", data: result });
        } catch {
            response.status(500).send({status:"can't save"})
        }
    }

    static getAllModels(categoryId) {
        var Category = Parse.Object.extend("Category");
        var pointerToCategory = new Category();
        pointerToCategory.id = categoryId;
        const models = new Parse.Query(Constants.Product);
        models.select("objectId", "model", "aluminium");
        models.equalTo("id_category", pointerToCategory);
        return models.find();
    }

    static getModelById(id) {
        const model = new Parse.Query("Product");
        model.select("objectId", "model", "aluminium");
        model.equalTo("objectId", id);
        return model.first();
    }

    static getAllProducts() {
        const products = new Parse.Query("Product");

        products.include("id_category");

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