// CU 19
// MT https://docs.google.com/spreadsheets/d/1geuVnd1ByaFLBXFXNAlN5PL-K0QVR2rq/edit?usp=sharing&ouid=103960253138118107632&rtpof=true&sd=true

import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import {
    Row,
    Col,
    Form,
} from 'react-bootstrap';
import _ from 'underscore';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css';
import Sidebar from './Sidebar';
import Environment from '../Environment';

function Main({ m }) {
    return (
        <tr>
            <th>
                <h5>{m.category}</h5>
                <h6 className="sub-text1">Categoría</h6>
            </th>
            <th>
                <h5>{m.model}</h5>
                <h6 className="sub-text1">Modelo</h6>
            </th>
            <th>
                <h5>{m.aluminium}</h5>
                <h6 className="sub-text1">Aluminio</h6>
            </th>
            <th>
                <h5>{m.cantidad}</h5>
                <h6 className="sub-text1">Cantidad</h6>
            </th>
        </tr>
    );
}
Main.propTypes = {
    m: PropTypes.string.isRequired,
};

function DashboardProcesos() {
    const session = Cookies.get('sessionToken');
    const admin = Cookies.get('is_admin');
    const [permission, setPermission] = useState([]);

    /**
     * getPermission
     * @description Verifies that the user session token is valid
     */
    async function getPermission() {
        const response = await fetch(`${Environment()}/login/getPermission/${session}`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const perm = await response.json();
        setPermission(perm.data);
    }
    useEffect(() => {
        getPermission();
    }, [session, admin]);
    if (admin === 'false' || !permission) {
        return ('No tienes permisos');
    }

    const [incidentsPending, setIncidentsPending] = useState([]);
    const [rechazadoPending, setRechazadoPending] = useState([]);
    const [esmerilados, setEsmerilados] = useState([]);
    const [esmeriladosIncident, setEsmeriladosIncident] = useState([]);
    const [pulidos, setPulidos] = useState([]);
    const [pulidosIncident, setPulidosIncident] = useState([]);
    const [remachados, setRemachados] = useState([]);
    const [remachadosIncident, setRemachadosIncident] = useState([]);
    const [empaquetados, setEmpaquetados] = useState([]);

    /**
     * getAllEsmerilados
     * @description Get all pieces confirmed in Esmerilado
     * */
    async function getAllEsmerilados() {
        const response = await fetch(`${Environment()}/procesos/allEsmerilados/get`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const esmeriladosList = await response.json();
        setEsmerilados(esmeriladosList.data);
    }

    /**
     * getEsmeriladosIncident
     * @description Get all pieces sended as incident and confirmed in Esmerilado
     * */
    async function getEsmeriladosIncident() {
        const response = await fetch(`${Environment()}/procesos/EsmeriladosIncident/get`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const esmeriladosIncidentsList = await response.json();
        setEsmeriladosIncident(esmeriladosIncidentsList.data);
    }

    /**
     * getAllPulidos
     * @description Get all pieces confirmed in Pulido
     * */
    async function getAllPulidos() {
        const response = await fetch(`${Environment()}/procesos/allPulidos/get`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const pulidosList = await response.json();
        setPulidos(pulidosList.data);
    }

    /**
     * getPulidosIncident
     * @description Get all pieces sended as incident and confirmed in pulido
     * */
    async function getPulidosIncident() {
        const response = await fetch(`${Environment()}/procesos/PulidosIncident/get`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const pulidosIncidentList = await response.json();
        setPulidosIncident(pulidosIncidentList.data);
    }

    /**
     * getAllRemachados
     * @description Get all pieces confirmed in Remachado
     * */
    async function getAllRemachados() {
        const response = await fetch(`${Environment()}/procesos/allRemachados/get`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const remachadosList = await response.json();
        setRemachados(remachadosList.data);
    }

    /**
     * getRemachadosIncident
     * @description Get all pieces sended as incident and confirmed in Remachado
     * */
    async function getRemachadosIncident() {
        const response = await fetch(`${Environment()}/procesos/RemachadosIncident/get`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const remachadosIncidentList = await response.json();
        setRemachadosIncident(remachadosIncidentList.data);
    }

    /**
     * getAllEmpaquetados
     * @description Get all pieces confirmed in Empaquetado
     * */
    async function getAllEmpaquetados() {
        const response = await fetch(`${Environment()}/procesos/allEmpaquetados/get`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const empaquetadosList = await response.json();
        setEmpaquetados(empaquetadosList.data);
    }

    /**
     * getAllEmpaquetados
     * @description Get all pieces confirmed in Empaquetado
     * */
    async function getAllPendingIncidents() {
        const response = await fetch('http://localhost:8888/procesos/PendingIncidents/get');
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const query = await response.json();
        setIncidentsPending(query.data);
    }

    /**
     * getAllEmpaquetados
     * @description Get all pieces confirmed in Empaquetado
     * */
    async function getAllPendingRechazados() {
        const response = await fetch('http://localhost:8888/procesos/PendingRechazados/get');
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const query = await response.json();
        setRechazadoPending(query.data);
    }

    useEffect(() => {
        getAllEsmerilados();
        getEsmeriladosIncident();
        getAllPulidos();
        getPulidosIncident();
        getAllRemachados();
        getRemachadosIncident();
        getAllEmpaquetados();
        getAllPendingIncidents();
        getAllPendingRechazados();
    }, []);

    const [bandera, setBandera] = useState(true);

    useEffect(() => {
        if (bandera) {
            setBandera(!bandera);
        }
    }, [
        esmerilados,
        esmeriladosIncident,
        pulidos,
        pulidosIncident,
        remachados,
        remachadosIncident,
        empaquetados,
        incidentsPending,
        rechazadoPending,
    ]);

    const [idProcess, setIdProcess] = useState();
    const [listaEsmeriladoConfirm, setListaEsmeriladoConfirm] = useState([]);
    const [listaEsmeriladoIncidentConfirm, setListaEsmerIncidentConfirm] = useState([]);
    const [listaPulidoConfirm, setListaPulidoConfirm] = useState([]);
    const [listaPulidoIncidentConfirm, setListaPulidoIncidentConfirm] = useState([]);
    const [listaRemachadoConfirm, setListaRemachadoConfirm] = useState([]);
    const [listaRemachadoIncidentConfirm, setListaRemaIncidentConfirm] = useState([]);
    const [listaEmpaquetadoConfirm, setListaEmpaquetadoConfirm] = useState([]);
    const [listaIncidentsPending, setListaIncidentsPending] = useState([]);
    const [listaRechazadoPending, setListaRechazadoPending] = useState([]);

    const main1 = [];
    const main2 = [];
    const [main, setMain] = useState([
        {
            name: '',
            category: '',
            model: '',
            aluminium: '',
            cantidad: 0,
        },
    ]);

    function sumaPorArea() {
        if (idProcess === 'Rechazado') {
            Object.keys(listaIncidentsPending).forEach((key) => {
                let acum = 0;
                for (let i = 0; i < listaIncidentsPending[key].length; i += 1) {
                    acum += listaIncidentsPending[key][i].number;
                }
                main1.push({
                    name: key,
                    category: listaIncidentsPending[key][0].id_product.id_category.name,
                    model: listaIncidentsPending[key][0].id_product.model,
                    aluminium: listaIncidentsPending[key][0].id_product.aluminium,
                    cantidad: acum,
                    operacion: 's',
                });
            });
            Object.keys(listaRechazadoPending).forEach((key) => {
                let acum = 0;
                for (let i = 0; i < listaRechazadoPending[key].length; i += 1) {
                    acum += listaRechazadoPending[key][i].number;
                }
                main1.push({
                    name: key,
                    category: listaRechazadoPending[key][0].id_product.id_category.name,
                    model: listaRechazadoPending[key][0].id_product.model,
                    aluminium: listaRechazadoPending[key][0].id_product.aluminium,
                    cantidad: acum,
                    operacion: 's',
                });
            });
            const arregloAux = _.groupBy(main1, (item) => item.name);
            Object.keys(arregloAux).forEach((key) => {
                let acum = 0;
                for (let i = 0; i < arregloAux[key].length; i += 1) {
                    if (arregloAux[key][i].operacion === 's') {
                        acum += arregloAux[key][i].cantidad;
                    } else {
                        acum -= arregloAux[key][i].cantidad;
                    }
                }
                main2.push({
                    name: key,
                    category: arregloAux[key][0].category,
                    model: arregloAux[key][0].model,
                    aluminium: arregloAux[key][0].aluminium,
                    cantidad: acum,
                });
            });
            setMain(main2);
        } else if (idProcess === 'Esmerilado') {
            Object.keys(listaEsmeriladoConfirm).forEach((key1) => {
                let acum = 0;
                for (let i = 0; i < listaEsmeriladoConfirm[key1].length; i += 1) {
                    acum += listaEsmeriladoConfirm[key1][i].number;
                }
                main1.push({
                    name: key1,
                    category: listaEsmeriladoConfirm[key1][0].id_product.id_category.name,
                    model: listaEsmeriladoConfirm[key1][0].id_product.model,
                    aluminium: listaEsmeriladoConfirm[key1][0].id_product.aluminium,
                    cantidad: acum,
                    operacion: 's',
                });
            });
            Object.keys(listaEsmeriladoIncidentConfirm).forEach((key2) => {
                let acum1 = 0;
                for (let i = 0; i < listaEsmeriladoIncidentConfirm[key2].length; i += 1) {
                    acum1 += listaEsmeriladoIncidentConfirm[key2][i].number;
                }
                main1.push({
                    name: key2,
                    category: listaEsmeriladoIncidentConfirm[key2][0].id_product.id_category.name,
                    model: listaEsmeriladoIncidentConfirm[key2][0].id_product.model,
                    aluminium: listaEsmeriladoIncidentConfirm[key2][0].id_product.aluminium,
                    cantidad: acum1,
                    operacion: 'r',
                });
            });
            Object.keys(listaPulidoConfirm).forEach((key3) => {
                let acum2 = 0;
                for (let i = 0; i < listaPulidoConfirm[key3].length; i += 1) {
                    acum2 += listaPulidoConfirm[key3][i].number;
                }
                main1.push({
                    name: key3,
                    category: listaPulidoConfirm[key3][0].id_product.id_category.name,
                    model: listaPulidoConfirm[key3][0].id_product.model,
                    aluminium: listaPulidoConfirm[key3][0].id_product.aluminium,
                    cantidad: acum2,
                    operacion: 'r',
                });
            });
            const arregloAux = _.groupBy(main1, (item) => item.name);
            Object.keys(arregloAux).forEach((key4) => {
                let acum3 = 0;
                for (let i = 0; i < arregloAux[key4].length; i += 1) {
                    if (arregloAux[key4][i].operacion === 's') {
                        acum3 += arregloAux[key4][i].cantidad;
                    } else {
                        acum3 -= arregloAux[key4][i].cantidad;
                    }
                }
                main2.push({
                    name: key4,
                    category: arregloAux[key4][0].category,
                    model: arregloAux[key4][0].model,
                    aluminium: arregloAux[key4][0].aluminium,
                    cantidad: acum3,
                });
            });
            setMain(main2);
        } else if (idProcess === 'Pulido') {
            Object.keys(listaPulidoConfirm).forEach((key1) => {
                let acum = 0;
                for (let i = 0; i < listaPulidoConfirm[key1].length; i += 1) {
                    acum += listaPulidoConfirm[key1][i].number;
                }
                main1.push({
                    name: key1,
                    category: listaPulidoConfirm[key1][0].id_product.id_category.name,
                    model: listaPulidoConfirm[key1][0].id_product.model,
                    aluminium: listaPulidoConfirm[key1][0].id_product.aluminium,
                    cantidad: acum,
                    operacion: 's',
                });
            });
            Object.keys(listaPulidoIncidentConfirm).forEach((key2) => {
                let acum1 = 0;
                for (let i = 0; i < listaPulidoIncidentConfirm[key2].length; i += 1) {
                    acum1 += listaPulidoIncidentConfirm[key2][i].number;
                }
                main1.push({
                    name: key2,
                    category: listaPulidoIncidentConfirm[key2][0].id_product.id_category.name,
                    model: listaPulidoIncidentConfirm[key2][0].id_product.model,
                    aluminium: listaPulidoIncidentConfirm[key2][0].id_product.aluminium,
                    cantidad: acum1,
                    operacion: 'r',
                });
            });
            Object.keys(listaRemachadoConfirm).forEach((key3) => {
                let acum2 = 0;
                for (let i = 0; i < listaRemachadoConfirm[key3].length; i += 1) {
                    acum2 += listaRemachadoConfirm[key3][i].number;
                }
                main1.push({
                    name: key3,
                    category: listaRemachadoConfirm[key3][0].id_product.id_category.name,
                    model: listaRemachadoConfirm[key3][0].id_product.model,
                    aluminium: listaRemachadoConfirm[key3][0].id_product.aluminium,
                    cantidad: acum2,
                    operacion: 'r',
                });
            });
            const arregloAux = _.groupBy(main1, (item) => item.name);
            Object.keys(arregloAux).forEach((key4) => {
                let acum3 = 0;
                for (let i = 0; i < arregloAux[key4].length; i += 1) {
                    if (arregloAux[key4][i].operacion === 's') {
                        acum3 += arregloAux[key4][i].cantidad;
                    } else {
                        acum3 -= arregloAux[key4][i].cantidad;
                    }
                }
                main2.push({
                    name: key4,
                    category: arregloAux[key4][0].category,
                    model: arregloAux[key4][0].model,
                    aluminium: arregloAux[key4][0].aluminium,
                    cantidad: acum3,
                });
            });
            setMain(main2);
        } else if (idProcess === 'Remachado') {
            Object.keys(listaRemachadoConfirm).forEach((key1) => {
                let acum = 0;
                for (let i = 0; i < listaRemachadoConfirm[key1].length; i += 1) {
                    acum += listaRemachadoConfirm[key1][i].number;
                }
                main1.push({
                    name: key1,
                    category: listaRemachadoConfirm[key1][0].id_product.id_category.name,
                    model: listaRemachadoConfirm[key1][0].id_product.model,
                    aluminium: listaRemachadoConfirm[key1][0].id_product.aluminium,
                    cantidad: acum,
                    operacion: 's',
                });
            });
            Object.keys(listaRemachadoIncidentConfirm).forEach((key2) => {
                let acum1 = 0;
                for (let i = 0; i < listaRemachadoIncidentConfirm[key2].length; i += 1) {
                    acum1 += listaRemachadoIncidentConfirm[key2][i].number;
                }
                main1.push({
                    name: key2,
                    category: listaRemachadoIncidentConfirm[key2][0].id_product.id_category.name,
                    model: listaRemachadoIncidentConfirm[key2][0].id_product.model,
                    aluminium: listaRemachadoIncidentConfirm[key2][0].id_product.aluminium,
                    cantidad: acum1,
                    operacion: 'r',
                });
            });
            Object.keys(listaEmpaquetadoConfirm).forEach((key3) => {
                let acum2 = 0;
                for (let i = 0; i < listaEmpaquetadoConfirm[key3].length; i += 1) {
                    acum2 += listaEmpaquetadoConfirm[key3][i].number;
                }
                main1.push({
                    name: key3,
                    category: listaEmpaquetadoConfirm[key3][0].id_product.id_category.name,
                    model: listaEmpaquetadoConfirm[key3][0].id_product.model,
                    aluminium: listaEmpaquetadoConfirm[key3][0].id_product.aluminium,
                    cantidad: acum2,
                    operacion: 'r',
                });
            });
            const arregloAux = _.groupBy(main1, (item) => item.name);
            Object.keys(arregloAux).forEach((key4) => {
                let acum3 = 0;
                for (let i = 0; i < arregloAux[key4].length; i += 1) {
                    if (arregloAux[key4][i].operacion === 's') {
                        acum3 += arregloAux[key4][i].cantidad;
                    } else {
                        acum3 -= arregloAux[key4][i].cantidad;
                    }
                }
                main2.push({
                    name: key4,
                    category: arregloAux[key4][0].category,
                    model: arregloAux[key4][0].model,
                    aluminium: arregloAux[key4][0].aluminium,
                    cantidad: acum3,
                });
            });
            setMain(main2);
        }
    }

    useEffect(() => {
        sumaPorArea();
    }, [listaEsmeriladoConfirm,
        listaEsmeriladoIncidentConfirm,
        listaPulidoConfirm,
        listaPulidoIncidentConfirm,
        listaRemachadoConfirm,
        listaRemachadoIncidentConfirm,
        listaEmpaquetadoConfirm,
        listaIncidentsPending,
        listaRechazadoPending,
    ]);

    function setListas() {
        setListaEsmeriladoConfirm(_.groupBy(esmerilados, (item) => item.id_product.objectId));
        setListaEsmerIncidentConfirm(_.groupBy(esmeriladosIncident, (i) => i.id_product.objectId));
        setListaPulidoConfirm(_.groupBy(pulidos, (item) => item.id_product.objectId));
        setListaPulidoIncidentConfirm(_.groupBy(pulidosIncident, (ite) => ite.id_product.objectId));
        setListaRemachadoConfirm(_.groupBy(remachados, (item) => item.id_product.objectId));
        setListaRemaIncidentConfirm(_.groupBy(remachadosIncident, (it) => it.id_product.objectId));
        setListaEmpaquetadoConfirm(_.groupBy(empaquetados, (item) => item.id_product.objectId));
        setListaIncidentsPending(_.groupBy(incidentsPending, (it) => it.id_product.objectId));
        setListaRechazadoPending(_.groupBy(rechazadoPending, (item) => item.id_product.objectId));
    }

    useEffect(() => {
        setListas();
    }, [idProcess, bandera]);

    /**
   * partesList
   * @description Maps all parts in the interface
   * @returns Component with name and number
   */
    function partesList() {
        return main.map((m) => (
            <Main m={m} key={m.name} />
        ));
    }

    return (
        <div className="container-fluid">
            <Sidebar />
            <div className="content d-flex px-4 pt-3 w-75">
                <Row>
                    <Col>
                        <h1 className="my-2">Dashboard</h1>
                        <h3 className="my-2">Procesos</h3>
                    </Col>
                </Row>
                <Row className="d-flex">
                    <Form.Select
                      onChange={(e) => setIdProcess(e.target.selectedOptions[0].value)}
                    >
                        <option>Elegir área</option>
                        <option value="Rechazado">Rechazado</option>
                        <option value="Esmerilado">Esmerilado</option>
                        <option value="Pulido">Pulido</option>
                        <option value="Remachado">Remachado</option>
                    </Form.Select>
                </Row>
                <Row>
                    <div className="card conteo-card mt-4">
                        <table className="w-100 mt-4" style={{ marginTop: 20 }}>
                            <thead>
                                <tr>
                                    <th>Categoria</th>
                                    <th>Modelo</th>
                                    <th>Aluminio</th>
                                    <th>Cantidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                {partesList()}
                            </tbody>
                        </table>
                    </div>
                </Row>
            </div>
        </div>
    );
}

export default DashboardProcesos;
