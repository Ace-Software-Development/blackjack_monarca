// CU 14 Consultar pedido

const Constants = require('../constants');

class Order {
    constructor(pAssignObj) {
        this.id = pAssignObj.id;
        /*TODO make all the field*/
    }

    /**
   * getAllOrders
   * @description Query to get all existing orders
   * @returns Parse object with name and Id of the orders in table "Order"
   */
    static getAllOrders() {
        const orders = new Parse.Query("Order");
        orders.select("name", "objectId", "id_buyer", "is_Delivered");
        orders.include("id_buyer");
        orders.equalTo("is_Delivered", false);
        orders.equalTo("delete", false);
        return orders.find();
    }

    /**
   * getOrderById
   * @description Query to get existing order with id
   * @returns Parse object with name and Id of the order in table "Order"
   */
    static getOrderById(objectId) {
        const orders = new Parse.Query("Order");
        orders.select("name", "objectId", "id_buyer", "is_Delivered");
        orders.include("id_buyer");
        orders.equalTo("objectId", objectId);
        return orders.first();
    }

}

module.exports = Order;