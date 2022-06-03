import 'bootstrap/dist/css/bootstrap.css';
import './styles/dashboard.css';
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

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

        await fetch('http://localhost:8888/categoria/modify', {
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
                    <div className="row">
                        <div>Nombre</div>
                        {form.objectId}
                        <input type="text" id="name" name="name" className="col" placeholder="Nombre" value={form.name} onChange={(e) => updateForm({ name: e.target.value })} required />
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

export default ModifyCategory;
