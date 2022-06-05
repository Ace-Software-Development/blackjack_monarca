// CU 14 Consultar pedido
class ProductOrder
{
    constructor(catName, modName, number)
    {
        this.catName = catName;
        this.modName =modName;
        this.number = number;
    }

    /**
   * registerProductOrder
   * @description Register new product order
   * @param number: Number of products registered
   * @param catName: Name of the category registered
   * @param modName: Name of the model registered
   * @returns Parse object
   */
    static registerProductOrder(catName, modName, number)
    {
        const productOrder = new Parse.Object("ProductOrder");
        productOrder.set('category_name', catName);
        productOrder.set('model_name', modName);
        productOrder.set('number', parseInt(number));
        return productOrder;
    }

    /**
   * getProductOrderById
   * @description Get a product order with its id
   * @param objectId: id of the product order
   * @returns Json with order, product and category info
   */
    static getProductOrderById(objectId)
    {
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

     /**
   * getProductOrderById
   * @description Get a product order with its id
   * @param objectId: id of the product order
   * @returns Json with order, product and category info
   */
      static getProductOrderNumberById(objectId)
      {
          const productOrder = new Parse.Query("ProductOrder");
  
          var Order = Parse.Object.extend("Order");
          var pointerToOrder = new Order();
          pointerToOrder.id = objectId;
  
          productOrder.equalTo("orderId", pointerToOrder);
  
          return productOrder.find({useMasterKey: true});
      }

}

module.exports = ProductOrder;