import 'bootstrap/dist/css/bootstrap.css';
import './styles/dashboard.css';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Environment from '../Environment';

/**
   * ModifyDisk
   * @description Set of functions to display modal of Modify Disk
   * @returns HTML with fetched data
   */
function ModifyDisk(disId, disName) {
    const [form, setForm] = useState({
        objectId: disId,
        name: disName,
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

        const newDisk = { ...form };

        await fetch(`${Environment()}/disco/modify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newDisk),
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
                    <div className="p-2">
                        <h5>Nombre</h5>
                        <input type="text" id="name" name="name" className="h-75 w-100 ml-4 mb-3" placeholder="70 x 200" value={form.name} onChange={(e) => updateForm({ name: e.target.value })} required />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="submit" className="btn-add">Modificar</button>
                </Modal.Footer>
            </form>
        </div>
    );
}

export default ModifyDisk;
