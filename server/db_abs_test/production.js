const cPartInventory = require('part_inventory.js');

class Production
{
    constructor(assign_obj)
    {
        this.Id = assign_obj.Id;
        /*TODO make all the field*/
    }

    static getEmpty()
    {
        return new Production({Id:null});/*TODO make all the field*/
    }

    static getById(Id)
    {
        let oProduction = Production.getEmpty();
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

    reportMissCounting(MissCountingNum)
    {
        /*TODO implement*/
    }

    reportIncident(IncidentNum)
    {
        /*TODO implement*/
    }

    qualifyIncident(SecondNum, ScrapNum)
    {
        let oProductionOk = Production.getEmpty();
        let oProductionSecond = Production.getEmpty();
        /*TODO implement*/

        return [oProductionOk, oProductionSecond];
    }
}

module.exports = Production;
