import 'bootstrap/dist/css/bootstrap.css';
import './styles/dashboard.css';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Environment from '../Environment';

/**
   * DeleteBuyer
   * @description Set of functions to display modal of Delete Buyer
   * @returns HTML with fetched data
   */
function DeleteBuyer(buyerId, buyerName) {
    const [form, setForm] = useState({
        objectId: buyerId,
    });

    /**
   * onSubmit
   * @description Posts incoming disk through a fetch to the server
   * @param e: Context
   */
    async function onSubmit(e) {
        e.preventDefault();

        const newBuyer = { ...form };

        await fetch(`${Environment()}/comprador/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBuyer),
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
                            {`Confima que quieres eliminar al usuario ${buyerName}`}
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

export default DeleteBuyer;
