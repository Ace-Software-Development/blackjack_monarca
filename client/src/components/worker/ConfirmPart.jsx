// CU 3 Consultar piezas recibidas en el proceso
import 'bootstrap/dist/css/bootstrap.css';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Container, Row, Col } from 'react-bootstrap';
import '../admin/styles/dashboard.css';
import './styles/conteo.css';
import Header from './Header';

let idPartInventory = '';

function ConfirmPart() {
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

    const navigate = useNavigate();
    const params = useParams();
    idPartInventory = params.idPartInventory;
    const [worker, setWorker] = useState(0);
    const [number, setNumber] = useState(0);
    const [part, setPart] = useState(0);
    const [category, setCategory] = useState(0);
    const [model, setModel] = useState(0);
    const [aluminium, setAluminium] = useState(0);
    const [form, setForm] = useState({
        status: '',
        objectId: idPartInventory,
    });

    /**
     * getRegister
     * @description Fetches existing registers from the database through the server
     */
    async function getRegister() {
        const response = await fetch(`http://localhost:8888/confirmar/getOne/${idPartInventory}`);
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
        getRegister();
    }, []);

    /**
   * updateForm
   * @description updates data of a form
   * @param value: new values of the form
   * @returns an updated form
   */
    function updateForm(value) {
        return setForm((prev) => ({ ...prev, ...value }));
    }

    /**
   * onSubmit
   * @description Modifies piece in inventory through a fetch to the server
   * @param e: Context
   */
    async function onSubmit(e) {
        e.preventDefault();

        const inventory = { ...form };

        await fetch('http://localhost:8888/confirmar/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inventory),
        });

        setForm({
            status: '',
            objectId: '',
        });
        navigate(-2);
    }

    return (
        <Container className="d-flex h-100 flex-column">
            <Header processName="Confirmar pieza recibida" />
            <form className="flex-grow-1" onSubmit={onSubmit}>
                <Row className="form-group d-flex text-center h-100 p-4 ">
                    <div className="card card-shadow bg-white">
                        <div>
                            <button type="button" onClick={() => navigate(-1)} className="col-1 btn">
                                <ion-icon size="large" name="arrow-back-outline" />
                            </button>
                        </div>
                        <div>
                            <Col className="col form group">
                                {`${worker} reportó`}
                            </Col>
                        </div>
                        <div className="row mt-4 mb-2">
                            <Col className="col form group">
                                <h2>{number}</h2>
                            </Col>
                        </div>
                        <div className="row mt-2">
                            <Col className="col mt-2">
                                <h4>{`${part} ${category} ${model} ${aluminium}`}</h4>
                            </Col>
                        </div>
                        <Row className="justify-content-center mt-4">
                            <Col>
                                <button type="submit" className="btn-cancel" onClick={() => updateForm({ status: 'rejected' })}>
                                    No recibí
                                </button>
                            </Col>
                            <Col>
                                <button type="submit" id="confirm" name="confirm" className="btn-accept" onClick={() => updateForm({ status: 'confirmed' })}>
                                    Recibí
                                </button>
                            </Col>
                        </Row>
                    </div>
                </Row>
            </form>
        </Container>
    );
}

export default ConfirmPart;
