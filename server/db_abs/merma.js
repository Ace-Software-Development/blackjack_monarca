class Merma
{
    /**
   * getAllMerma
   * @description Query to get all existing parts
   * @returns Parse object with name and Id of the parts in table "Parts"
   */
    static getMerma(process){
        const parts = new Parse.Query("PartInventory");
        parts.equalTo("id_process", process);
        parts.equalTo("status", "scrap");
        return parts.find();
    }
}

module.exports = Merma;
