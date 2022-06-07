// CU 46 47 48 49
// MT https://docs.google.com/spreadsheets/d/1geuVnd1ByaFLBXFXNAlN5PL-K0QVR2rq/edit?usp=sharing&ouid=103960253138118107632&rtpof=true&sd=true

import 'bootstrap/dist/css/bootstrap.css';
import './styles/dashboard.css';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Environment from '../Environment';

/**
   * CreateBuyer
   * @description Set of functions to display modal of Create Buyer
   * @returns HTML with fetched data
   */
function CreateBuyer() {
    const [form, setForm] = useState({
        name: '',
        city: '',
        phone: '',
        mail: '',
        address: '',
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

        const newBuyer = { ...form };

        await fetch(`${Environment()}/comprador/post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBuyer),
        });

        setForm({
            name: '',
            city: '',
            phone: '',
            mail: '',
            address: '',
        });
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <Modal.Body className="p-2">
                    <h5>Nombre</h5>
                    <input type="text" id="name" name="name" className="h-75 w-100 ml-4 mb-3" placeholder="ej. Juan Pérez" value={form.name} onChange={(e) => updateForm({ name: e.target.value })} required />
                    <h5>Ciudad</h5>
                    <input type="text" id="city" name="city" className="h-75 w-100 ml-4 mb-3" placeholder="ej. Querétaro" value={form.city} onChange={(e) => updateForm({ city: e.target.value })} required />
                    <h5>Teléfono</h5>
                    <input type="text" id="phone" name="phone" className="h-75 w-100 ml-4 mb-3" placeholder="ej. 442 354 8266" value={form.phone} onChange={(e) => updateForm({ phone: e.target.value })} required />
                    <h5>Correo</h5>
                    <input type="mail" id="mail" name="mail" className="h-75 w-100 ml-4 mb-3" placeholder="ej. ejemplo@mail.com" value={form.mail} onChange={(e) => updateForm({ mail: e.target.value })} required />
                    <h5>Dirección</h5>
                    <input type="text" id="address" name="address" className="h-75 w-100 ml-4 mb-3" placeholder="ej. Jacaranda 915 UH 27 de mayo" value={form.address} onChange={(e) => updateForm({ address: e.target.value })} required />
                </Modal.Body>
                <Modal.Footer>
                    <button type="submit" className="btn-add" onClick={() => window.location.reload()}>Crear</button>
                </Modal.Footer>
            </form>
        </div>
    );
}

export default CreateBuyer;
