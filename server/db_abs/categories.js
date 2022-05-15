class Category
{
    constructor(pAssignObj)
    {
        this.id = pAssignObj.id;
        /*TODO make all the field*/
    }

    /**
   * getAllCategories
   * @description Query to get all existing categories
   * @returns Parse object with name and Id of the parts in table "Categories"
   */
    static getAllCategories(){
        const categories = new Parse.Query("Category");
        categories.select("objectId", "name");
        return categories.find();
    }


    static getEmpty()
    {
        return new Category({id:null});/*TODO make all the field*/
    }

    static getById(id)
    {
        let oCategory = Category.getEmpty();
        /*TODO implement*/
        return oCategory;
    }

    static getByAssign(process)
    {
        let listCategory = [];
        /*TODO implement*/
        return listCategory;
    }

    add()
    {

    }

    delete()
    {

    }
}

module.exports = Category;