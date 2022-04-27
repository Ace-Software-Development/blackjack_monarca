class cFinishProduct
{
    constructor(assign_obj)
    {
        this.id = assign_obj.id;
        /*TODO make all the field*/
    }

    static getEmpty()
    {
        return new cFinishProduct({id:null});/*TODO make all the field*/
    }

    static getById(id)
    {
        let oFinishProduct = cFinishProduct.getEmpty();
        /*TODO implement*/
        return oFinishProduct;
    }

    add()
    {
        /*TODO implement*/
    }
}