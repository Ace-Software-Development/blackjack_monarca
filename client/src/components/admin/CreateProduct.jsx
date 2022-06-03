import 'bootstrap/dist/css/bootstrap.css';
import './styles/dashboard.css';
import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

/**
   * CreateProduct
   * @description Set of functions to display modal of Create Product
   * @returns HTML with fetched data
   */
function CreateProduct() {
    const [form, setForm] = useState({
        category: '',
        model: '',
        aluminium: '',
        keyP: '',
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

    const [categories, setCategories] = useState([]);

    /**
 * getCategories
 * @description Fetches existing categories from the database through the server
 */
    async function getCategories() {
        const response = await fetch('http://localhost:8888/entrega/categorias/get');
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const category = await response.json();
        setCategories(category.data);
    }

    /**
* categoriesList
* @description Creates a json array with categories for the select component
* @returns Array with label and value of categories
*/
    function categoriesList() {
        // eslint-disable-next-line no-plusplus
        return categories.map((category) => (
            <option key={category.objectId} value={category.objectId}>{category.name}</option>
        ));
    }

    /**
   * onSubmit
   * @description Posts incoming disk through a fetch to the server
   * @param e: Context
   */
    async function onSubmit(e) {
        e.preventDefault();

        const newProduct = { ...form };

        await fetch('http://localhost:8888/producto/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        });

        setForm({
            category: '',
            model: '',
            aluminium: '',
            keyP: '',
        });
        window.location.reload();
    }

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <div>
            <form onSubmit={onSubmit}>
                <Modal.Body>
                    <div className="row">
                        <div>Modelo</div>
                        <input type="text" id="model" name="model" className="col" placeholder="Modelo" value={form.model} onChange={(e) => updateForm({ model: e.target.value })} required />
                    </div>
                    <div className="row">
                        <div>Aluminio</div>
                        <input type="text" id="aluminium" name="aluminium" className="col" placeholder="Tipo de aluminio" value={form.aluminium} onChange={(e) => updateForm({ aluminium: e.target.value })} required />
                    </div>
                    <div className="row">
                        <div>Key</div>
                        <input type="text" id="keyP" name="keyP" className="col" placeholder="key" value={form.keyP} onChange={(e) => updateForm({ keyP: e.target.value })} required />
                    </div>
                    <div className="row">
                        <div>Elige el proceso</div>
                        <select type="text" id="category" name="category" className="col" onChange={(e) => updateForm({ category: e.target.value })} required>
                            <option value="" disabled selected>Selecciona la categoría</option>
                            {categoriesList()}
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

export default CreateProduct;
