import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap';
import '../admin/styles/dashboard.css';
import './styles/conteo.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import Header from './Header';

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

/**
   * Disks
   * @description React component to asign an option value for each existing disk in a select
   * @param disk: Json with the attributes objectId and name
   * @returns Option component for a select
   */
function Disks({ disk }) {
    return (
        <option value={disk.name}>
            {disk.name}
        </option>
    );
}
Disks.propTypes = {
    disk: PropTypes.string.isRequired,
};

/**
 * IncomeDisk
 * @param {disk} show all Income Disk data
 * @description Shows the income disk information on the page
 * @returns HTML with fetched data
 */
function IncomeDisks({ disk }) {
    return (
        <tr>
            <th>
                <div>{disk.name}</div>
                <div className="sub-text2">disco</div>
            </th>
            <th>
                <div>{disk.number}</div>
                <div className="sub-text1">piezas</div>
            </th>
            <th>
                <div>{(disk.updatedAt).slice(0, 10)}</div>
                <div className="sub-text1">fecha</div>
            </th>
            <th>
                Editar
            </th>
        </tr>
    );
}
IncomeDisks.propTypes = {
    disk: PropTypes.string.isRequired,
};

/**
   * Conteo
   * @description Set of functions to display Conteo
   * @returns HTML with fetched data
   */
function Conteo() {
    const [disks, setDisks] = useState([]);
    const [incomeDisks, setIncomeDisks] = useState([]);

    async function getAllIncomeDisks() {
        const response = await fetch('http://localhost:8888/entradaDiscos/get');
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.cutomAlert(message);
            return;
        }

        const disk = await response.json();
        setIncomeDisks(disk.data);
    }

    /**
     * getDisks
     * @description Fetches existing disks from the database through the server
     */
    async function getDisks() {
        const response = await fetch('http://localhost:8888/discos/get');
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const disk = await response.json();
        setDisks(disk.data);
    }

    useEffect(() => {
        getDisks();
        getAllIncomeDisks();
        internetConnection();
    });

    const navigate = useNavigate();
    const [form, setForm] = useState({
        number: '',
        id_disk: '',
        name: '',
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

        await fetch('http://localhost:8888/discos/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newDisk),
        })
            .then(() => {
                console.log('new disk added');
            })
            .catch((error) => {
                window.customAlert(error);
            });

        setForm({
            number: '',
            id_disk: '',
            name: '',
        });

        navigate('/conteo');
    }

    /**
   * disksList
   * @description Maps all disks in the interface
   * @returns Component with name and id of the disk
   */
    function disksList() {
        return disks.map((disk) => (
            <Disks disk={disk} key={disk.objectID} />
        ));
    }

    /**
   * disksList
   * @description Maps all disks in the interface
   * @returns Component with name and id of the disk
   */
    function incomeDisksList() {
        return incomeDisks.slice(0).reverse().map((disk) => (
            <IncomeDisks disk={disk} key={disk.name} />
        ));
    }

    return (
        <container>
            <Header processName="Conteo" />
            <form onSubmit={onSubmit}>
                <div className="form-group row d-flex justify-content-center">
                    <div className="col-10 mt-4">
                        <div className="card conteo-card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-8">
                                        <p>Medidas</p>
                                    </div>
                                    <div className="col">
                                        <p>Cantidad</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-8 form group">
                                        <select className="form-control form-select form-select-lg" id="id_disk" name="id_disk" value={form.name} onChange={(e) => updateForm({ name: e.target.value })} required>
                                            <option value="" disabled selected>Selecciona un disco</option>
                                            {disksList()}
                                        </select>
                                    </div>
                                    <div className="col form group">
                                        <input type="number" className="conteo-input form-control" id="number" name="number" min="1" pattern="^[0-9]+" value={form.number} onChange={(e) => updateForm({ number: e.target.value })} required />
                                    </div>
                                    <div className="col d-flex align-content-center form group">
                                        <button placeholder="Cantidad" className="btn-orange" type="submit">Agregar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div className="row d-flex justify-content-center">
                <div className="col-10 mt-4">
                    <div className="card conteo-card">
                        <div className="card-body">
                            <div>
                                <p>Resumen</p>
                                <table className="table table-striped" style={{ marginTop: 20 }}>
                                    <thead>
                                        <tr>
                                            <th>Material</th>
                                            <th>Cantidad</th>
                                            <th>Fecha</th>
                                            <th> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {incomeDisksList()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </container>
    );
}

export default Conteo;
