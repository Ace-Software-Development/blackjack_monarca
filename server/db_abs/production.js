class Production
{
     /**
   * getProductionDay
   * @description Query to get all existing parts of merma in a range of dates
   * @param startDay first day of the interval
   * @param endDay last day of the interval
   * @returns Parse object with all merma between dates
   */
    static getProductionDay(startDay, endDay, idWorker){

        var Worker = Parse.Object.extend("Worker");
        var pointerToPart = new Worker();
        pointerToPart.id = idWorker;

        const parts = new Parse.Query("PartInventory");
        parts.equalTo("status", "confirmed");
        parts.greaterThanOrEqualTo('updatedAt', startDay);
        parts.lessThanOrEqualTo('updatedAt', endDay);
        parts.equalTo("id_worker",pointerToPart);
        return parts.find();
    } 
}

module.exports = Production;
