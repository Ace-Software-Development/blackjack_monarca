class ProductOrder
{
    constructor(catName, modName, number)
    {
        this.catName = catName;
        this.modName =modName;
        this.number = number;
    }

    /**
   * registerIncomingDisk
   * @description Register new incoming disk
   * @param number: Number of products registered
   * @param catName: Name of the category registered
   * @param modName: Name of the model registered
   * @returns Parse object with number and id_disk
   */
    static registerProductOrder(catName, modName, number)
    {
        const productOrder = new Parse.Object("ProductOrder");
        productOrder.set('category_name', catName);
        productOrder.set('model_name', modName);
        productOrder.set('number', parseInt(number));
        return productOrder;
    }

    static getProductOrderById()
    {
        const productOrder = new Parse.Query("ProductOrder");
        productOrder.select("objectId", "category_name", "model_name", "number", "orderId");
        productOrder.equalTo("orderId", "auxOrderId");
        return productOrder.find();
    }

}

module.exports = ProductOrder;