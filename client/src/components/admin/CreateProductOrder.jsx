// CU 51
// MT https://docs.google.com/spreadsheets/d/1geuVnd1ByaFLBXFXNAlN5PL-K0QVR2rq/edit?usp=sharing&ouid=103960253138118107632&rtpof=true&sd=true

import 'bootstrap/dist/css/bootstrap.css';
import './styles/dashboard.css';
import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import Select from 'react-select';
import Environment from '../Environment';

/**
   * CreateProductOrder
   * @description Set of functions to display modal of Create Worker
   * @returns HTML with fetched data
   */
function CreateProductOrder(orderId) {
    const [form, setForm] = useState({
        number: '',
        orderId,
        id_product: '',
    });

    const [models, setModels] = useState([]);
    const [selectedCategory, setCategorySelected] = useState('');
    const [selectedModel, setModelSelected] = useState('');
    const [modelsOption, setModelsOption] = useState([]);
    const [modelName, setModelName] = useState([]);
    const [categoryName, setCategoryName] = useState([]);
    const [categories, setCategories] = useState([]);
    const categoriesOption = [];

    /**
     * getModels
     * @description Fetches existing products from the database through the server
     */
    async function getModels() {
        const response = await fetch(`${Environment()}/entrega/modelos/get/${selectedCategory}`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const product = await response.json();
        setModels(product.data);
    }

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
    * updateForm
    * @description updates data of a form
    * @param value: new values of the form
    * @returns an updated form
    */
    function updateForm(value) {
        return setForm((prev) => ({ ...prev, ...value }));
    }

    /**
    * onSubmit
    * @description saves the new product in the corresponding order
    * @param e: context
    */
    async function onSubmit(e) {
        e.preventDefault();

        console.log(form);

        const newWorker = { ...form };

        await fetch(`${Environment()}/productOrder/post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newWorker),
        });

        setForm({
            number: '',
            orderId: '',
            id_product: '',
            model: '',
            category: '',
        });
        window.location.reload();
    }

    /**
   * ModelsList
   * @description Maps all models in the interface
   * @returns Component with name and id of the model
   */
    async function modelsList() {
        const auxModelsOption = [];
        for (let i = 0; i < models.length; i += 1) {
            auxModelsOption[i] = {
                label: `${models[i].model} ${models[i].aluminium}`,
                value: models[i].objectId,
            };
        }
        setModelsOption(auxModelsOption);
    }

    /**
   * modelSelect
   * @param model: selected model
   * @description finds the id of the model and saves it
   */
    function modelSelect(model) {
        for (let i = 0; i < models.length; i += 1) {
            if (model.value === models[i].objectId) {
                setModelName(`${models[i].model} ${models[i].aluminium}`);
                setModelSelected(models[i].objectId);
                updateForm({ id_product: models[i].objectId });
            }
        }
    }

    /**
   * categoriesList
   * @description Maps all categories in the interface
   * @returns Component with name and id of the category
   */
    function categoriesList() {
        for (let i = 0; i < categories.length; i += 1) {
            categoriesOption[i] = { label: categories[i].name, value: categories[i].objectId };
        }
    }

    categoriesList();

    /**
   * categorySelect
   * @param category: selected category
   * @description finds the id of the category and saves it
   */
    function categorySelect(category) {
        for (let i = 0; i < categories.length; i += 1) {
            if (category.value === categories[i].objectId) {
                setCategorySelected(categories[i].objectId);
                setCategoryName(categories[i].name);
                updateForm(
                    {
                        category: categoryName,
                        id_product: '',
                    },
                );
                setModelName('');
                setModelSelected('');
            }
        }
    }

    useEffect(() => {
        getModels();
        modelsList();
        getCategories();
        categoriesList();
    }, [selectedCategory, models, modelName]);

    return (
        <div>
            <form onSubmit={onSubmit}>
                <Modal.Body>
                    <div className="row">
                        <h5>Categoría</h5>
                        <Select
                            options={categoriesOption}
                            onChange={(e) => categorySelect(e)}
                            required
                        />
                    </div>
                    <div className="row">
                        <h5>Modelo</h5>
                        <Select
                            value={{ label: modelName, value: selectedModel }}
                            options={modelsOption}
                            onChange={(e) => modelSelect(e)}
                            required
                        />
                    </div>
                    <div className="row">
                        <h5>Número de piezas</h5>
                        <input className="form-control" type="number" id="number" min="0" pattern="^[0-9]+" name="number" value={form.number} onChange={(e) => updateForm({ number: e.target.value })} required />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="submit" className="btn-add">Crear</button>
                </Modal.Footer>
            </form>
        </div>
    );
}

export default CreateProductOrder;
