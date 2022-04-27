const cPartInventory = require('part_inventory.js');

class cProduction
{
    constructor(assign_obj)
    {
        this.id = assign_obj.id;
        /*TODO make all the field*/
    }

    static getEmpty()
    {
        return new cProduction({id:null});/*TODO make all the field*/
    }

    static getById(id)
    {
        let oProduction = cProduction.getEmpty();
        /*TODO implement*/
        return oProduction;
    }

    static getByProcess(process)
    {
        let listProduction = [];
        /*TODO implement*/
        return listProduction;
    }

    static getIncidenceNeedQualify()
    {
        let listProduction = [];
        /*TODO implement*/
        return listProduction;
    }

    checkout()
    {
        /*TODO implement*/
    }

    reportMissCounting(miss_counting_num)
    {
        /*TODO implement*/
    }

    reportIncident(incident_num)
    {
        /*TODO implement*/
    }

    qualifyIncident(second_num, scrap_num)
    {
        let oProductionOk = cProduction.getEmpty();
        let oProductionSecond = cProduction.getEmpty();
        /*TODO implement*/

        return [oProductionOk, oProductionSecond];
    }
}

module.exports = cProduction;
