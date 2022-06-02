import 'bootstrap/dist/css/bootstrap.css';
import './styles/dashboard.css';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import CreateWorker from './CreateWorker';
import ModifyWorker from './ModifyWorker';
import DeleteWorker from './DeleteWorker';

/**
 * IncomeDisk
 * @param {disk} show all Income Disk data
 * @description Shows the income disk information on the page
 * @returns HTML with fetched data
 */
function Workers({ worker }) {
    const [show, setShow] = useState(false);
    const handleCloseMod = () => setShow(false);
    const handleShowMod = () => setShow(true);

    const [showD, setShowD] = useState(false);
    const handleCloseDMod = () => setShowD(false);
    const handleShowDMod = () => setShowD(true);

    return (
        <>
            <tr>
                <th>
                    <div>{worker.name}</div>
                    <div className="sub-text2">Nombre de usuario</div>
                </th>
                <th>
                    <div>{worker.nick_name}</div>
                    <div className="sub-text1">Apodo</div>
                </th>
                <th>
                    <div>{worker.id_process}</div>
                    <div className="sub-text1">Proceso</div>
                </th>
                <th>
                    <button type="button" onClick={handleShowMod}>
                        <ion-icon size="large" name="create-outline" />
                    </button>
                </th>
                <th>
                    <button type="button" onClick={handleShowDMod}>
                        <ion-icon size="large" name="trash-outline" />
                    </button>
                </th>
            </tr>

            <Modal show={show} onHide={handleCloseMod}>
                <Modal.Header closeButton>
                    <Modal.Title>Modificar</Modal.Title>
                </Modal.Header>
                {ModifyWorker(worker.objectId, worker.name, worker.nick_name, worker.id_process)}
            </Modal>

            <Modal show={showD} onHide={handleCloseDMod}>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar</Modal.Title>
                </Modal.Header>
                {DeleteWorker(worker.objectId, worker.name, worker.nick_name)}
            </Modal>
        </>

    );
}
Workers.propTypes = {
    worker: PropTypes.string.isRequired,
};

/**
   * Conteo
   * @description Set of functions to display Conteo
   * @returns HTML with fetched data
   */
function Worker() {
    const [workers, setWorkers] = useState([]);
    const [show, setShow] = useState(false);

    const handleCloseCreate = () => setShow(false);
    const handleShowCreate = () => setShow(true);

    async function getAllWorkers() {
        const response = await fetch('http://localhost:8888/trabajador/get');
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.cutomAlert(message);
            return;
        }

        const worker = await response.json();
        setWorkers(worker.data);
    }

    useEffect(() => {
        getAllWorkers();
    }, []);

    /**
   * disksList
   * @description Maps all disks in the interface
   * @returns Component with name and id of the disk
   */
    function workersList() {
        return workers.slice(0).reverse().map((worker) => (
            <Workers worker={worker} key={worker.name} />
        ));
    }

    return (
        <div>
            <div className="row d-flex justify-content-center">
                <div className="col-10 mt-4">
                    <div className="card conteo-card">
                        <div className="card-body">
                            <div>
                                <div className="row justify-content-between">
                                    <div className="col-2">
                                        Trabajadores
                                    </div>
                                    <button type="button" variant="primary" className="col-2 btn-add" onClick={handleShowCreate}>
                                        Agregar
                                    </button>
                                </div>
                                <table className="table table-striped" style={{ marginTop: 20 }}>
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Apodo</th>
                                            <th>Proceso</th>
                                            <th> </th>
                                            <th> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {workersList()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={show} onHide={handleCloseCreate}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear trabajador</Modal.Title>
                </Modal.Header>
                <CreateWorker />
            </Modal>
        </div>
    );
}

export default Worker;
