// CU 4 Registrar entrega de piezas a otro proceso
// CU 5 Registrar producto dañado
import {
    useEffect, useState, React,
} from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import Cookies from 'js-cookie';
import Header from './Header';
import ButtonNext from './ButtonNext';
import './styles/styles.css';
<<<<<<< HEAD
import SelectCard from './SelectCard';
=======
import Environment from '../Environment';
>>>>>>> develop

let selectedWorker = '';
let selectedPart = '';
let nextBtn;
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
        nextBtn = ButtonNext(url);
    }
}

function NamePart() {
    const session = Cookies.get('sessionToken');
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

<<<<<<< HEAD
=======
    /**
   * partsList
   * @description Maps all parts in the interface
   * @returns Component with name and id of the parts
   */
    function partsList() {
        return parts.map((part) => (
            <Parts part={part} key={part.objectId} />
        ));
    }

    /**
   * workerList
   * @description Maps all workers in the interface
   * @returns Component with name and id of the worker
   */
    function workersList() {
        return workers.map((worker) => (
            <Workers worker={worker} key={worker.objectId} />
        ));
    }

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
>>>>>>> develop
    return (
        <Container className="container-fluid d-flex flex-column">
            <Row>
                <Header processName={process} />
            </Row>
            <Row className="flex-grow-1 pt-2">
                <Row className="d-flex w-100">
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
            {nextBtn}
        </Container>
    );
}
export default NamePart;
