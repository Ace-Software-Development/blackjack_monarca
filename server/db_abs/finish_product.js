class FinishProduct
{
    constructor(pAssignObj)
    {
        this.id = pAssignObj.id;
        /*TODO make all the field*/
    }

    static getEmpty()
    {
        return new FinishProduct({id:null});/*TODO make all the field*/
    }

    static getById(id)
    {
        let oFinishProduct = FinishProduct.getEmpty();
        /*TODO implement*/
        return oFinishProduct;
    }

    add()
    {
        /*TODO implement*/
    }
}

module.exports = FinishProduct;