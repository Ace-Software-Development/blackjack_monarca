// CU 21
// MT https://docs.google.com/spreadsheets/d/1geuVnd1ByaFLBXFXNAlN5PL-K0QVR2rq/edit?usp=sharing&ouid=103960253138118107632&rtpof=true&sd=true

import 'bootstrap/dist/css/bootstrap.css';
import './styles/dashboard.css';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import Environment from '../Environment';

/**
   * CreateOrder
   * @description Set of functions to display modal of Create Order
   * @returns HTML with fetched data
   */
function CreateOrder() {
    const [form, setForm] = useState({
        name: '',
        id_buyer: '',
        possible_day: '',
    });

    /**
* updateForm
* @description updates data of a form
* @param value: new values of the form
* @returns an updated form
*/
    function updateForm(value) {
        return setForm((prev) => ({ ...prev, ...value }));
    }

    const [buyers, setBuyers] = useState([]);

    /**
 * getBuyers
 * @description Fetches existing categories from the database through the server
 */
    async function getBuyers() {
        const response = await fetch(`${Environment()}/comprador/get`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const buyer = await response.json();
        setBuyers(buyer.data);
    }

    /**
* buyersList
* @description Creates a json array with buyers for the select component
* @returns Array with label and value of buyers
*/
    function buyersList() {
        // eslint-disable-next-line no-plusplus
        return buyers.map((buyer) => (
            <option key={buyer.objectId} value={buyer.objectId}>{buyer.name}</option>
        ));
    }

    /**
   * onSubmit
   * @description Posts a product in an order through a fetch to the server
   * @param e: Context
   */
    async function onSubmit(e) {
        e.preventDefault();

        const newOrder = { ...form };

        await fetch(`${Environment()}/empacado/orden/post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newOrder),
        });

        setForm({
            name: '',
            id_buyer: '',
            possible_day: '',
        });
        window.location.reload();
    }

    useEffect(() => {
        getBuyers();
    }, []);

    return (
        <div>
            <form onSubmit={onSubmit}>
                <Modal.Body>
                    <div className="row">
                        <h5>Nombre del pedido</h5>
                        <input type="text" id="name" name="name" className="form-control" placeholder="Nombre" value={form.name} onChange={(e) => updateForm({ name: e.target.value })} required />
                    </div>
                    <div className="row">
                        <h5>Posible d??a de entrega</h5>
                        <input type="date" id="possible_day" name="possible_day" className="form-control" value={form.possible_day} onChange={(e) => updateForm({ possible_day: e.target.value })} required />
                    </div>
                    <div className="row">
                        <h5>Cliente del pedido</h5>
                        <select type="text" id="buyer" name="buyer" className="form-control" onChange={(e) => updateForm({ id_buyer: e.target.value })} required>
                            <option value="" disabled selected>Selecciona el comprador</option>
                            {buyersList()}
                        </select>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="submit" className="btn-add">Crear</button>
                </Modal.Footer>
            </form>
        </div>
    );
}

export default CreateOrder;
