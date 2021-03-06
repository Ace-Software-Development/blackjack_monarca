// CU 14 51 52 53 16
// MT https://docs.google.com/spreadsheets/d/1geuVnd1ByaFLBXFXNAlN5PL-K0QVR2rq/edit?usp=sharing&ouid=103960253138118107632&rtpof=true&sd=true

class ProductOrder {
    /**
   * registerProductOrder
   * @description Register new product order
   * @param number: Number of products registered
   * @param catName: Name of the category registered
   * @param modName: Name of the model registered
   * @returns Parse object
   */
    static registerProductOrder(orderId, id_product, number) {
        const productOrder = new Parse.Object("ProductOrder");

        var Order = Parse.Object.extend("Order");
        var pointerToOrder = new Order();
        pointerToOrder.id = orderId;

        var Product = Parse.Object.extend("Product");
        var pointerToProduct = new Product();
        pointerToProduct.id = id_product;

        productOrder.set('orderId', pointerToOrder);
        productOrder.set('id_product', pointerToProduct);
        productOrder.set('number', parseInt(number));
        return productOrder;
    }

    /**
* modifyProductOrder
* @description Register new product order
* @param number: Number of products registered
* @param id: product to delete in order
* @returns Parse object
*/
    static modifyProductOrder(id, number) {
        const productOrder = new Parse.Object("ProductOrder");
        productOrder.set("objectId", id);
        productOrder.set('number', parseInt(number));
        return productOrder;
    }

    /**
* deleteProductOrder
* @description Delete product in order
* @param id: Of product in order to delete
* @returns Parse object
*/
    static deleteProductOrder(id) {
        const productOrder = new Parse.Object("ProductOrder");
        productOrder.set("objectId", id);
        return productOrder.destroy();
    }

    /**
   * getProductOrderById
   * @description Get a product order with its id
   * @param objectId: id of the product order
   * @returns Json with order, product and category info
   */
    static getProductOrderById(objectId) {
        const productOrder = new Parse.Query("ProductOrder");

        var Order = Parse.Object.extend("Order");
        var pointerToOrder = new Order();
        pointerToOrder.id = objectId;

        productOrder.equalTo("orderId", pointerToOrder);
        productOrder.include("orderId");
        productOrder.include("id_product");
        productOrder.include("id_product.id_category");


        return productOrder.find();
    }
}

module.exports = ProductOrder;