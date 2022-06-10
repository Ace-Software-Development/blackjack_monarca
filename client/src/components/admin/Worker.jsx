import 'bootstrap/dist/css/bootstrap.css';
import './styles/dashboard.css';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import CreateWorker from './CreateWorker';
import ModifyWorker from './ModifyWorker';
import DeleteWorker from './DeleteWorker';
import Sidebar from './Sidebar';
import Environment from '../Environment';

/**
 * Workers
 * @param {worker} show all Worker data
 * @description Shows the worker information on the page
 * @returns HTML with fetched data
 */
function Workers({ worker }) {
    const session = Cookies.get('sessionToken');
    const admin = Cookies.get('is_admin');
    const [permission, setPermission] = useState([]);
    /**
     * getPermission
     * @description Verifies that the user session token is valid
     */
    async function getPermission() {
        const response = await fetch(`${Environment()}/login/getPermission/${session}`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const perm = await response.json();
        setPermission(perm.data);
    }
    useEffect(() => {
        getPermission();
    }, [session, admin]);
    if (admin === 'false' || !permission) {
        return ('No tienes permisos');
    }
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
                    <h5>{worker.name}</h5>
                    <h6 className="sub-text2">Nombre de usuario</h6>
                </th>
                <th>
                    <h5>{worker.nick_name}</h5>
                    <h6 className="sub-text1">Apodo</h6>
                </th>
                <th>
                    <h5>{worker.id_process}</h5>
                    <h6 className="sub-text1">Proceso</h6>
                </th>
                <th>
                    <button type="button" className="btn" onClick={handleShowMod}>
                        <ion-icon size="large" name="create-outline" />
                    </button>
                </th>
                <th>
                    <button type="button" className="btn" onClick={handleShowDMod}>
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
   * Worker
   * @description Set of functions to display Trabajador
   * @returns HTML with fetched data
   */
function Worker() {
    const [workers, setWorkers] = useState([]);
    const [show, setShow] = useState(false);

    const handleCloseCreate = () => setShow(false);
    const handleShowCreate = () => setShow(true);

    async function getAllWorkers() {
        const response = await fetch(`${Environment()}/trabajador/get`);
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
    }, [workers]);

    /**
   * workersList
   * @description Maps all workers in the interface
   * @returns Component with name and id of the worker
   */
    function workersList() {
        return workers.slice(0).reverse().map((worker) => (
            <Workers worker={worker} key={worker.name} />
        ));
    }

    return (
        <div className="container-fluid">
            <Sidebar />
            <div>
                <div className="content d-flex px-4 pt-3 h-100">
                    <div className="col-10 mt-4">
                        <div className="card conteo-card">
                            <div className="card-body">
                                <div>
                                    <div className="row justify-content-between">
                                        <h3 className="col-4">
                                            Trabajadores
                                        </h3>
                                        <button type="button" variant="primary" className="col-2 btn-add" onClick={handleShowCreate}>
                                            Agregar
                                        </button>
                                    </div>
                                    <table className="w-100 mt-4" style={{ marginTop: 20 }}>
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
