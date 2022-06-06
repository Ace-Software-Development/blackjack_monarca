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
        orders.include("id_buyer");
        orders.equalTo("objectId", objectId);
        return orders.first();
    }

    /**
   * registerOrder
   * @description Register new order
   * @param name: Name of order
   * @param buyer: Buyer who requested an order
   * @returns Parse object with name and buyer of an order
   */
    static registerOrder(name, id_buyer, date) {
        var Buyer = Parse.Object.extend("Buyer");
        var pointerToBuyer = new Buyer();
        pointerToBuyer.id = id_buyer;

        const order = new Parse.Object("Order");
        order.set('name', name);
        order.set('id_buyer', pointerToBuyer);
        order.set('possible_day', date);
        return order;
    }

    /**
* modifyOrder
* @description Register new order
* @param name: Name of order
* @param buyer: Buyer who requested an order
* @returns Parse object with name and buyer of an order
*/
    static modifyOrder(name, id_buyer, date, id) {
        var Buyer = Parse.Object.extend("Buyer");
        var pointerToBuyer = new Buyer();
        pointerToBuyer.id = id_buyer;

        const order = new Parse.Object("Order");
        order.set('objectId', id);
        order.set('name', name);
        order.set('id_buyer', pointerToBuyer);
        order.set('possible_day', date);
        return order;
    }

    /**
* deleteOrder
* @description Delete order
* @param id: Id of the order
* @returns Parse object
*/
    static deleteOrder(id) {
        const order = new Parse.Object("Order");
        order.set('objectId', id);
        order.set("delete", true);
        return order;
    }

}

module.exports = Order;