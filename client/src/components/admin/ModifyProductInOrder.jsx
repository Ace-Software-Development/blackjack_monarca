// CU 52
// MT https://docs.google.com/spreadsheets/d/1geuVnd1ByaFLBXFXNAlN5PL-K0QVR2rq/edit?usp=sharing&ouid=103960253138118107632&rtpof=true&sd=true

import 'bootstrap/dist/css/bootstrap.css';
import './styles/dashboard.css';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

/**
   * ModifyProduct
   * @description Set of functions to display modal of Modify Product
   * @returns HTML with fetched data
   */
function ModifyProductInOrder(productId, category, modelNumber, aluminiumModel, cant) {
    const [form, setForm] = useState({
        objectId: productId,
        number: cant,
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

        const newProduct = { ...form };

        await fetch('http://localhost:8888/productOrder/modify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        });

        setForm({
            objectId: '',
            number: '',
        });
        window.location.reload();
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <Modal.Body>
                    <div className="row">
                        <h5>{`Ingresa la nueva cantidad para ${category} ${modelNumber} ${aluminiumModel}`}</h5>
                    </div>
                    <div className="row">
                        <input min="0" pattern="^[0-9]+" type="number" id="number" name="number" className="form-control" placeholder="Cantidad" value={form.number} onChange={(e) => updateForm({ number: e.target.value })} required />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="submit" className="btn-add">Modificar</button>
                </Modal.Footer>
            </form>
        </div>
    );
}

export default ModifyProductInOrder;
