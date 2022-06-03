import 'bootstrap/dist/css/bootstrap.css';
import './styles/dashboard.css';
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

/**
   * Conteo
   * @description Set of functions to display Conteo
   * @returns HTML with fetched data
   */
function DeleteCategory(categoryId, categoryName) {
    const [form, setForm] = useState({
        objectId: categoryId,
    });

    /**
   * onSubmit
   * @description Posts incoming disk through a fetch to the server
   * @param e: Context
   */
    async function onSubmit(e) {
        e.preventDefault();

        const newWorker = { ...form };

        await fetch('http://localhost:8888/categoria/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newWorker),
        });

        setForm({
            objectId: '',
        });
        window.location.reload();
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <Modal.Body>
                    <div className="row">
                        <div className="col">
                            {`Seguro que quieres eliminar la categoría ${categoryName}`}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => window.location.reload()}>
                        Cerrar
                    </Button>
                    <button type="submit" className="col">Eliminar</button>
                </Modal.Footer>
            </form>
        </div>
    );
}

export default DeleteCategory;
