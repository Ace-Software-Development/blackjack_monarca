// CU 15
// MT https://docs.google.com/spreadsheets/d/1geuVnd1ByaFLBXFXNAlN5PL-K0QVR2rq/edit?usp=sharing&ouid=103960253138118107632&rtpof=true&sd=true

const moment = require('moment');
class Merma {
    /**
   * getMerma
   * @description Query to get all scrap between dates
   * @returns Parse object with al scrap 
   */
    static getMerma(process) {
        const parts = new Parse.Query("PartInventory");
        parts.equalTo("id_process", process);
        parts.equalTo("status", "scrap");
        return parts.find();
    }

    /**
  * getMermaDate
  * @description Query to get all existing parts of merma in a range of dates
  * @param startDay first day of the interval
  * @param endDay last day of the interval
  * @returns Parse object with all merma between dates
  */
    static getMermaDate(startDay, endDay) {
        const parts = new Parse.Query("PartInventory");
        parts.equalTo("status", "scrap");
        parts.greaterThanOrEqualTo('updatedAt', startDay);
        parts.lessThanOrEqualTo('updatedAt', endDay);
        console.log("getMermaDate");
        console.log("start date: ", startDay);
        return parts.find();
    }
}

module.exports = Merma;
