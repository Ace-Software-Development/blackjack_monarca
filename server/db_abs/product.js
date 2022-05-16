class Product
{
    constructor(pAssignObj)
    {
        this.id = pAssignObj.id;
        /*TODO make all the field*/
    }

    static getAllModels()
    {
        
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