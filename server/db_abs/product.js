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
        var Foo = Parse.Object.extend("Category");
        var pointerToFoo = new Foo();
        pointerToFoo.id = categoryId;
        const models = new Parse.Query(Constants.Product);
        models.select("objectId", "model", "aluminium");
        models.equalTo("id_category", pointerToFoo);
        return models.find();
    }

    static getModelById(id)
    {
        const models = new Parse.Query(Constants.Product);
        models.select("objectId", "model", "aluminium");
        models.equalTo("objectId", id);
        return models.first();
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