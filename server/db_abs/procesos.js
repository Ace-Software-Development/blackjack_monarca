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
        incidents.equalTo("is_incident", true);
        incidents.equalTo("status", "confirmed");
        incidents.include("id_product");
        incidents.include("id_product.id_category");
        incidents.include("id_part");
        return incidents.find();
    }

    /**
   * getAllDisks
   * @description Query to get all disks
   * @returns Parse object with name and Id of the parts in table "IncomeDisk"
   */
     static getAllDisks(){
        const disks = new Parse.Query(Constants.IncomeDisk);
        disks.select("number", "name");
        return disks.find();
    }

    /**
   * getEsmeriladosIncident
   * @description Query to get all registers where is_incident is true, has a confirmed status and has the process of Esmerilado
   * @returns Parse object with name and Id of the parts in table "PartInventory"
   */
     static getRechazadosIncident(){
        const rechazadosIncident = new Parse.Query(Constants.PartInventory);
        rechazadosIncident.equalTo("is_incident", true);
        rechazadosIncident.equalTo("status", "confirmed");
        rechazadosIncident.equalTo("id_process", "Rechazado");
        rechazadosIncident.include("id_product");
        rechazadosIncident.include("id_product.id_category");
        rechazadosIncident.include("id_part");
        return rechazadosIncident.find();
    }

    /**
   * getAllEsmerilados
   * @description Query to get all registers where is_incident is false, has a confirmed status and has the process of Esmerilado
   * @returns Parse object with name and Id of the parts in table "PartInventory"
   */
     static getAllEsmerilados(){
        const esmerilados = new Parse.Query(Constants.PartInventory);
        esmerilados.equalTo("is_incident", false);
        esmerilados.equalTo("status", "confirmed");
        esmerilados.equalTo("id_process", "Esmerilado");
        esmerilados.include("id_product");
        esmerilados.include("id_product.id_category");
        esmerilados.include("id_part");
        return esmerilados.find();
    }

    /**
   * getEsmeriladosIncident
   * @description Query to get all registers where is_incident is true, has a confirmed status and has the process of Esmerilado
   * @returns Parse object with name and Id of the parts in table "PartInventory"
   */
     static getEsmeriladosIncident(){
        const esmeriladosIncident = new Parse.Query(Constants.PartInventory);
        esmeriladosIncident.equalTo("is_incident", true);
        esmeriladosIncident.equalTo("status", "confirmed");
        esmeriladosIncident.equalTo("id_process", "Esmerilado");
        esmeriladosIncident.include("id_product");
        esmeriladosIncident.include("id_product.id_category");
        esmeriladosIncident.include("id_part");
        return esmeriladosIncident.find();
    }

    /**
   * getAllPulidos
   * @description Query to get all registers where is_incident is false, has a confirmed status and has the process of Pulido
   * @returns Parse object with name and Id of the parts in table "PartInventory"
   */
     static getAllPulidos(){
        const pulidos = new Parse.Query(Constants.PartInventory);
        pulidos.equalTo("is_incident", false);
        pulidos.equalTo("status", "confirmed");
        pulidos.equalTo("id_process", "Pulido");
        pulidos.include("id_product");
        pulidos.include("id_product.id_category");
        pulidos.include("id_part");
        return pulidos.find();
    }

    /**
   * getPulidosIncident
   * @description Query to get all registers where is_incident is true, has a confirmed status and has the process of Pulido
   * @returns Parse object with name and Id of the parts in table "PartInventory"
   */
     static getPulidosIncident(){
        const pulidosIncident = new Parse.Query(Constants.PartInventory);
        pulidosIncident.equalTo("is_incident", true);
        pulidosIncident.equalTo("status", "confirmed");
        pulidosIncident.equalTo("id_process", "Pulido");
        pulidosIncident.include("id_product");
        pulidosIncident.include("id_product.id_category");
        pulidosIncident.include("id_part");
        return pulidosIncident.find();
    }

    /**
   * getAllRemachados
   * @description Query to get all registers where is_incident is false, has a confirmed status and has the process of Remachado
   * @returns Parse object with name and Id of the parts in table "PartInventory"
   */
     static getAllRemachados(){
        const remachados = new Parse.Query(Constants.PartInventory);
        remachados.equalTo("is_incident", false);
        remachados.equalTo("status", "confirmed");
        remachados.equalTo("id_process", "Remachado");
        remachados.include("id_product");
        remachados.include("id_product.id_category");
        remachados.include("id_part");
        return remachados.find();
    }

    /**
   * getRemachadosIncident
   * @description Query to get all registers where is_incident is true, has a confirmed status and has the process of Remachado
   * @returns Parse object with name and Id of the parts in table "PartInventory"
   */
     static getRemachadosIncident(){
        const remachadosIncident = new Parse.Query(Constants.PartInventory);
        remachadosIncident.equalTo("is_incident", true);
        remachadosIncident.equalTo("status", "confirmed");
        remachadosIncident.equalTo("id_process", "Remachado");
        remachadosIncident.include("id_product");
        remachadosIncident.include("id_product.id_category");
        remachadosIncident.include("id_part");
        return remachadosIncident.find();
    }

    /**
   * getAllEmpaquetadosInv
   * @description Query to get all registers where is_incident is false, has a confirmed status and has the process of Empaquetado
   * @returns Parse object with name and Id of the parts in table "PartInventory"
   */
     static getAllEmpaquetados(){
        const empaquetadosInv = new Parse.Query(Constants.PartInventory);
        empaquetadosInv.equalTo("is_incident", false);
        empaquetadosInv.equalTo("status", "confirmed");
        empaquetadosInv.equalTo("id_process", "Empaquetado");
        empaquetadosInv.include("id_product");
        empaquetadosInv.include("id_product.id_category");
        empaquetadosInv.include("id_part");
        return empaquetadosInv.find();
    }

     /**
   * getAllPendingIncidents
   * @description Query to get all registers where is_incident is false, has a confirmed status and has the process of Empaquetado
   * @returns Parse object with name and Id of the parts in table "PartInventory"
   */
      static getAllPendingIncidents(){
        const query = new Parse.Query(Constants.PartInventory);
        query.equalTo("is_incident", true);
        query.equalTo("status", "pending");
        query.include("id_product");
        query.include("id_product.id_category");
        query.include("id_part");
        return query.find();
    }

     /**
   * getAllPendingRechazados
   * @description Query to get all registers where is_incident is false, has a confirmed status and has the process of Empaquetado
   * @returns Parse object with name and Id of the parts in table "PartInventory"
   */
      static getAllPendingRechazados(){
        const query = new Parse.Query(Constants.PartInventory);
        query.equalTo("status", "pending");
        query.equalTo("is_incident", false);
        query.equalTo("id_process", "Esmerilado");
        query.include("id_product");
        query.include("id_product.id_category");
        query.include("id_part");
        return query.find();
    }
}

module.exports = Procesos;