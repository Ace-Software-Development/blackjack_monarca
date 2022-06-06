import 'bootstrap/dist/css/bootstrap.css';
import './styles/dashboard.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Modal } from 'react-bootstrap';

/**
   * CreateProductOrder
   * @description Set of functions to display modal of Create Worker
   * @returns HTML with fetched data
   */
function CreateProductOrder() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        number: '',
        orderId: '',
        id_product: '',
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

        console.log(form);

        const newWorker = { ...form };

        await fetch('http://localhost:8888/trabajador/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newWorker),
        });

        setForm({
            number: '',
            orderId: '',
            id_product: '',
        });
        navigate('/trabajadores');
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <Modal.Body>
                    <div className="row">
                        <h5>Nombre</h5>
                        <input type="text" id="name" name="name" className="col" placeholder="Nombre" value={form.name} onChange={(e) => updateForm({ name: e.target.value })} required />
                    </div>
                    <div className="row">
                        <h5>Apodo</h5>
                        <input type="text" id="nick_name" name="nick_name" className="col" placeholder="Apodo" value={form.nick_name} onChange={(e) => updateForm({ nick_name: e.target.value })} required />
                    </div>
                    <div className="row">
                        <h5>Elige el proceso</h5>
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
                    <button type="submit" className="btn-add" onClick={() => window.location.reload()}>Crear</button>
                </Modal.Footer>
            </form>
        </div>
    );
}

export default CreateProductOrder;
