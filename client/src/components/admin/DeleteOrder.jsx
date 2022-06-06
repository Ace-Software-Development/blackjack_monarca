import 'bootstrap/dist/css/bootstrap.css';
import './styles/dashboard.css';
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Environment from '../Environment';

/**
   * DeleteWorker
   * @description Set of functions to display modal of Delete Worker
   * @returns HTML with fetched data
   */
function DeleteOrder(orderId, orderName) {
    const [form, setForm] = useState({
        objectId: orderId,
    });

    /**
   * onSubmit
   * @description Posts incoming disk through a fetch to the server
   * @param e: Context
   */
    async function onSubmit(e) {
        e.preventDefault();

        const newOrder = { ...form };

        await fetch(`${Environment()}/empacado/orden/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newOrder),
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
                            {`Seguro que quieres eliminar el pedido ${orderName}`}
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

export default DeleteOrder;
