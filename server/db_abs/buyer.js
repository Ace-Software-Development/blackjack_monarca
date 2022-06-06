class Buyer {
    constructor(pAssignObj) {
        this.id = pAssignObj.id;
        /*TODO make all the field*/
    }
    /**
* registerBuyer
* @description Register new buyer
* @param name: Name of buyer registered
* @param mail: mail of buyer registered
* @param city: city of buyer registered
* @param phone: phone of buyer registered
* @returns Parse object
*/
    static registerBuyer(name, mail, city, phone, address) {
        const buyer = new Parse.Object("Buyer");
        buyer.set('name', name);
        buyer.set('city', city);
        buyer.set('phone', parseInt(phone));
        buyer.set('mail', mail);
        buyer.set('address', address);
        buyer.set("delete", false);

        return buyer;
    }

    /**
* getAllBuyer
* @description Query to get all existing buyers
* @returns Parse object
*/
    static getAllBuyer() {
        const buyers = new Parse.Query("Buyer");
        buyers.equalTo("delete", false);
        return buyers.find();
    }

    /**
* registerBuyer
* @description Register new buyer
* @param name: Name of buyer registered
* @param mail: mail of buyer registered
* @param city: city of buyer registered
* @param phone: phone of buyer registered
* @returns Parse object
*/
    static modifyBuyer(name, mail, city, phone, id) {
        const buyer = new Parse.Object("Buyer");
        buyer.set('objectId', id);
        buyer.set('name', name);
        buyer.set('city', city);
        buyer.set('phone', parseInt(phone));
        buyer.set('mail', mail);
        buyer.set('address', address);
        buyer.set("delete", false);

        return buyer;
    }

    /**
* deleteBuyer
* @description Delete a buyer
* @param id: id of buyer
* @returns Parse object
*/
    static deleteBuyer(id) {
        const buyer = new Parse.Object("Buyer");
        buyer.set('objectId', id);
        buyer.set("delete", true);

        return buyer;
    }


}

module.exports = Buyer;
