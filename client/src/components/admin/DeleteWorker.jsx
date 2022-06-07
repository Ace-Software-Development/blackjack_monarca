import 'bootstrap/dist/css/bootstrap.css';
import './styles/dashboard.css';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Environment from '../Environment';

/**
   * DeleteWorker
   * @description Set of functions to display modal of Delete Worker
   * @returns HTML with fetched data
   */
function DeleteWorker(workerId, workerName, workerNick) {
    const [form, setForm] = useState({
        objectId: workerId,
        name: workerName,
        nick_name: workerNick,
    });

    /**
   * onSubmit
   * @description Posts incoming disk through a fetch to the server
   * @param e: Context
   */
    async function onSubmit(e) {
        e.preventDefault();

        const newWorker = { ...form };

        await fetch(`${Environment()}/trabajador/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newWorker),
        });

        setForm({
            objectId: '',
            name: '',
            nick_name: '',
        });
        window.location.reload();
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <Modal.Body>
                    <div className="row">
                        <div className="col">
                            {`¿Seguro que quieres eliminar al trabajador ${workerName} (${workerNick})?`}
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

export default DeleteWorker;
