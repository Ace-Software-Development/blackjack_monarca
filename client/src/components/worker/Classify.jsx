/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Header from './Header';

function Classify() {
    const params = useParams();
    const workersOption = [];
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

    /**
     * getProducts
     * @description Fetches existing products in incident from the database through the server
     */
    async function getProduct() {
        const response = await fetch(
            `http://localhost:8888/confirmar/incident/${params.id}/get`,
        );
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const regis = await response.json();
        setWorker({
            workerName: regis.data.id_worker.nick_name,
            workerId: regis.data.id_worker.objectId,
        });
        setNumber(regis.data.number);
        setPart(regis.data.id_part.name);
        setCategory(regis.data.id_product.id_category.name);
        setModel(regis.data.id_product.model);
        setAluminium(regis.data.id_product.aluminium);
    }

    const [workers, setWorkers] = useState([]);

    /**
     * getWorkers
     * @description Fetches existing workers from the database through the server
     */
    async function getWorkers() {
        const response = await fetch('http://localhost:8888/entrega/trabajadores/get/Rechazado');
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const rWorker = await response.json();
        setWorkers(rWorker.data);
    }

    /**
   * workersList
   * @description Creates a json array with workers for the select component
   * @returns Array with label and value of workers
   */
    function workersList() {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < workers.length; i++) {
            workersOption[i] = { label: workers[i].nick_name, value: workers[i].objectId };
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (completed + second + scrap === number) {
            alert(`${worker.workerName} ${worker.workerId} ${completed} ${second} ${scrap}`);
        } else {
            alert(`Recibiste ${number} ${category}s, debes registrar todas!`);
        }
    };

    useEffect(() => {
        getProduct();
        getWorkers();
    }, []);
    workersList();

    function getCompleted(value) {
        setCompleted(parseInt(value, 10));
    }

    function getSecond(value) {
        setSecond(parseInt(value, 10));
    }

    function getScrap(value) {
        setScrap(parseInt(value, 10));
    }

    return (
        <div className="row d-flex justify-content-center">
            <Header processName="Incidente" />
            <div className="col-10">
                <Form className="card-shadow bg-white" onSubmit={handleSubmit}>
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
                            {worker.workerName}
                            {' - '}
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
                      onChange={(e) => console.log(e.target.value)}
                    >
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
