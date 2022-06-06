const Constants = require('../constants');

class Procesos
{
    constructor(pAssignObj)
    {
        this.id = pAssignObj.id;
    }

    /**
   * getAllIncidents
   * @description Query to get all registers where is_incident is true and has a confirmed status
   * @returns Parse object with name and Id of the parts in table "PartInventory"
   */
    static getAllIncidents(){
        const incidents = new Parse.Query(Constants.PartInventory);
        incidents.select("number");
        incidents.equalTo("is_incident", true);
        incidents.equalTo("status", "confirmed");
        return incidents.find();
    }

    /**
   * getAllDisks
   * @description Query to get all disks
   * @returns Parse object with name and Id of the parts in table "IncomeDisk"
   */
     static getAllDisks(){
        const disks = new Parse.Query(Constants.IncomeDisk);
        disks.select("number");
        return disks.find();
    }

    /**
   * getAllEsmerilados
   * @description Query to get all registers where is_incident is false, has a confirmed status and has the process of Esmerilado
   * @returns Parse object with name and Id of the parts in table "PartInventory"
   */
     static getAllEsmerilados(){
        const esmerilados = new Parse.Query(Constants.PartInventory);
        esmerilados.select("number");
        esmerilados.equalTo("is_incident", false);
        esmerilados.equalTo("status", "confirmed");
        esmerilados.equalTo("id_process", "Esmerilado");
        return esmerilados.find();
    }

    /**
   * getEsmeriladosIncident
   * @description Query to get all registers where is_incident is true, has a confirmed status and has the process of Esmerilado
   * @returns Parse object with name and Id of the parts in table "PartInventory"
   */
     static getEsmeriladosIncident(){
        const esmeriladosIncident = new Parse.Query(Constants.PartInventory);
        esmeriladosIncident.select("number");
        esmeriladosIncident.equalTo("is_incident", true);
        esmeriladosIncident.equalTo("status", "confirmed");
        esmeriladosIncident.equalTo("id_process", "Esmerilado");
        return esmeriladosIncident.find();
    }

    /**
   * getAllPulidos
   * @description Query to get all registers where is_incident is false, has a confirmed status and has the process of Pulido
   * @returns Parse object with name and Id of the parts in table "PartInventory"
   */
     static getAllPulidos(){
        const pulidos = new Parse.Query(Constants.PartInventory);
        pulidos.select("number");
        pulidos.equalTo("is_incident", false);
        pulidos.equalTo("status", "confirmed");
        pulidos.equalTo("id_process", "Pulido");
        return pulidos.find();
    }

    /**
   * getPulidosIncident
   * @description Query to get all registers where is_incident is true, has a confirmed status and has the process of Pulido
   * @returns Parse object with name and Id of the parts in table "PartInventory"
   */
     static getPulidosIncident(){
        const pulidosIncident = new Parse.Query(Constants.PartInventory);
        pulidosIncident.select("number");
        pulidosIncident.equalTo("is_incident", true);
        pulidosIncident.equalTo("status", "confirmed");
        pulidosIncident.equalTo("id_process", "Pulido");
        return pulidosIncident.find();
    }

    /**
   * getAllRemachados
   * @description Query to get all registers where is_incident is false, has a confirmed status and has the process of Remachado
   * @returns Parse object with name and Id of the parts in table "PartInventory"
   */
     static getAllRemachados(){
        const remachados = new Parse.Query(Constants.PartInventory);
        remachados.select("number");
        remachados.equalTo("is_incident", false);
        remachados.equalTo("status", "confirmed");
        remachados.equalTo("id_process", "Remachado");
        return remachados.find();
    }

    /**
   * getRemachadosIncident
   * @description Query to get all registers where is_incident is true, has a confirmed status and has the process of Remachado
   * @returns Parse object with name and Id of the parts in table "PartInventory"
   */
     static getRemachadosIncident(){
        const remachadosIncident = new Parse.Query(Constants.PartInventory);
        remachadosIncident.select("number");
        remachadosIncident.equalTo("is_incident", true);
        remachadosIncident.equalTo("status", "confirmed");
        remachadosIncident.equalTo("id_process", "Remachado");
        return remachadosIncident.find();
    }

    /**
   * getAllEmpaquetados
   * @description Query to get all registers from product
   * @returns Parse object with name and Id of the parts in table "Product"
   */
     static getAllEmpaquetados(){
        const empaquetados = new Parse.Query(Constants.Product);
        empaquetados.select("with_lid", "withOut_lid");
        return empaquetados.find();
    }

    /**
   * getAllEmpaquetadosInv
   * @description Query to get all registers where is_incident is false, has a confirmed status and has the process of Empaquetado
   * @returns Parse object with name and Id of the parts in table "PartInventory"
   */
     static getAllEmpaquetadosInv(){
        const empaquetadosInv = new Parse.Query(Constants.PartInventory);
        empaquetadosInv.select("number");
        empaquetadosInv.equalTo("is_incident", false);
        empaquetadosInv.equalTo("status", "confirmed");
        empaquetadosInv.equalTo("id_process", "Empaquetado");
        return empaquetadosInv.find();
    }
}

module.exports = Procesos;