import 'bootstrap/dist/css/bootstrap.css';
import './styles/dashboard.css';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Environment from '../Environment';

/**
   * CreateDisk
   * @description Set of functions to display modal of Create Disk
   * @returns HTML with fetched data
   */
function CreateDisk() {
    const [form, setForm] = useState({
        name: '',
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

        const newCategory = { ...form };

        await fetch(`${Environment()}/disco/post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCategory),
        });

        setForm({
            name: '',
        });
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <Modal.Body>
                    <div className="row">
                        <h5>Nombre</h5>
                        <input type="text" id="name" name="name" className="h-75 w-100 ml-4 mb-3" placeholder="ej. 70 x 200" value={form.name} onChange={(e) => updateForm({ name: e.target.value })} required />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="submit" className="btn-add" onClick={() => window.location.reload()}>Crear</button>
                </Modal.Footer>
            </form>
        </div>
    );
}

export default CreateDisk;
