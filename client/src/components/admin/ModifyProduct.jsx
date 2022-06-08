// CU 36
// MT https://docs.google.com/spreadsheets/d/1geuVnd1ByaFLBXFXNAlN5PL-K0QVR2rq/edit?usp=sharing&ouid=103960253138118107632&rtpof=true&sd=true

import 'bootstrap/dist/css/bootstrap.css';
import './styles/dashboard.css';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import Environment from '../Environment';

/**
   * ModifyProduct
   * @description Set of functions to display modal of Modify Product
   * @returns HTML with fetched data
   */
function ModifyProduct(productId, categoryId, modelNumber, aluminiumModel, keyProduct) {
    const [form, setForm] = useState({
        objectId: productId,
        category: categoryId,
        model: modelNumber,
        aluminium: aluminiumModel,
        keyP: keyProduct,
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
        const response = await fetch(`${Environment()}/entrega/categorias/get`);
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

        await fetch(`${Environment()}/producto/modify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        });

        setForm({
            objectId: '',
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
                    <h5>Modelo</h5>
                    <input type="text" id="model" name="model" className="h-75 w-100 ml-4 mb-3" placeholder="Modelo" value={form.model} onChange={(e) => updateForm({ model: e.target.value })} required />
                    <h5>Aluminio</h5>
                    <input type="text" id="aluminium" name="aluminium" className="h-75 w-100 ml-4 mb-3" placeholder="Tipo de aluminio" value={form.aluminium} onChange={(e) => updateForm({ aluminium: e.target.value })} required />
                    <h5>Key</h5>
                    <input type="text" id="keyP" name="keyP" className="h-75 w-100 ml-4 mb-3" placeholder="key" value={form.keyP} onChange={(e) => updateForm({ keyP: e.target.value })} required />
                    <h5>Elige la categoría</h5>
                    <select type="text" id="category" name="category" className="h-75 w-100 ml-4 mb-3" value={form.category} onChange={(e) => updateForm({ category: e.target.value })} required>
                        <option value="" disabled>Selecciona la categoría</option>
                        {categoriesList()}
                    </select>
                </Modal.Body>
                <Modal.Footer>
                    <button type="submit" className="btn-add">Modificar</button>
                </Modal.Footer>
            </form>
        </div>
    );
}

export default ModifyProduct;
