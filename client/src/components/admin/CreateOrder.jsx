import 'bootstrap/dist/css/bootstrap.css';
import './styles/dashboard.css';
import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

/**
   * CreateOrder
   * @description Set of functions to display modal of Create Order
   * @returns HTML with fetched data
   */
function CreateOrder() {
    const [form, setForm] = useState({
        name: '',
        id_buyer: '',
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
        const response = await fetch('http://localhost:8888/entrega/categorias/get');
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
   * @description Posts an order through a fetch to the server
   * @param e: Context
   */
    async function onSubmit(e) {
        e.preventDefault();

        const newOrder = { ...form };

        await fetch('http://localhost:8888/producto/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newOrder),
        });

        setForm({
            name: '',
            id_buyer: '',
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
                        <div>Nombre del pedido</div>
                        <input type="text" id="name" name="name" className="col" placeholder="Nombre" value={form.name} onChange={(e) => updateForm({ name: e.target.value })} required />
                    </div>
                    <div className="row">
                        <div>Comprador del pedido</div>
                        <select type="text" id="buyer" name="buyer" className="col" onChange={(e) => updateForm({ buyer: e.target.value })} required>
                            <option value="" disabled selected>Selecciona el comprador</option>
                            {buyersList()}
                        </select>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => window.location.reload()}>
                        Cerrar
                    </Button>
                    <button type="submit" className="col">Crear</button>
                </Modal.Footer>
            </form>
        </div>
    );
}

export default CreateOrder;
