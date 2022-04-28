class FinishProduct
{
    constructor(AssignObj)
    {
        this.Id = AssignObj.Id;
        /*TODO make all the field*/
    }

    static getEmpty()
    {
        return new FinishProduct({Id:null});/*TODO make all the field*/
    }

    static getById(Id)
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