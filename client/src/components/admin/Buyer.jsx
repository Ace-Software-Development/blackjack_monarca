import 'bootstrap/dist/css/bootstrap.css';
import './styles/dashboard.css';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import CreateBuyer from './CreateBuyer';
import ModifyBuyer from './ModifyBuyer';
import DeleteBuyer from './DeleteBuyer';
import Sidebar from './Sidebar';

/**
 * Buyers
 * @param {buyer} show all Worker data
 * @description Shows the buyer information on the page
 * @returns HTML with fetched data
 */
function Buyers({ buyer }) {
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
                    <div>{buyer.name}</div>
                    <div className="sub-text2">Nombre del comprador</div>
                </th>
                <th>
                    <div>{buyer.city}</div>
                    <div className="sub-text1">Ciudad</div>
                </th>
                <th>
                    <div>{buyer.phone}</div>
                    <div className="sub-text1">Teléfono</div>
                </th>
                <th>
                    <div>{buyer.mail}</div>
                    <div className="sub-text1">Correo</div>
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
                {ModifyBuyer(buyer.objectId, buyer.name, buyer.phone, buyer.city, buyer.mail)}
            </Modal>

            <Modal show={showD} onHide={handleCloseDMod}>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar</Modal.Title>
                </Modal.Header>
                {DeleteBuyer(buyer.objectId, buyer.name)}
            </Modal>
        </>

    );
}
Buyers.propTypes = {
    buyer: PropTypes.string.isRequired,
};

/**
   * Buyer
   * @description Set of functions to display Comprador
   * @returns HTML with fetched data
   */
function Buyer() {
    const [buyers, setBuyers] = useState([]);
    const [show, setShow] = useState(false);

    const handleCloseCreate = () => setShow(false);
    const handleShowCreate = () => setShow(true);

    async function getAllBuyers() {
        const response = await fetch('http://localhost:8888/comprador/get');
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.cutomAlert(message);
            return;
        }

        const buyer = await response.json();
        setBuyers(buyer.data);
    }

    useEffect(() => {
        getAllBuyers();
    }, []);

    /**
   * workersList
   * @description Maps all workers in the interface
   * @returns Component with name and id of the worker
   */
    function buyersList() {
        return buyers.slice(0).reverse().map((buyer) => (
            <Buyers buyer={buyer} key={buyer.objectId} />
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
                                            Compradores
                                        </div>
                                        <button type="button" variant="primary" className="col-2 btn-add" onClick={handleShowCreate}>
                                            Agregar
                                        </button>
                                    </div>
                                    <table className="table table-striped" style={{ marginTop: 20 }}>
                                        <thead>
                                            <tr>
                                                <th>Nombre</th>
                                                <th>Ciudad</th>
                                                <th>Teléfono</th>
                                                <th>Correo</th>
                                                <th> </th>
                                                <th> </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {buyersList()}
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
                <CreateBuyer />
            </Modal>
        </div>
    );
}

export default Buyer;
