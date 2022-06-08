// CU 40
// MT https://docs.google.com/spreadsheets/d/1geuVnd1ByaFLBXFXNAlN5PL-K0QVR2rq/edit?usp=sharing&ouid=103960253138118107632&rtpof=true&sd=true

import 'bootstrap/dist/css/bootstrap.css';
import './styles/dashboard.css';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Environment from '../Environment';

/**
   * ModifyCategory
   * @description Set of functions to display modal of Modify Category
   * @returns HTML with fetched data
   */
function ModifyCategory(catId, catName) {
    const [form, setForm] = useState({
        objectId: catId,
        name: catName,
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

        const newCategory = { ...form };

        await fetch(`${Environment()}/categoria/modify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCategory),
        });

        setForm({
            objectId: '',
            name: '',
        });
        window.location.reload();
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <Modal.Body>
                    <h6>Nombre</h6>
                    <input type="text" id="name" name="name" className="h-75 w-100 ml-4 mb-3" placeholder="Vaporera" value={form.name} onChange={(e) => updateForm({ name: e.target.value })} required />
                </Modal.Body>
                <Modal.Footer>
                    <button type="submit" className="btn-add">Modificar</button>
                </Modal.Footer>
            </form>
        </div>
    );
}

export default ModifyCategory;
