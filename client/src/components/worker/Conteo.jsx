import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap';
import '../admin/styles/dashboard.css';
import './styles/conteo.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';

function Disks({ disco }) {
    return (
        <option value={disco.objectID}>
            {disco.material}
        </option>
    );
}
Disks.propTypes = {
    disco: PropTypes.string.isRequired,
};

function Conteo() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        number: '',
        id_disk: '',
    });

    function updateForm(value) {
        return setForm((prev) => ({ ...prev, ...value }));
    }

    async function onSubmit(e) {
        e.preventDefault();

        // When a post request is sent to the create url, we'll add a new record to the database.
        const newDisk = { ...form };

        await fetch('http://localhost:8888/discos/add', {
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

    const discos = [
        {
            objectID: 'KDJFSDF',
            material: 'Alumnio 340*520 super fuerte',
            cantidad: '20',
        },
        {
            objectID: 'FJHGGH',
            material: 'Alumnio 30*50 super fuerte',
            cantidad: '200',
        },
        {
            objectID: 'NFHGFDG',
            material: 'Alumnio 30*50',
            cantidad: '1500',
        },
    ];

    function discosList() {
        return discos.map((disco) => (
            <Disks disco={disco} key={disco.objectID} />
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
                                            {discosList()}
                                        </select>
                                    </div>
                                    <div className="col form group">
                                        <input type="number" className="conteo-input form-control" id="number" name="number" value={form.number} onChange={(e) => updateForm({ number: e.target.value })} />
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
                                        {discos.map((disco) => (
                                            <tr>
                                                <th>
                                                    <div>{disco.material}</div>
                                                    <div className="sub-text2">compatibles</div>
                                                </th>
                                                <th>
                                                    <div>{disco.cantidad}</div>
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
