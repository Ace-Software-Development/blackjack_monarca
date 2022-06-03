import 'bootstrap/dist/css/bootstrap.css';
import './styles/dashboard.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Modal, Button } from 'react-bootstrap';

/**
   * CreateCategory
   * @description Set of functions to display modal of Create Category
   * @returns HTML with fetched data
   */
function CreateCategory() {
    const navigate = useNavigate();

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

        console.log(form);

        const newCategory = { ...form };

        await fetch('http://localhost:8888/categoria/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCategory),
        });

        setForm({
            name: '',
        });
        navigate('/trabajadores');
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <Modal.Body>
                    <div className="row">
                        <div>Nombre</div>
                        <input type="text" id="name" name="name" className="col" placeholder="Nombre" value={form.name} onChange={(e) => updateForm({ name: e.target.value })} required />
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

export default CreateCategory;
