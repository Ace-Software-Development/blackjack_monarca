class Product
{
    constructor(AssignObj)
    {
        this.Id = AssignObj.Id;
        /*TODO make all the field*/
    }

    static getEmpty()
    {
        return new Product({Id:null});/*TODO make all the field*/
    }

    static getById(Id)
    {
        let oProduct = Product.getEmpty();
        /*TODO implement*/
        return oProduct;
    }

    static getByKey(Key)
    {
        let oProduct = Product.getEmpty();
        /*TODO implement*/
        return oProduct;
    }

    static getByName(MatchName)
    {
        let listProduct = [];
        /*TODO implement*/
        return listProduct;
    }

    static getByCategory(Category)
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