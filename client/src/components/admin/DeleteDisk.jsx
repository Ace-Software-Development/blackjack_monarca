import 'bootstrap/dist/css/bootstrap.css';
import './styles/dashboard.css';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Environment from '../Environment';

/**
   * DeleteDisk
   * @description Set of functions to display modal of Delete disk
   * @param diskId id of disk
   * @param diskName name of disk
   * @returns HTML with fetched data
   */
function DeleteDisk(diskId, diskName) {
    const [form, setForm] = useState({
        objectId: diskId,
    });

    /**
   * onSubmit
   * @description Posts incoming disk through a fetch to the server
   * @param e: Context
   */
    async function onSubmit(e) {
        e.preventDefault();

        const newDisk = { ...form };

        await fetch(`${Environment()}/disco/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newDisk),
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
                            {`¿Seguro que quieres eliminar el disco ${diskName}?`}
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

export default DeleteDisk;
