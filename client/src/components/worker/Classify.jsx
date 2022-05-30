/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Header from './Header';

function Classify() {
    const params = useParams();
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (completed + second + scrap === number) {
            if (worker.workerName === '' || worker.workerId === '') {
                alert('Debes registrar quien realizo la reparación');
            } else {
                alert(`${worker.workerName} ${worker.workerId} ${completed} ${second} ${scrap} ${idProduct} ${idPart}`);
            }
        } else {
            alert(`Recibiste ${number} ${category}s, debes registrar todas!`);
        }
    };

    useEffect(() => {
        getProduct();
        getWorkers();
    }, []);

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
