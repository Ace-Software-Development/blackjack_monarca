/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Header from './Header';

function Classify() {
    /**
   * res
   * @description Substract the number of pieces registered by the user
   * @param input: Where to decrement the value. Completed pieces or second pieces.
   */
    function res(status) {
        if (status === 'completed') {
            document.getElementById('numberCompleted').stepDown();
        } else if (status === 'second') {
            document.getElementById('numberSecond').stepDown();
        } else {
            document.getElementById('numberScrap').stepDown();
        }
    }

    /**
   * sum
   * @description Substract the number of pieces registered by the user
   * @param input: Where to decrement the value. Completed pieces or second pieces.
   */
    function sum(status) {
        if (status === 'completed') {
            document.getElementById('numberCompleted').stepUp();
        } else if (status === 'second') {
            document.getElementById('numberSecond').stepUp();
        } else {
            document.getElementById('numberScrap').stepUp();
        }
    }

    const [worker, setWorker] = useState(0);
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
        const response = await fetch('http://localhost:8888/confirmar/incident/product/get');
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const regis = await response.json();
        setWorker(regis.data.id_worker.name);
        setNumber(regis.data.number);
        setPart(regis.data.id_part.name);
        setCategory(regis.data.id_product.id_category.name);
        setModel(regis.data.id_product.model);
        setAluminium(regis.data.id_product.aluminium);
    }

    useEffect(() => {
        getProduct();
    }, []);

    return (
        <div className="row d-flex justify-content-center">
            <Header processName="Incidente" />
            <div className="col-10">
                <form className="card-shadow bg-white">
                    {/* onSubmit={onSubmit} */}
                    <div className="row">
                        <div className="col-9">
                            <h5>Resumen</h5>
                        </div>
                        <div className="col-2 text-center">
                            <button type="submit" className="btn cardNext buttonNext mt-2 mb-2" id="buttonNext">
                                Confirmar
                            </button>
                        </div>
                        <p>
                            {worker}
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
                            <Row>
                                Primera
                            </Row>
                            <Row>
                                <input className="w-100 h-100 form-control text-center" type="number" min="0" pattern="^[0-9]+" name="numberCompleted" id="numberCompleted" />
                                {/* onChange={(e) =>
                                updateForm({
                                numberCompleted: e.target.value })} */}
                            </Row>
                            <Row className="mt-4">
                                <Col xs={6}>
                                    <button className="btn btnNumber ratio ratio-1x1 p-5" type="button" onClick={() => res('completed')}>
                                        <ion-icon name="remove-outline" />
                                    </button>
                                </Col>
                                <Col xs={6}>
                                    <button className="btn btnNumber ratio ratio-1x1 p-5" type="button" onClick={() => sum('completed')}>
                                        <ion-icon name="add-outline" />
                                    </button>
                                </Col>
                            </Row>
                        </Col>
                        <Col className="mx-1">
                            <Row>
                                Segunda
                            </Row>
                            <Row>
                                <input className="w-100 h-100 form-control text-center" type="number" min="0" pattern="^[0-9]+" name="numberSecond" id="numberSecond" />
                                {/* onChange={(e) =>
                                updateForm({
                                numberSecond: e.target.value })} */}
                            </Row>
                            <Row className="mt-4">
                                <Col xs={6}>
                                    <button className="btn btnNumber ratio ratio-1x1 p-5" type="button" onClick={() => res('second')}>
                                        <ion-icon name="remove-outline" />
                                    </button>
                                </Col>
                                <Col xs={6}>
                                    <button className="btn btnNumber ratio ratio-1x1 p-5" type="button" onClick={() => sum('second')}>
                                        <ion-icon name="add-outline" />
                                    </button>
                                </Col>
                            </Row>
                        </Col>
                        <Col className="mx-1">
                            <Row>
                                Chatarra
                            </Row>
                            <Row>
                                <input className="w-100 h-100 form-control text-center" type="number" min="0" pattern="^[0-9]+" name="numberScrap" id="numberScrap" />
                                {/* onChange={(e) =>
                                updateForm({
                                numberSecond: e.target.value })} */}
                            </Row>
                            <Row className="mt-4">
                                <Col xs={6}>
                                    <button className="btn btnNumber ratio ratio-1x1 p-5" type="button" onClick={() => res('scrap')}>
                                        <ion-icon name="remove-outline" />
                                    </button>
                                </Col>
                                <Col xs={6}>
                                    <button className="btn btnNumber ratio ratio-1x1 p-5" type="button" onClick={() => sum('scrap')}>
                                        <ion-icon name="add-outline" />
                                    </button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </form>
            </div>
        </div>
    );
}

export default Classify;
