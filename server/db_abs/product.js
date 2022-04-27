class cProduct
{
    constructor(assign_obj)
    {
        this.id = assign_obj.id;
        /*TODO make all the field*/
    }

    static getEmpty()
    {
        return new cProduct({id:null});/*TODO make all the field*/
    }

    static getById(id)
    {
        let oProduct = cProduct.getEmpty();
        /*TODO implement*/
        return oProduct;
    }

    static getByKey(key)
    {
        let oProduct = cProduct.getEmpty();
        /*TODO implement*/
        return oProduct;
    }

    static getByName(match_name)
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