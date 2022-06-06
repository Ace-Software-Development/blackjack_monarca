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
function ModifyBuyer(buyerId, buyerName, buyerPhone, buyerCity, buyerMail) {
    const [form, setForm] = useState({
        objectId: buyerId,
        name: buyerName,
        city: buyerCity,
        phone: buyerPhone,
        mail: buyerMail,
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

        await fetch(`${Environment()}/comprador/modify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newWorker),
        });

        setForm({
            objectId: '',
            name: '',
            city: '',
            phone: '',
            mail: '',
        });
        window.location.reload();
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <Modal.Body>
                    <div>Nombre</div>
                    <input type="text" id="name" name="name" className="h-75 w-100 ml-4 mb-3" placeholder="Juan Pérez" value={form.name} onChange={(e) => updateForm({ name: e.target.value })} required />
                    <div>Ciudad</div>
                    <input type="text" id="city" name="city" className="h-75 w-100 ml-4 mb-3" placeholder="Querétaro" value={form.city} onChange={(e) => updateForm({ city: e.target.value })} required />
                    <div>Teléfono</div>
                    <input type="text" id="phone" name="phone" className="h-75 w-100 ml-4 mb-3" placeholder="442 354 8266" value={form.phone} onChange={(e) => updateForm({ phone: e.target.value })} required />
                    <div>Correo</div>
                    <input type="mail" id="mail" name="mail" className="h-75 w-100 ml-4 mb-3" placeholder="ejemplo@mail.com" value={form.mail} onChange={(e) => updateForm({ mail: e.target.value })} required />
                </Modal.Body>
                <Modal.Footer>
                    <button type="submit" className="btn-add">Modificar</button>
                </Modal.Footer>
            </form>
        </div>
    );
}

export default ModifyBuyer;
