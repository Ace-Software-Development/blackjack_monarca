import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/dashboard.css';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Sidebar from './Sidebar';

// import Highcharts from './charts/mermaGraph';
// import { CardAdmin, SideCards } from './CardsAdmin';

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
    useEffect(() => {
        getMerma();
    }, []);

    useEffect(() => {
        console.log(merma);
    }, merma);

    sumaMerma();

    const options = {
        title: {
            text: 'My chart',
        },
        xAxis: {
            categories: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
        },
        series: [
            {
                type: 'column',
                name: 'Merma',
                id: 'Merma',
                data: [
                    [
                        'Lunes',
                        67,
                    ],
                    [
                        'Martes',
                        23,
                    ],
                    [
                        'Miércoles',
                        59,
                    ],
                    [
                        'Jueves',
                        13,
                    ],
                    [
                        'Viernes',
                        91,
                    ],
                    [
                        'Sabado',
                        48,
                    ],
                    [
                        'Domingo',
                        15,
                    ],
                ],
            },
        ],
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
                    <Col xs={9}>
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={options}
                        />
                    </Col>
                    <Col xs={3}>
                        {cardMermaNum()}
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Dashboard;
