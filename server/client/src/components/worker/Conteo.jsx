import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap';
import '../admin/styles/dashboard.css';
import './styles/conteo.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';

/**
   * Disks
   * @description React component to asign an option value for each existing disk in a select
   * @param disk: Json with the attributes objectId and name
   * @returns Option component for a select
   */
function Disks({ disk }) {
    return (
        <option value={disk.objectId}>
            {disk.name}
        </option>
    );
}
Disks.propTypes = {
    disk: PropTypes.string.isRequired,
};

/**
   * Conteo
   * @description Set of functions to display Conteo
   * @returns HTML with fetched data
   */
function Conteo() {
    const [disks, setDisks] = useState([]);

    useEffect(() => {
        /**
         * getDisks
         * @description Fetches existing disks from the database through the server
         */
        async function getDisks() {
            const response = await fetch('http://localhost:8888/discos/get');
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const disk = await response.json();
            setDisks(disk.data);
        }

        getDisks();
    });

    const navigate = useNavigate();
    const [form, setForm] = useState({
        number: '',
        id_disk: '',
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
                window.alert(error);
            });

        setForm({
            number: '',
            id_disk: '',
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

    return (
        <container>
            <div>
                <h1 className="mt-4" align="center">Conteo</h1>
            </div>
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
                                        <select className="form-control form-select form-select-lg" id="id_disk" name="id_disk" value={form.id_disk} onChange={(e) => updateForm({ id_disk: e.target.value })} required>
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
                                            <th hidden>Cantidad</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {disks.map((disk) => (
                                            <tr>
                                                <th>
                                                    <div>{disk.name}</div>
                                                    <div className="sub-text2">compatibles</div>
                                                </th>
                                                <th>
                                                    <div>{disk.key}</div>
                                                    <div className="sub-text1">piezas</div>
                                                </th>
                                                <th>Editar</th>
                                            </tr>
                                        ))}
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