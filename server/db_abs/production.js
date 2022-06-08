// CU 20
// MT https://docs.google.com/spreadsheets/d/1geuVnd1ByaFLBXFXNAlN5PL-K0QVR2rq/edit?usp=sharing&ouid=103960253138118107632&rtpof=true&sd=true

class Production {
    /**
  * getProductionDay
  * @description Query to get all work done by an specific worker in a range of days
  * @param startDay first day of the interval
  * @param endDay last day of the interval
  * @param idWorker Id from a worker
  * @returns Parse object with all work don by a worker between dates
  */
    static getProductionDay(startDay, endDay, idWorker) {

        var Worker = Parse.Object.extend("Worker");
        var pointerToPart = new Worker();
        pointerToPart.id = idWorker;

        const parts = new Parse.Query("PartInventory");
        parts.equalTo("status", "confirmed");
        parts.greaterThanOrEqualTo('updatedAt', startDay);
        parts.lessThanOrEqualTo('updatedAt', endDay);
        parts.equalTo("id_worker", pointerToPart);
        return parts.find();
    }
}

module.exports = Production;
