// CU 19
// MT https://docs.google.com/spreadsheets/d/1geuVnd1ByaFLBXFXNAlN5PL-K0QVR2rq/edit?usp=sharing&ouid=103960253138118107632&rtpof=true&sd=true

import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import {
    Row,
    Col,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsAccesibility from 'highcharts/modules/accessibility';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsExportData from 'highcharts/modules/export-data';
import HighchartsData from 'highcharts/modules/data';
import Sidebar from './Sidebar';
import Environment from '../Environment';

HighchartsAccesibility(Highcharts);
HighchartsExporting(Highcharts);
HighchartsExportData(Highcharts);
HighchartsData(Highcharts);

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

    const [incidents, setIncidents] = useState([]);
    /**
     * getAllIncidents
     * @description Get all incidents confirmed
     * */
    async function getAllIncidents() {
        const response = await fetch('http://localhost:8888/procesos/allIncidents/get');
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const incidentesList = await response.json();
        setIncidents(incidentesList.data);
    }

    const [disks, setDisks] = useState([]);
    /**
     * getAllDisks
     * @description Get all history of disks
     * */
    async function getAllDisks() {
        const response = await fetch('http://localhost:8888/procesos/allDisks/get');
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const diskList = await response.json();
        setDisks(diskList.data);
    }

    const [esmerilados, setEsmerilados] = useState([]);
    /**
     * getAllEsmerilados
     * @description Get all pieces confirmed in esmerilado
     * */
    async function getAllEsmerilados() {
        const response = await fetch('http://localhost:8888/procesos/allEsmerilados/get');
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const esmeriladosList = await response.json();
        setEsmerilados(esmeriladosList.data);
    }

    const [esmeriladosIncident, setEsmeriladosIncident] = useState([]);
    /**
     * getEsmeriladosIncident
     * @description Get all pieces sended as incident and confirmed in esmerilado
     * */
    async function getEsmeriladosIncident() {
        const response = await fetch('http://localhost:8888/procesos/EsmeriladosIncident/get');
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const esmeriladosIncidentsList = await response.json();
        setEsmeriladosIncident(esmeriladosIncidentsList.data);
    }

    const [pulidos, setPulidos] = useState([]);
    /**
     * getAllPulidos
     * @description Get all pieces sended as incident and confirmed in pulido
     * */
    async function getAllPulidos() {
        const response = await fetch('http://localhost:8888/procesos/allPulidos/get');
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const pulidosList = await response.json();
        setPulidos(pulidosList.data);
    }

    const [pulidosIncident, setPulidosIncident] = useState([]);
    /**
     * getPulidosIncident
     * @description Get all pieces sended as incident and confirmed in pulido
     * */
    async function getPulidosIncident() {
        const response = await fetch('http://localhost:8888/procesos/PulidosIncident/get');
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const pulidosIncidentList = await response.json();
        setPulidosIncident(pulidosIncidentList.data);
    }

    const [remachados, setRemachados] = useState([]);
    /**
     * getAllRemachados
     * @description Get all pieces sended as incident and confirmed in pulido
     * */
    async function getAllRemachados() {
        const response = await fetch('http://localhost:8888/procesos/allRemachados/get');
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const remachadosList = await response.json();
        setRemachados(remachadosList.data);
    }

    const [remachadosIncident, setRemachadosIncident] = useState([]);
    /**
     * getRemachadosIncident
     * @description Get all pieces sended as incident and confirmed in pulido
     * */
    async function getRemachadosIncident() {
        const response = await fetch('http://localhost:8888/procesos/RemachadosIncident/get');
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const remachadosIncidentList = await response.json();
        setRemachadosIncident(remachadosIncidentList.data);
    }

    const [empaquetados, setEmpaquetados] = useState([]);
    /**
     * getAllEmpaquetados
     * @description Get all pieces sended as incident and confirmed in pulido
     * */
    async function getAllEmpaquetados() {
        const response = await fetch('http://localhost:8888/procesos/allEmpaquetados/get');
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const empaquetadosList = await response.json();
        setEmpaquetados(empaquetadosList.data);
    }

    const [empaquetadosInv, setEmpaquetadosInv] = useState([]);
    /**
     * getAllEmpaquetadosInv
     * @description Get all pieces sended as incident and confirmed in pulido
     * */
    async function getAllEmpaquetadosInv() {
        const response = await fetch('http://localhost:8888/procesos/EmpaquetadosInv/get');
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const empaquetadosInvList = await response.json();
        setEmpaquetadosInv(empaquetadosInvList.data);
    }

    useEffect(() => {
        getAllIncidents();
        getAllDisks();
        getAllEsmerilados();
        getEsmeriladosIncident();
        getAllPulidos();
        getPulidosIncident();
        getAllRemachados();
        getRemachadosIncident();
        getAllEmpaquetados();
        getAllEmpaquetadosInv();
    }, []);
    /**
     * sumAll
     * @description Sum all numbers of pieces sended in the query
     * */
    function sumAll(query) {
        let acum = 0;
        for (let i = 0; i < query.length; i += 1) {
            acum += query[i].number;
        }
        return acum;
    }
    /**
     * sumAllEmpaquetado
     * @description Sum all numbers of products with lid and without lid sended in the query
     * */
    function sumAllEmpaquetado(query) {
        let acum = 0;
        for (let i = 0; i < query.length; i += 1) {
            acum += query[i].with_lid;
            acum += query[i].withOut_lid;
        }
        return acum;
    }
    /**
     * sumAllDisks
     * @description Sum all numbers of disks sended in the query
     * */
    function sumAllDisks(query) {
        let acum = 0;
        for (let i = 0; i < query.length; i += 1) {
            if (query[i].number < 0) {
                acum += query[i].number;
            }
        }
        return acum * -1;
    }

    const [totalEntradaIncidentes, setTotalEntradaIncidentes] = useState(0);
    const [totalEntradaDiscos, setTotalEntradaDiscos] = useState(0);
    const [totalEntradaEsmerilados, setTotalEntradaEsmerilados] = useState(0);
    const [totalEntradaEsmeriladosIncident, setTotalEntradaEsmeriladosIncident] = useState(0);
    const [totalEntradaPulidos, setTotalEntradaPulidos] = useState(0);
    const [totalEntradaPulidosIncident, setTotalEntradaPulidosIncidents] = useState(0);
    const [totalEntradaRemachados, setTotalEntradaRemachados] = useState(0);
    const [totalEntradaRemachadosIncident, setTotalEntradaRemachadosIncident] = useState(0);
    const [totalEntradaEmpaquetados, setTotalEntradaEmpaquetados] = useState(0);
    const [totalEntradaEmpaquetadosInv, setTotalEntradaEmpaquetadosInv] = useState(0);

    useEffect(() => {
        setTotalEntradaIncidentes(sumAll(incidents));
        setTotalEntradaDiscos(sumAllDisks(disks));
        setTotalEntradaEsmerilados(sumAll(esmerilados));
        setTotalEntradaEsmeriladosIncident(sumAll(esmeriladosIncident));
        setTotalEntradaPulidos(sumAll(pulidos));
        setTotalEntradaPulidosIncidents(sumAll(pulidosIncident));
        setTotalEntradaRemachados(sumAll(remachados));
        setTotalEntradaRemachadosIncident(sumAll(remachadosIncident));
        setTotalEntradaEmpaquetados(sumAllEmpaquetado(empaquetados));
        setTotalEntradaEmpaquetadosInv(sumAll(empaquetadosInv));
    }, [
        incidents,
        disks,
        esmerilados,
        esmeriladosIncident,
        pulidos,
        pulidosIncident,
        remachados,
        remachadosIncident,
        empaquetados,
        empaquetadosInv,
    ]);
    /**
     * totalRechazado
     * @description Gets the total of pieces in Rechazado process
     * */
    function totalRechazado() {
        return (totalEntradaIncidentes + totalEntradaDiscos) - totalEntradaEsmerilados;
    }
    /**
     * totalEsmerilado
     * @description Gets the total of pieces in Esmerilado process
     * */
    function totalEsmerilado() {
        return totalEntradaEsmerilados - (totalEntradaEsmeriladosIncident + totalEntradaPulidos);
    }
    /**
     * totalPulido
     * @description Gets the total of pieces in Pulido process
     * */
    function totalPulido() {
        return totalEntradaPulidos - (totalEntradaPulidosIncident + totalEntradaRemachados);
    }
    /**
     * totalRemachado
     * @description Gets the total of pieces in Remachado process
     * */
    function totalRemachado() {
        return totalEntradaRemachados - (totalEntradaRemachadosIncident + totalEntradaEmpaquetados);
    }

    const [main, setMain] = useState([]);

    useEffect(() => {
        setMain([
            {
                name: 'Rechazado',
                y: totalRechazado(),
            },
            {
                name: 'Esmerilado',
                y: totalEsmerilado(),
            },
            {
                name: 'Pulido',
                y: totalPulido(),
            },
            {
                name: 'Remachado',
                y: totalRemachado(),
            },
        ]);
    }, [
        totalEntradaIncidentes,
        totalEntradaDiscos,
        totalEntradaEsmerilados,
        totalEntradaEsmeriladosIncident,
        totalEntradaPulidos,
        totalEntradaPulidosIncident,
        totalEntradaRemachados,
        totalEntradaRemachadosIncident,
        totalEntradaEmpaquetados,
        totalEntradaEmpaquetadosInv,
    ]);

    const options = {
        title: {
            text: 'Piezas por área hoy',
        },
        plotOptions: {
            series: {
                color: '#f58f3d',
            },
        },
        xAxis: {
            type: 'category',
        },
        yAxis: {
            title: {
                text: 'Cantidad',
            },
        },
        legend: {
            enabled: false,
        },
        accessibility: {
            announceNewData: {
                enabled: true,
            },
        },
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>',
        },
        series: [
            {
                type: 'column',
                name: 'Productos',
                id: 'Productos',
                data: main,
            },
        ],
    };

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
                    <Col xs={11} className="w-100">
                        <HighchartsReact highcharts={Highcharts} options={options} />
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default DashboardProcesos;
