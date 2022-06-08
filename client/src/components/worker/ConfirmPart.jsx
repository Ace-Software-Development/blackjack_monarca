// CU 3 Consultar piezas recibidas en el proceso
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import '../admin/styles/dashboard.css';
import './styles/conteo.css';
import Header from './Header';
import Environment from '../Environment';

let idPartInventory = '';

function ConfirmPart() {
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
        const response = await fetch(`${Environment()}/confirmar/getOne/${idPartInventory}`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const regis = await response.json();
        setWorker(regis.data.id_worker.nick_name);
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

        await fetch(`${Environment()}/confirmar/post`, {
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
        <div className="h-100 d-flex flex-column">
            <Header processName="Confirmar pieza recibida" />
            <container className="h-100 d-flex flex-column">
                <form className="form-group row d-flex flex-column justify-content-center text-center h-100" onSubmit={onSubmit}>
                    <div className="form-group row d-flex justify-content-center text-center h-100">
                        <div className="col-10 mt-4">
                            <div className="confirmar flex-grow-1 card card-shadow bg-white">
                                <div className="row">
                                    <button type="button" onClick={() => navigate(-1)} className="col-1 btnBack btn">
                                        <ion-icon size="large" name="arrow-back-outline" />
                                    </button>
                                </div>
                                <div className="row d-flex justify-content-center my-4">
                                    <p className="mb-3 text-confirmar">
                                        {`${worker} reportó`}
                                    </p>
                                </div>
                                <div className="row my-4">
                                    <h1 className="confirm-number">
                                        {number}
                                    </h1>
                                </div>
                                <div className="row my-2">
                                    <p className="mt-3 text-confirmar">
                                        {`${part} ${category} ${model} ${aluminium}`}
                                    </p>
                                </div>
                                <div className="row d-flex justify-content-betwen mt-5">
                                    <div className="col mt-5">
                                        <button type="submit" className="btn btn-secondary btn-lg w-25" onClick={() => updateForm({ status: 'rejected' })}>
                                            No recibí
                                        </button>
                                    </div>
                                    <div className="col mt-5">
                                        <button type="submit" id="confirm" name="confirm" className="btn-confirm w-25" onClick={() => updateForm({ status: 'confirmed' })}>
                                            Recibí
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </container>
        </div>
    );
}

export default ConfirmPart;
