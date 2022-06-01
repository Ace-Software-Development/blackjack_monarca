// CU 3 Consultar piezas recibidas en el proceso
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import '../admin/styles/dashboard.css';
import './styles/conteo.css';
import Header from './Header';

let idProduct = '';

function ModifyPackStatus() {
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
    idProduct = params.model;
    const [category, setCategory] = useState(0);
    const [model, setModel] = useState(0);
    const [aluminium, setAluminium] = useState(0);

    const [form, setForm] = useState({
        with_lid: '',
        withOut_lid: '',
        objectId: idProduct,
    });

    /**
     * getRegister
     * @description Fetches existing registers from the database through the server
     */
    async function getRegister() {
        const response = await fetch(`http://localhost:8888/producto/getProductById/${idProduct}`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const regis = await response.json();
        setCategory(regis.data.id_category.name);
        setModel(regis.data.model);
        setAluminium(regis.data.aluminium);

        setForm({
            with_lid: regis.data.with_lid,
            withOut_lid: regis.data.withOut_lid,
            objectId: regis.data.objectId,
        });
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

        await fetch('http://localhost:8888/producto/modifyInventory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inventory),
        });

        setForm({
            with_lid: '',
            withOut_lid: '',
            objectId: '',
        });

        navigate('/empacado/inventario');
    }

    return (
        <div>
            <Header processName="Modificar estado de los productos empacados" />
            <form onSubmit={onSubmit}>
                <div className="form-group row d-flex justify-content-center text-center">
                    <div className="col-10 mt-4">
                        <div className="card card-shadow bg-white">
                            <div className="card-body">
                                <div className="row mt-4 mb-2">
                                    <div className="col form group">
                                        <h2>
                                            Con tapa
                                            <br />
                                            <input type="number" id="with_lid" name="with_lid" min="0" pattern="^[0-9]+" className="col-3 text-center modify-conteo-input" value={form.with_lid} onChange={(e) => updateForm({ with_lid: e.target.value })} required />
                                        </h2>
                                    </div>
                                    <div className="col form group">
                                        <h2>
                                            Sin tapa
                                            <br />
                                            <input type="number" id="withOut_lid" name="withOut_lid" min="0" pattern="^[0-9]+" className="col-3 text-center modify-conteo-input" value={form.withOut_lid} onChange={(e) => updateForm({ withOut_lid: e.target.value })} required />
                                        </h2>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col mt-2">
                                        <h4>
                                            {`${category} ${model} ${aluminium}`}
                                        </h4>
                                    </div>
                                </div>
                                <div className="row justify-content-center mt-4">
                                    <button type="button" onClick={() => navigate(-1)} className="col-1 btnBack">
                                        <ion-icon size="large" name="arrow-back-outline" />
                                    </button>
                                    <div className="col-2" />
                                    <button type="submit" id="confirm" name="confirm" className="col-2 btn-accept">
                                        Modificar
                                    </button>
                                    <div className="col-3" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ModifyPackStatus;
