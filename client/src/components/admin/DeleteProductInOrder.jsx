import 'bootstrap/dist/css/bootstrap.css';
import './styles/dashboard.css';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Environment from '../Environment';

/**
   * DeleteProductInOrder
   * @description Set of functions to display modal of Delete Product in order
   * @returns HTML with fetched data
   */
function DeleteProductInOrder(productId, category, modelNumber, aluminiumModel) {
    const [form, setForm] = useState({
        objectId: productId,
    });

    /**
   * onSubmit
   * @description Posts incoming disk through a fetch to the server
   * @param e: Context
   */
    async function onSubmit(e) {
        e.preventDefault();

        const newWorker = { ...form };

        await fetch(`${Environment()}/productOrder/delete`, {
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
                            {`¿Seguro que quieres eliminar el producto ${category} ${modelNumber} ${aluminiumModel}?`}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="submit" className="btn btn-danger btn-md">Eliminar</button>
                </Modal.Footer>
            </form>
        </div>
    );
}

export default DeleteProductInOrder;
