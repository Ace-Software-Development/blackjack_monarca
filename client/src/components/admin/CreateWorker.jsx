// CU 29
// MT https://docs.google.com/spreadsheets/d/1geuVnd1ByaFLBXFXNAlN5PL-K0QVR2rq/edit?usp=sharing&ouid=103960253138118107632&rtpof=true&sd=true

import 'bootstrap/dist/css/bootstrap.css';
import './styles/dashboard.css';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Environment from '../Environment';

/**
   * CreateWorker
   * @description Set of functions to display modal of Create Worker
   * @returns HTML with fetched data
   */
function CreateWorker() {
    const [form, setForm] = useState({
        name: '',
        nick_name: '',
        id_process: '',
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

    async function onSubmit(e) {
        e.preventDefault();

        const newWorker = { ...form };

        await fetch(`${Environment()}/trabajador/post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newWorker),
        });

        setForm({
            name: '',
            nick_name: '',
            id_process: '',
        });
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <Modal.Body>
                    <div className="row">
                        <h5>Nombre</h5>
                        <input type="text" id="name" name="name" className="h-75 w-100 ml-4 mb-3" placeholder="ej. Juan Pérez" value={form.name} onChange={(e) => updateForm({ name: e.target.value })} required />
                    </div>
                    <div className="row">
                        <h5>Apodo</h5>
                        <input type="text" id="nick_name" name="nick_name" className="h-75 w-100 ml-4 mb-3" placeholder="ej. Juancho" value={form.nick_name} onChange={(e) => updateForm({ nick_name: e.target.value })} required />
                    </div>
                    <div className="row">
                        <h5>Elige el proceso</h5>
                        <select type="text" id="id_process" name="id_process" className="col" value={form.id_process} onChange={(e) => updateForm({ id_process: e.target.value })} required>
                            <option value="" disabled selected>Selecciona el proceso</option>
                            <option value="Conteo">Conteo</option>
                            <option value="Rechazado">Rechazado</option>
                            <option value="Esmerilado">Esmerilado</option>
                            <option value="Pulido">Pulido</option>
                            <option value="Remachado">Remachado</option>
                            <option value="Empaquetado">Empacado</option>
                        </select>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="submit" className="btn-add" onClick={() => window.location.reload()}>Crear</button>
                </Modal.Footer>
            </form>
        </div>
    );
}

export default CreateWorker;
