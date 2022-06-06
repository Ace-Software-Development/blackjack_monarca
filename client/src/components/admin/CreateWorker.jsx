import 'bootstrap/dist/css/bootstrap.css';
import './styles/dashboard.css';
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

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

        await fetch('http://localhost:8888/trabajador/post', {
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
        window.location.reload();
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <Modal.Body>
                    <div className="row">
                        <div>Nombre</div>
                        <input type="text" id="name" name="name" className="col" placeholder="Nombre" value={form.name} onChange={(e) => updateForm({ name: e.target.value })} required />
                    </div>
                    <div className="row">
                        <div>Apodo</div>
                        <input type="text" id="nick_name" name="nick_name" className="col" placeholder="Apodo" value={form.nick_name} onChange={(e) => updateForm({ nick_name: e.target.value })} required />
                    </div>
                    <div className="row">
                        <div>Elige el proceso</div>
                        <select type="text" id="id_process" name="id_process" className="col" value={form.id_process} onChange={(e) => updateForm({ id_process: e.target.value })} required>
                            <option value="" disabled selected>Selecciona el rol</option>
                            <option value="Conteo">Conteo</option>
                            <option value="Rechazado">Rechazado</option>
                            <option value="Esmerilado">Esmerilado</option>
                            <option value="Pulido">Pulido</option>
                            <option value="Remachado">Remachado</option>
                            <option value="Empaquetado">Empaquetado</option>
                        </select>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => window.location.reload()}>
                        Cerrar
                    </Button>
                    <button type="submit" className="col" onClick={() => window.location.reload()}>Crear</button>
                </Modal.Footer>
            </form>
        </div>
    );
}

export default CreateWorker;
