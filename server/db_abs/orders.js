const Constants = require('../constants');

class Order
{
    constructor(pAssignObj)
    {
        this.id = pAssignObj.id;
        /*TODO make all the field*/
    }

    /**
   * getAllCategories
   * @description Query to get all existing orders
   * @returns Parse object with name and Id of the parts in table "Order"
   */
    static getAllOrders(){
        const orders = new Parse.Query("Order");
        orders.select("objectId", "id_buyer", "city_buyer", "is_Delivered");
        orders.include("id_buyer");
        orders.equalTo("is_Delivered", false);
        return orders.find();
    }

}

module.exports = Order;