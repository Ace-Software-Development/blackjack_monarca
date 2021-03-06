// CU 4 Registrar entrega de piezas a otro proceso
// CU 5 Registrar producto dañado
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Cookies from 'js-cookie';
import '../admin/styles/dashboard.css';
import './styles/conteo.css';
import Header from './Header';
import Environment from '../Environment';

function ModifyQuantity() {
    const navigate = useNavigate();
    const params = useParams();
    const incomeDisk = params.id;
    const incomeDiskName = params.name;
    const [form, setForm] = useState({
        number: '',
        objectId: incomeDisk,
    });

    /**
     * internetConnection
     * @description checks if the website have internet
     */
    function internetConnection() {
        window.ononline = () => {
            console.log('Conectado a internet');
        };
        window.onoffline = () => {
            window.customAlert('No tienes conexión a internet');
        };
    }

    useEffect(() => {
        internetConnection();
    });

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
   * @description Posts incoming disk through a fetch to the server
   * @param e: Context
   */
    async function onSubmit(e) {
        e.preventDefault();

        const newDisk = { ...form };

        await fetch(`${Environment()}/discos/modificar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newDisk),
        });

        setForm({
            number: '',
            objectId: '',
        });
        navigate('/inicio');
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
    return (
        <div>
            <Header processName="Modificar cantidad" />
            <form onSubmit={onSubmit}>
                <div className="form-group row d-flex justify-content-center text-center">
                    <div className="col-10 mt-4">
                        <div className="card card-shadow bg-white">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col form group">
                                        <h3>
                                            {incomeDiskName}
                                        </h3>
                                    </div>
                                </div>
                                <div className="row mt-4 mb-2">
                                    <div className="col form group">
                                        <h2>
                                            <input type="number" id="number" name="number" pattern="^[0-9]+" className="col-3 text-center modify-conteo-input" value={form.number} onChange={(e) => updateForm({ number: e.target.value })} required />
                                        </h2>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col mt-2">
                                        <h4>
                                            Ingresa la nueva cantidad
                                        </h4>
                                    </div>
                                </div>
                                <div className="row justify-content-center mt-4">
                                    <button type="button" onClick={() => navigate('/inicio')} className="col-2 btn-cancel">
                                        Cancelar
                                    </button>
                                    <div className="col-1" />
                                    <button type="submit" className="col-2 btn-accept">
                                        Confirmar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ModifyQuantity;
