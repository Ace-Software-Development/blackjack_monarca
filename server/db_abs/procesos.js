const Constants = require('../constants');

class Procesos
{
    constructor(pAssignObj)
    {
        this.id = pAssignObj.id;
    }

    static getAllWorkers(process){
        const workers = new Parse.Query(Constants.Worker);
        workers.select("objectId", "nick_name");
        workers.equalTo("id_process", process);
        return workers.find();
    }
}

module.exports = Procesos;