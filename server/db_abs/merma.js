class Merma
{
    /**
   * getMerma
   * @description Query to get all existing parts
   * @returns Parse object with name and Id of the parts in table "Parts"
   */
    static getMerma(process){
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
      static getMermaDate(startDay, endDay){
        const parts = new Parse.Query("PartInventory");
        parts.equalTo("status", "scrap");
        parts.greaterThanOrEqualTo('updatedAt', startDay);
        parts.lessThanOrEqualTo('updatedAt', endDay);
        return parts.find();
    }
}

module.exports = Merma;
