// CU 4 Registrar entrega de piezas a otro proceso
// CU 5 Registrar producto dañado
import {
    useEffect, useState, React,
} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import Cookies from 'js-cookie';
import Header from './Header';
import './styles/styles.css';
import SelectCard from './SelectCard';
import Environment from '../Environment';

let selectedWorker = '';
let selectedPart = '';
// let nextBtn;
let url = '';
let process = '';
let nextProcess = '';

/**
   * setContext
   * @description Saves selected worker and part in variables
   * @param id: id of the worker or part
   * @param type: specifies if the id is a worker or part
   */
function setContext(id, type) {
    if (type === 'p') {
        selectedPart = id;
    } else {
        selectedWorker = id;
    }

    url = `/categoria/${process}/${nextProcess}/${selectedWorker}/${selectedPart}`;

    if (selectedWorker && selectedPart) {
        const button = document.getElementById('buttonNext');
        button.hidden = false;
    }
}

function NamePart() {
    const navigate = useNavigate();
    const session = Cookies.get('sessionToken');
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
    }, []);

    if (!permission) {
        return ('No tienes permisos');
    }
    const params = useParams();
    process = params.process;
    nextProcess = params.nextProcess;
    const [parts, setParts] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [activePart, setActivePart] = useState('');
    const [activeWorker, setActiveWorker] = useState('');

    /**
         * getParts
         * @description Fetches existing parts from the database through the server
         */
    async function getParts() {
        const response = await fetch(`${Environment()}/entrega/partes/get`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const part = await response.json();
        setParts(part.data);
    }

    /**
     * getWorkers
     * @description Fetches existing workers from the database through the server
     */
    async function getWorkers() {
        const response = await fetch(`${Environment()}/entrega/trabajadores/get/${process}`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const worker = await response.json();
        setWorkers(worker.data);
    }

    useEffect(() => {
        getParts();
        getWorkers();
    }, []);

    return (
        <Container className="container-fluid d-flex flex-column flex-grow-1">
            <Row>
                <Header processName={process} />
            </Row>
            <Row className="pt-2 card-checkout">
                <Row className="d-flex w-100 ">
                    <Col className="px-5 workers-list" lg={6}>
                        <h3 className="text-center">Elige un trabajador</h3>
                        <Col className="d-flex flex-column align-items-stretch">
                            {workers.map((worker) => (
                                <SelectCard
                                  name={worker.nick_name}
                                  identifier={worker.objectId}
                                  key={worker.objectId}
                                  onClickAction={(id, type) => setContext(id, type)}
                                  siblingSelected={activeWorker}
                                  setSiblingSelected={setActiveWorker}
                                  type="w"
                                />
                            ))}
                        </Col>
                    </Col>
                    <Col className="px-5 parts-list" lg={6}>
                        <h3 className="text-center">Elige una pieza</h3>
                        <Col className="d-flex flex-column align-items-stretch">
                            {parts.map((part) => (
                                <SelectCard
                                  name={part.name}
                                  identifier={part.objectId}
                                  key={part.objectId}
                                  onClickAction={(id, type) => {
                                      setContext(id, type);
                                    }}
                                  siblingSelected={activePart}
                                  setSiblingSelected={setActivePart}
                                  type="p"
                                />
                             ))}
                        </Col>
                    </Col>
                </Row>
            </Row>
            <div className="d-flex justify-content-center mb-4">
                <button className="btn buttonNext cardNext w-25 card-shadow" id="buttonNext" type="button" onClick={() => navigate(url)} hidden>
                    Siguiente
                </button>
            </div>
        </Container>
    );
}
export default NamePart;
