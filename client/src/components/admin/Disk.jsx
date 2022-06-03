import 'bootstrap/dist/css/bootstrap.css';
import './styles/dashboard.css';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import CreateDisk from './CreateDisk';
import ModifyDisk from './ModifyDisk';
import DeleteDisk from './DeleteDisk';
import Sidebar from './Sidebar';

/**
 * Disks
 * @param {disk} all disks
 * @description Shows the disks information on the page and buttons for
 * modals to create, modify and delete
 * @returns HTML with fetched data
 */
function Disks({ disk }) {
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
                    <div>{disk.name}</div>
                    <div className="sub-text2">Nombre del disco</div>
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
                {ModifyDisk(disk.objectId, disk.name)}
            </Modal>

            <Modal show={showD} onHide={handleCloseDMod}>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar</Modal.Title>
                </Modal.Header>
                {DeleteDisk(disk.objectId, disk.name)}
            </Modal>
        </>

    );
}
Disks.propTypes = {
    disk: PropTypes.string.isRequired,
};

/**
   * Disk
   * @description Set of functions to display Disks
   * @returns HTML with fetched data
   */
function Disk() {
    const [disks, setDisks] = useState([]);
    const [show, setShow] = useState(false);

    const handleCloseCreate = () => setShow(false);
    const handleShowCreate = () => setShow(true);

    /**
     * getDisks
     * @description Fetches existing disks from the database through the server
     */
    async function getDisks() {
        const response = await fetch('http://localhost:8888/discos/get');
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const disk = await response.json();
        setDisks(disk.data);
    }

    useEffect(() => {
        getDisks();
    }, []);

    /**
   * disksList
   * @description Maps all disks in the interface
   * @returns Component with name and id of the disk
   */
    function disksList() {
        return disks.map((disk) => (
            <Disks disk={disk} key={disk.objectId} />
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
                                        <div className="col-3">
                                            Categorías
                                        </div>
                                        <button type="button" variant="primary" className="col-2 btn-add" onClick={handleShowCreate}>
                                            Agregar
                                        </button>
                                    </div>
                                    <table className="table table-striped" style={{ marginTop: 20 }}>
                                        <thead>
                                            <tr>
                                                <th>Nombre</th>
                                                <th> </th>
                                                <th> </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {disksList()}
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
                    <Modal.Title>Crear Disco</Modal.Title>
                </Modal.Header>
                <CreateDisk />
            </Modal>
        </div>
    );
}

export default Disk;
