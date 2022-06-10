// CU 31
// MT https://docs.google.com/spreadsheets/d/1geuVnd1ByaFLBXFXNAlN5PL-K0QVR2rq/edit?usp=sharing&ouid=103960253138118107632&rtpof=true&sd=true

import 'bootstrap/dist/css/bootstrap.css';
import './styles/dashboard.css';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Environment from '../Environment';

/**
   * ModifyWorker
   * @description Set of functions to display modal of Modify Worker
   * @returns HTML with fetched data
   */
function ModifyWorker(woekerId, workerName, workerNick, workerProcess) {
    const [form, setForm] = useState({
        objectId: woekerId,
        name: workerName,
        nick_name: workerNick,
        id_process: workerProcess,
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

        const newWorker = { ...form };

        await fetch(`${Environment()}/trabajador/modify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newWorker),
        });

        setForm({
            objectId: '',
            name: '',
            nick_name: '',
            id_process: '',
        });
        window.location.reload();
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <Modal.Body>
                    <h5>Nombre</h5>
                    <input type="text" id="name" name="name" className="h-75 w-100 ml-4 mb-3" placeholder="Nombre" value={form.name} onChange={(e) => updateForm({ name: e.target.value })} required />
                    <h5>Apodo</h5>
                    <input type="text" id="nick_name" name="nick_name" className="h-75 w-100 ml-4 mb-3" placeholder="Apodo" value={form.nick_name} onChange={(e) => updateForm({ nick_name: e.target.value })} required />
                    <h5>Elige el proceso</h5>
                    <select type="text" id="id_process" name="id_process" className="h-75 w-100 ml-4 mb-3" value={form.id_process} onChange={(e) => updateForm({ id_process: e.target.value })} required>
                        <option value="" disabled>Selecciona el proceso</option>
                        <option value="Conteo">Conteo</option>
                        <option value="Rechazado">Rechazado</option>
                        <option value="Esmerilado">Esmerilado</option>
                        <option value="Pulido">Pulido</option>
                        <option value="Remachado">Remachado</option>
                        <option value="Empaquetado">Empacado</option>
                    </select>
                </Modal.Body>
                <Modal.Footer>
                    <button type="submit" className="btn-add">Modificar</button>
                </Modal.Footer>
            </form>
        </div>
    );
}

export default ModifyWorker;
