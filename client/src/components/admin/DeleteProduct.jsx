import 'bootstrap/dist/css/bootstrap.css';
import './styles/dashboard.css';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Environment from '../Environment';

/**
   * DeleteProduct
   * @description Set of functions to display modal of Delete Product
   * @returns HTML with fetched data
   */
function DeleteProduct(productId, category, model, aluminium) {
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

        const newProduct = { ...form };

        await fetch(`${Environment()}/producto/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
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
                            {`¿Seguro que quieres eliminar el producto ${category} ${model} ${aluminium}?`}
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

export default DeleteProduct;
