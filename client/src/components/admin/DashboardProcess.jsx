import { DateRangePicker } from 'react-date-range';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './styles/dashboard.css';
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
                        Merma semanal en-
                        { process }
                    </h5>
                    <h2 className="processName">{acum}</h2>
                </div>
            </div>
        );
    }

    // const day = new Date();
    // const wDay = day.getDay();
    const [merma, setMerma] = useState([]);
    /**
     * getMerma
     * @description Get scrap from a process
     * */
    async function getMerma() {
        console.log(process);
        const response = await fetch(`http://localhost:8888/merma/${process}/get`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const mermaList = await response.json();
        console.log(mermaList);
        setMerma(mermaList.data);
    }

    function sumaMerma() {
        for (let i = 0; i < merma.length; i += 1) {
            acum += merma[i].number;
        }
    }
    // const [dateMerma, setDateMerma] = useState([]);
    // const [startDate, setStartDate] = useState(new Date());
    // const [endDate, setEndDate] = useState(new Date());
    /**
     * getMerma
     * @description Get scrap from a process
     * */
    // async function getAllMerma() {
    //     console.log(process);
    //     const response = await fetch(`http://localhost:8888/merma/${startDay}/${endDay}/get`);
    //     if (!response.ok) {
    //         const message = `An error occurred: ${response.statusText}`;
    //         window.customAlert(message);
    //         return;
    //     }

    //     const mermaList = await response.json();
    //     console.log(mermaList);
    //     setDateMerma(mermaList.data);
    // }
    useEffect(() => {
        getMerma();
        // getAllMerma();
    }, []);

    useEffect(() => {
        console.log(merma);
    }, merma);

    sumaMerma();

    const options = {
        title: {
            text: 'Merma Semanal',
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
            pointFormat: '<span style="olor:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>',
        },
        series: [
            {
                type: 'column',
                name: 'Merma',
                id: 'Merma',
                data: [
                    {
                        name: 'Lunes',
                        y: 67,
                        drilldown: 'Lunes',
                    },
                    {
                        name: 'Martes',
                        y: 23,
                        drilldown: 'Martes',
                    },
                    {
                        name: 'Miércoles',
                        y: 59,
                        drilldown: 'Miércoles',
                    },
                    {
                        name: 'Jueves',
                        y: 13,
                        drilldown: 'Jueves',
                    },
                    {
                        name: 'Viernes',
                        y: 91,
                        drilldown: 'Viernes',
                    },
                    {
                        name: 'Sabado',
                        y: 48,
                        drilldown: 'Sabado',
                    },
                    {
                        name: 'Domingo',
                        y: 15,
                        drilldown: 'Domingo',
                    },
                ],
            },
        ],
        drilldown: {
            breadcrumbs: {
                position: {
                    align: 'right',
                },
            },
            series: [
                {
                    name: 'Lunes',
                    id: 'Lunes',
                    type: 'column',
                    data: [
                        [
                            'Rechazado',
                            12,
                        ],
                        [
                            'Esmerilado',
                            32,
                        ],
                        [
                            'Pulido',
                            13,
                        ],
                        [
                            'Remachado',
                            10,
                        ],
                    ],
                },
                {
                    name: 'Martes',
                    id: 'Martes',
                    type: 'column',
                    data: [
                        [
                            'Rechazado',
                            12,
                        ],
                        [
                            'Esmerilado',
                            32,
                        ],
                        [
                            'Pulido',
                            13,
                        ],
                        [
                            'Remachado',
                            10,
                        ],
                    ],
                },
                {
                    name: 'Miércoles',
                    id: 'Miércoles',
                    type: 'column',
                    data: [
                        [
                            'Rechazado',
                            12,
                        ],
                        [
                            'Esmerilado',
                            32,
                        ],
                        [
                            'Pulido',
                            13,
                        ],
                        [
                            'Remachado',
                            10,
                        ],
                    ],
                },
                {
                    name: 'Jueves',
                    id: 'Jueves',
                    type: 'column',
                    data: [
                        [
                            'Rechazado',
                            12,
                        ],
                        [
                            'Esmerilado',
                            32,
                        ],
                        [
                            'Pulido',
                            13,
                        ],
                        [
                            'Remachado',
                            10,
                        ],
                    ],
                },
                {
                    name: 'Viernes',
                    id: 'Viernes',
                    type: 'column',
                    data: [
                        [
                            'Rechazado',
                            12,
                        ],
                        [
                            'Esmerilado',
                            32,
                        ],
                        [
                            'Pulido',
                            13,
                        ],
                        [
                            'Remachado',
                            10,
                        ],
                    ],
                },
                {
                    name: 'Sabado',
                    id: 'Sabado',
                    type: 'column',
                    data: [
                        [
                            'Rechazado',
                            12,
                        ],
                        [
                            'Esmerilado',
                            32,
                        ],
                        [
                            'Pulido',
                            13,
                        ],
                        [
                            'Remachado',
                            10,
                        ],
                    ],
                },
                {
                    name: 'Domingo',
                    id: 'Domingo',
                    type: 'column',
                    data: [
                        [
                            'Rechazado',
                            12,
                        ],
                        [
                            'Esmerilado',
                            32,
                        ],
                        [
                            'Pulido',
                            13,
                        ],
                        [
                            'Remachado',
                            10,
                        ],
                    ],
                },
            ],
        },
    };

    const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    };

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
                    <Col>
                        <DateRangePicker
                          ranges={[selectionRange]}
                        />
                    </Col>
                    <Col>
                        <div
                          id="reportrange"
                        >
                            <i className="fa fa-calendar" />
                            &nbsp;
                            <span />
                            <i className="fa fa-caret-down" />
                        </div>
                    </Col>
                </Row>
                <Row>
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
