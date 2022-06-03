import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
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

HighchartsDrilldown(Highcharts);
HighchartsAccesibility(Highcharts);
HighchartsExporting(Highcharts);
HighchartsExportData(Highcharts);
HighchartsData(Highcharts);

let process = '';

function Dashboard() {
    let acum = 0;
    const session = Cookies.get('sessionToken');
    const admin = Cookies.get('is_admin');
    const params = useParams();
    process = params.process;
    const [permission, setPermission] = useState([]);

    /**
     * getPermission
     * @description Verifies that the user session token is valid
     */
    async function getPermission() {
        const response = await fetch(`http://localhost:8888/login/getPermission/${session}`);
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

    function cardMermaNum() {
        return (
            <div className="admin-card text-center">
                <div className="card-body text-center w-100 py-4">
                    <h5>
                        Merma
                    </h5>
                    <h2 className="processName">{acum}</h2>
                </div>
            </div>
        );
    }

    const [merma, setMerma] = useState([]);
    /**
     * getMerma
     * @description Get scrap from a process
     * */
    async function getMerma() {
        const response = await fetch(`http://localhost:8888/merma/${process}/get`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const mermaList = await response.json();
        setMerma(mermaList.data);
    }

    function sumaMerma() {
        for (let i = 0; i < merma.length; i += 1) {
            acum += merma[i].number;
        }
    }

    useEffect(() => {
        getMerma();
    }, []);

    sumaMerma();

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

    const [mermaProcesos, setMermaProcesos] = useState([]);
    /**
     * getMermaDias
     * @description Get scrap from all process during specific days
     * */
    async function getMermaDias() {
        const response = await fetch(`http://localhost:8888/merma/${dateForm.startDate}/${dateForm.endDate}/get`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const mermaList = await response.json();
        setMermaProcesos(mermaList.data);
    }

    useEffect(() => {
        getMermaDias();
    }, [dateForm]);

    const [listaMermaDia, setListaMermaDia] = useState([]);

    useEffect(() => {
        setListaMermaDia(_.groupBy(mermaProcesos, (item) => item.labelFecha));
    }, [mermaProcesos]);

    const main = [];
    const series1 = [];
    const [main2, setMain2] = useState([]);
    const [series2, setSeries2] = useState([]);
    const [bandera, setBandera] = useState(false);

    function iterateListaMerma() {
        Object.keys(listaMermaDia).forEach((key1) => {
            let cantidadaFecha = 0;
            const listaMermaProceso = _.groupBy(listaMermaDia[key1], (item) => item.id_process);
            const datosProceso = [];
            Object.keys(listaMermaProceso).forEach((key2) => {
                const result = [key2, 0];
                for (let i = 0; i < listaMermaProceso[key2].length; i += 1) {
                    result[1] += listaMermaProceso[key2][i].number;
                    cantidadaFecha += listaMermaProceso[key2][i].number;
                }
                datosProceso.push(result);
            });
            main.push({
                name: key1,
                y: cantidadaFecha,
                drilldown: key1,
            });
            series1.push({
                name: key1,
                id: key1,
                type: 'column',
                data: datosProceso,
            });
        });
        setMain2(main);
        setSeries2(series1);
        setBandera(!bandera);
    }

    useEffect(() => {
        iterateListaMerma();
    }, [listaMermaDia]);

    const [options, setOptions] = useState({
        title: {
            text: 'Merma Semanal',
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
            pointFormat: '<span style="color:{point.color}">{point.name}</span>',
        },
        series: [
            {
                type: 'column',
                name: 'Merma',
                id: 'Merma',
                data: main2,
            },
        ],
        drilldown: {
            breadcrumbs: {
                position: {
                    align: 'right',
                },
            },
            series: series2,
        },
    });

    useEffect(() => {
        // console.log(main2);
        setOptions({
            title: {
                text: 'Merma Semanal',
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
                pointFormat: '<span style="color:{point.color}">{point.name}</span>',
            },
            series: [
                {
                    type: 'column',
                    name: 'Merma',
                    id: 'Merma',
                    data: main2,
                },
            ],
            drilldown: {
                breadcrumbs: {
                    position: {
                        align: 'right',
                    },
                },
                series: series2,
            },
        });
    }, [main2]);

    useEffect(() => {
        console.log(options);
    }, [options]);

    return (
        <div className="container-fluid">
            <Sidebar />
            <div className="content d-flex px-4 pt-3 h-100">
                <Row>
                    <Col>
                        <h1 className="my-2">Dashboard</h1>
                        <h3 className="my-2">{process}</h3>
                    </Col>
                </Row>
                <Row>
                    <Col xs={3}>
                        <DateRangePicker
                          onApply={(e, p) => setDateForm(e, p)}
                        >
                            <input />
                        </DateRangePicker>
                    </Col>
                </Row>
                <Row mt={4}>
                    <Col xs={9}>
                        <HighchartsReact highcharts={Highcharts} options={options} />
                    </Col>
                    <Col xs={3}>{cardMermaNum()}</Col>
                </Row>
            </div>
        </div>
    );
}

export default Dashboard;
