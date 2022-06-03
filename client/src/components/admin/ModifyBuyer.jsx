import 'bootstrap/dist/css/bootstrap.css';
import './styles/dashboard.css';
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

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

        await fetch('http://localhost:8888/comprador/modify', {
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
                    <div className="row">
                        <div>Nombre</div>
                        <input type="text" id="name" name="name" className="col" placeholder="Nombre" value={form.name} onChange={(e) => updateForm({ name: e.target.value })} required />
                    </div>
                    <div className="row">
                        <div>Ciudad</div>
                        <input type="text" id="city" name="city" className="col" placeholder="Ciudad" value={form.city} onChange={(e) => updateForm({ city: e.target.value })} required />
                    </div>
                    <div className="row">
                        <div>Teléfono</div>
                        <input type="text" id="phone" name="phone" className="col" placeholder="Teléfono" value={form.phone} onChange={(e) => updateForm({ phone: e.target.value })} required />
                    </div>
                    <div className="row">
                        <div>Correo</div>
                        <input type="mail" id="mail" name="mail" className="col" placeholder="Correo" value={form.mail} onChange={(e) => updateForm({ mail: e.target.value })} required />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => window.location.reload()}>
                        Cerrar
                    </Button>
                    <button type="submit" className="col">Modificar</button>
                </Modal.Footer>
            </form>
        </div>
    );
}

export default ModifyBuyer;
