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
                data: [
                    {
                        name: 'Rechazado',
                        y: 1,
                    },
                    {
                        name: 'Esmerilado',
                        y: 4,
                    },
                    {
                        name: 'Pulido',
                        y: 3,
                    },
                    {
                        name: 'Remachado',
                        y: 8,
                    },
                ],
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
