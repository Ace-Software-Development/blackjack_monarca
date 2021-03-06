// CU 19
// MT https://docs.google.com/spreadsheets/d/1geuVnd1ByaFLBXFXNAlN5PL-K0QVR2rq/edit?usp=sharing&ouid=103960253138118107632&rtpof=true&sd=true

const express = require('express');
const router = express.Router();

const procesosController = require('../controller/procesos');

router.get('/allIncidents/get', procesosController.getAllIncidentsController);
router.get('/allDisks/get', procesosController.getAllDisksController);
router.get('/RechazadosIncident/get', procesosController.getRechazadosIncidentController);
router.get('/allEsmerilados/get', procesosController.getAllEsmeriladosController); // -------
router.get('/EsmeriladosIncident/get', procesosController.getEsmeriladosIncidentController);  // -------
router.get('/allPulidos/get', procesosController.getAllPulidosController); // -------
router.get('/PulidosIncident/get', procesosController.getPulidosIncidentController); // -------
router.get('/allRemachados/get', procesosController.getAllRemachadosController); // -------
router.get('/RemachadosIncident/get', procesosController.getRemachadosIncidentController); // -------
router.get('/allEmpaquetados/get', procesosController.getAllEmpaquetadosController); // -------
router.get('/EmpaquetadosInv/get', procesosController.getAllEmpaquetadosInvController);
router.get('/PendingIncidents/get', procesosController.getAllPendingIncidentsController);
router.get('/PendingRechazados/get', procesosController.getAllPendingRechazadosController);

module.exports = router;