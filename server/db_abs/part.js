// CU 4
// MT https://docs.google.com/spreadsheets/d/1geuVnd1ByaFLBXFXNAlN5PL-K0QVR2rq/edit?usp=sharing&ouid=103960253138118107632&rtpof=true&sd=true

class Part {
    /**
   * getAllParts
   * @description Query to get all existing parts
   * @returns Parse object with name and Id of the parts in table "Parts"
   */
    static getAllParts() {
        const parts = new Parse.Query("Part");
        parts.select("objectId", "name");
        return parts.find();
    }

}

module.exports = Part;