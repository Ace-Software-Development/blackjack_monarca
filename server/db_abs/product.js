const Constants = require("../constants");

class Product
{
    constructor(pAssignObj)
    {
        this.id = pAssignObj.id;
        /*TODO make all the field*/
    }

    static getAllModels(categoryId)
    {
        var Category = Parse.Object.extend("Category");
        var pointerToCategory = new Category();
        pointerToCategory.id = categoryId;
        const models = new Parse.Query(Constants.Product);
        models.select("objectId", "model", "aluminium");
        models.equalTo("id_category", pointerToCategory);
        return models.find();
    }

    static getModelById(id)
    {
        const model = new Parse.Query("Product");
        model.select("objectId", "model", "aluminium");
        model.equalTo("objectId", id);
        return model.first();
    }

    static getEmpty()
    {
        return new Product({id:null});/*TODO make all the field*/
    }

    static getById(id)
    {
        let oProduct = Product.getEmpty();
        /*TODO implement*/
        return oProduct;
    }

    static getByKey(key)
    {
        let oProduct = Product.getEmpty();
        /*TODO implement*/
        return oProduct;
    }

    static getByName(name)
    {
        let listProduct = [];
        /*TODO implement*/
        return listProduct;
    }

    static getByCategory(category)
    {
        let listProduct = [];
        /*TODO implement*/
        return listProduct;
    }

    add()
    {

    }

    remove()
    {

    }
}

module.exports = Product;