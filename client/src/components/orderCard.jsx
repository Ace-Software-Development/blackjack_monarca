import { Modal } from 'react-bootstrap';
import React, { useState } from 'react';
import ModifyOrder from './admin/ModifyOrder';
import DeleteOrder from './admin/DeleteOrder';

function orderCard(title, city, date, order) {
    const [show, setShow] = useState(false);
    const handleCloseMod = () => setShow(false);
    const handleShowMod = () => setShow(true);

    const [showD, setShowD] = useState(false);
    const handleCloseDMod = () => setShowD(false);
    const handleShowDMod = () => setShowD(true);

    return (
        <>
            <div className="card home-card text-center ">
                <div className="card-body align-items-center justify-content-center">
                    <div>
                        <a href={`/dashboard/pedidos/${order.objectId}`}>
                            <div className="row">
                                <h2 className="card-title align-middle mt-3">{title}</h2>
                                <h5 className="card-title align-middle mt-1">{city}</h5>
                                <h5 className="card-title align-middle mt-1">{date}</h5>
                            </div>
                        </a>
                        <div className="row">
                            <div className="col">
                                <button type="button" className="btn" onClick={handleShowMod}>
                                    <ion-icon size="large" name="create-outline" />
                                </button>
                            </div>
                            <div className="col">
                                <button type="button" className="btn" onClick={handleShowDMod}>
                                    <ion-icon size="large" name="trash-outline" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={show} onHide={handleCloseMod}>
                <Modal.Header closeButton>
                    <Modal.Title>Modificar</Modal.Title>
                </Modal.Header>
                {ModifyOrder(
                    order.name,
                    order.id_buyer.objectId,
                    order.possible_day,
                    order.objectId,
                )}
            </Modal>

            <Modal show={showD} onHide={handleCloseDMod}>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar</Modal.Title>
                </Modal.Header>
                {DeleteOrder(order.objectId, order.name)}
            </Modal>
        </>
    );
}

export default orderCard;
