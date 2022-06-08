// CU20 Consultar Desempeño del trabajador
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import {
    Row,
    Col,
    Form,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './styles/dashboard.css';
import _ from 'underscore';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import HighchartsAccesibility from 'highcharts/modules/accessibility';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsExportData from 'highcharts/modules/export-data';
import HighchartsData from 'highcharts/modules/data';
import Sidebar from './Sidebar';
import Environment from '../Environment';

HighchartsDrilldown(Highcharts);
HighchartsAccesibility(Highcharts);
HighchartsExporting(Highcharts);
HighchartsExportData(Highcharts);
HighchartsData(Highcharts);

function Dashboard() {
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

    const [trabajadores, setTrabajadores] = useState([]);
    /**
     * getTrabajadores
     * @description Get all active workers
     * */
    async function getTrabajadores() {
        const response = await fetch(`${Environment()}/trabajadores/get`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const trabajadoresList = await response.json();
        setTrabajadores(trabajadoresList.data);
    }

    useEffect(() => {
        getTrabajadores();
    }, []);

    const [dateForm, setDate] = useState({
        startDate: 0,
        endDate: 0,
    });

    /**
     * setDateForm
     * @description Set selected days
     * */
    function setDateForm(e, p) {
        setDate({
            startDate: p.startDate.valueOf(),
            endDate: p.endDate.valueOf(),
        });
    }

    const [idWorker, setIdWorker] = useState();

    const [produccionTrabajador, setProduccionTrabajador] = useState([]);
    /**
     * getProduccionTrabajador
     * @description Get al work from a worker during specific days
     * */
    async function getProduccionTrabajador() {
        const response = await fetch(`${Environment()}/produccion/${dateForm.startDate}/${dateForm.endDate}/${idWorker}/get`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const produccionList = await response.json();
        setProduccionTrabajador(produccionList.data);
    }

    useEffect(() => {
        getProduccionTrabajador();
    }, [dateForm, idWorker]);

    const [listaProduccionTrabajadorDia, setListaProduccionTrabajadorDia] = useState([]);

    useEffect(() => {
        setListaProduccionTrabajadorDia(_.groupBy(produccionTrabajador, (item) => item.labelFecha));
    }, [produccionTrabajador]);

    const main = [];
    const [main2, setMain2] = useState([]);

    /**
     * iterateListaProduccionTrabajadorDia
     * @description Set the data for the graph
     * */
    function iterateListaProduccionTrabajadorDia() {
        Object.keys(listaProduccionTrabajadorDia).forEach((key1) => {
            let cantidadaFecha = 0;
            for (let i = 0; i < listaProduccionTrabajadorDia[key1].length; i += 1) {
                cantidadaFecha += listaProduccionTrabajadorDia[key1][i].number;
            }
            main.push({
                name: key1,
                y: cantidadaFecha,
            });
        });
        setMain2(main);
    }

    useEffect(() => {
        iterateListaProduccionTrabajadorDia();
    }, [listaProduccionTrabajadorDia]);

    const [options, setOptions] = useState({
        title: {
            text: 'Producción de trabajador',
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
            pointFormat: '<span style="color:{point.color}">{point.name}</span>',
        },
        series: [
            {
                type: 'column',
                name: 'Producción',
                id: 'Producción',
                data: main2,
            },
        ],
    });

    useEffect(() => {
        setOptions({
            title: {
                text: 'Producción de trabajador',
            },
            plotOptions: {
                series: {
                    color: '#f58f3d',
                },
            },
            xAxis: {
                type: 'category',
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
                    name: 'Producción',
                    id: 'Producción',
                    data: main2,
                },
            ],
        });
    }, [main2]);

    return (
        <div className="container-fluid">
            <Sidebar />
            <div className="content d-flex px-4 pt-3 w-75">
                <Row>
                    <Col>
                        <h1 className="my-2">Dashboard</h1>
                        <h3 className="my-2">Trabajador</h3>
                    </Col>
                </Row>
                <Row className="d-flex my-3">
                    <Col xs={4} className="d-flex align-content-center flex-wrap">
                        <Form.Select
                          onChange={(e) => setIdWorker(
                              e.target.selectedOptions[0].value,
                          )}
                        >
                            <option>Elegir trabajador</option>
                            {trabajadores.map(({ name, objectId }) => (
                                <option value={objectId}>
                                    {name}
                                </option>
                            ))}
                        </Form.Select>
                    </Col>
                    <Col md={{ span: 4, offset: 4 }} className="d-flex align-self-center">
                        <DateRangePicker
                          md="auto"
                          onApply={(e, p) => setDateForm(e, p)}
                        >
                            <input />
                        </DateRangePicker>
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

export default Dashboard;
