/* eslint-disable jsx-a11y/anchor-is-valid */
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Row, Col, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Header from './Header';
import './styles/styles.css';
import Environment from '../Environment';

function Classify() {
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
    const navigate = useNavigate();
    const [completed, setCompleted] = useState(0);
    const [second, setSecond] = useState(0);
    const [scrap, setScrap] = useState(0);
    const [worker, setWorker] = useState({
        workerName: '',
        workerId: '',
    });
    const [number, setNumber] = useState(0);
    const [part, setPart] = useState(0);
    const [category, setCategory] = useState(0);
    const [model, setModel] = useState(0);
    const [aluminium, setAluminium] = useState(0);
    const [idProduct, setIdProduct] = useState(0);
    const [idPart, setIdPart] = useState(0);
    const [info, setInfo] = useState({
        id_worker: '',
        completedNumber: 0,
        secondNumber: 0,
        scrapNumber: 0,
        id_part: '',
        id_product: '',
        id_process: '',
        id_incident: '',
    });
    const [process, setProcess] = useState(0);
    const [idIncident, setIdIncident] = useState(0);

    /**
     * getProducts
     * @description Fetches existing products in incident from the database through the server
     */
    async function getProduct() {
        const response = await fetch(
            `${Environment()}/confirmar/incident/${params.id}/get`,
        );
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const regis = await response.json();
        setWorker({
            workerName: '',
            workerId: '',
        });
        setNumber(regis.data.number);
        setPart(regis.data.id_part.name);
        setCategory(regis.data.id_product.id_category.name);
        setModel(regis.data.id_product.model);
        setAluminium(regis.data.id_product.aluminium);
        setIdProduct(regis.data.id_product.objectId);
        setIdPart(regis.data.id_part.objectId);
        setProcess(regis.data.id_process);
        setIdIncident(params.id);
    }

    const [workers, setWorkers] = useState([]);

    /**
     * getWorkers
     * @description Fetches existing workers from the database through the server
     */
    async function getWorkers() {
        const response = await fetch(`${Environment()}/entrega/trabajadores/get/Rechazado`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const rWorker = await response.json();
        setWorkers(rWorker.data);
    }

    /**
     * handleSubmit
     * @description OnSubmit send the info to the database
     */
    async function handleSubmit(e) {
        e.preventDefault();

        if (completed + second + scrap === number) {
            if (worker.workerName === '' || worker.workerId === '') {
                window.costumAlert('Debes registrar quien realizo la reparación');
            } else {
                const newPart = { ...info };
                console.log(newPart);
                await fetch(`${Environment()}/entrega/incidente/post`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newPart),
                });
                navigate('/rechazado/incidente');
            }
        } else {
            window.costumAlert(`Recibiste ${number} ${category}s, debes registrar todas!`);
        }
    }

    useEffect(() => {
        getProduct();
        getWorkers();
    }, []);

    /**
     * getCompleted
     * @description get completed parts to int
     * @param value number of completeds as string
     */
    function getCompleted(value) {
        setCompleted(parseInt(value, 10));
    }

    /**
     * getSecond
     * @description get second parts to int
     * @param value number of seconds as string
     */
    function getSecond(value) {
        setSecond(parseInt(value, 10));
    }
    /**
     * getScrap
     * @description get scrap parts to int
     * @param value number of scrap as string
     */
    function getScrap(value) {
        setScrap(parseInt(value, 10));
    }

    useEffect(() => {
        setInfo({
            id_worker: worker.workerId,
            completedNumber: completed,
            secondNumber: second,
            scrapNumber: scrap,
            id_part: idPart,
            id_product: idProduct,
            id_process: process,
            id_incident: idIncident,
        });
    }, [completed, second, scrap, worker]);

    /**
     * total
     * @description change color of text depending if the sum equals the total number
     */
    function total() {
        if (completed + second + scrap > number || completed + second + scrap < number) {
            return (
                <div className="col-12 text-center">
                    <h3 className="red-text">{ completed + second + scrap }</h3>
                </div>
            );
        }
        return (
            <div className="col-12 text-center">
                <h3 className="green-text">{ completed + second + scrap }</h3>
            </div>
        );
    }

    return (
        <div className="row d-flex justify-content-center">
            <Header processName="Incidente" />
            <div className="col-10">
                <Form className="card-shadow bg-white" onSubmit={(e) => handleSubmit(e)}>
                    <div className="row">
                        <div className="col-9">
                            <h5>Resumen</h5>
                        </div>
                        <div className="col-2 text-center">
                            <button
                              type="submit"
                              className="btn cardNext buttonNext mt-2 mb-2"
                              id="buttonNext"
                            >
                                Confirmar
                            </button>
                        </div>
                        <p>
                            {category}
                            {' - '}
                            {`${model} ${aluminium}`}
                            {' - '}
                            {part}
                            {' - '}
                            {number}
                        </p>
                    </div>
                    <h3 className="text-center">Cantidad de productos a entregar</h3>
                    {total()}
                    <Row className="quantity-input">
                        <Col className="mx-1">
                            <Row>Primera</Row>
                            <Row>
                                <input
                                  className="w-100 h-100 form-control text-center"
                                  type="number"
                                  min="0"
                                  pattern="^[0-9]+"
                                  value={completed}
                                  onChange={(e) => getCompleted(e.target.value)}
                                />
                            </Row>
                            <Row className="mt-4">
                                <Col xs={6}>
                                    <button
                                      className="btn btnNumber ratio ratio-1x1 p-5"
                                      type="button"
                                      onClick={() => setCompleted((a) => a - 1)}
                                    >
                                        <ion-icon name="remove-outline" />
                                    </button>
                                </Col>
                                <Col xs={6}>
                                    <button
                                      className="btn btnNumber ratio ratio-1x1 p-5"
                                      type="button"
                                      onClick={() => setCompleted((a) => a + 1)}
                                    >
                                        <ion-icon name="add-outline" />
                                    </button>
                                </Col>
                            </Row>
                        </Col>
                        <Col className="mx-1">
                            <Row>Segunda</Row>
                            <Row>
                                <input
                                  className="w-100 h-100 form-control text-center"
                                  type="number"
                                  min="0"
                                  pattern="^[0-9]+"
                                  value={second}
                                  onChange={(e) => getSecond(e.target.value)}
                                />
                            </Row>
                            <Row className="mt-4">
                                <Col xs={6}>
                                    <button
                                      className="btn btnNumber ratio ratio-1x1 p-5"
                                      type="button"
                                      onClick={() => setSecond((a) => a - 1)}
                                    >
                                        <ion-icon name="remove-outline" />
                                    </button>
                                </Col>
                                <Col xs={6}>
                                    <button
                                      className="btn btnNumber ratio ratio-1x1 p-5"
                                      type="button"
                                      onClick={() => setSecond((a) => a + 1)}
                                    >
                                        <ion-icon name="add-outline" />
                                    </button>
                                </Col>
                            </Row>
                        </Col>
                        <Col className="mx-1">
                            <Row>Chatarra</Row>
                            <Row>
                                <input
                                  className="w-100 h-100 form-control text-center"
                                  type="number"
                                  min="0"
                                  pattern="^[0-9]+"
                                  value={scrap}
                                  onChange={(e) => getScrap(e.target.value)}
                                />
                            </Row>
                            <Row className="mt-4">
                                <Col xs={6}>
                                    <button
                                      className="btn btnNumber ratio ratio-1x1 p-5"
                                      type="button"
                                      onClick={() => setScrap((a) => a - 1)}
                                    >
                                        <ion-icon name="remove-outline" />
                                    </button>
                                </Col>
                                <Col xs={6}>
                                    <button
                                      className="btn btnNumber ratio ratio-1x1 p-5"
                                      type="button"
                                      onClick={() => setScrap((a) => a + 1)}
                                    >
                                        <ion-icon name="add-outline" />
                                    </button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Form.Select
                      className="mt-3"
                      onChange={(e) => setWorker({
                          workerName: e.target.selectedOptions[0].label,
                          workerId: e.target.selectedOptions[0].value,
                        })}
                    >
                        <option>Trabajador encargado de la reparación</option>
                        {workers.map(({ nick_name: nickName, objectId }) => (
                            <option value={objectId}>
                                {nickName}
                            </option>
                        ))}
                    </Form.Select>
                </Form>
            </div>
        </div>
    );
}

export default Classify;
