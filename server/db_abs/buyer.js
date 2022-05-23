class Buyer
{
    constructor(pAssignObj)
    {
        this.id = pAssignObj.id;
        /*TODO make all the field*/
    }

    /**
   * getAllBuyers
   * @description Query to get all existing buyers
   * @returns Parse object with name and Id of the parts in table "Buyers"
   */
    static getAllBuyers(){
        const buyers = new Parse.Query("Buyer");
        buyers.select("name", "city", "phone", "mail", "delete");
        buyers.equalTo("delete", false);
        return buyers.find();
    }
}

module.exports = Buyer;