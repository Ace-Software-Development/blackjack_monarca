/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import Header from './Header';

let selectedModel = '';
let selectedCategory = '';

/**
 * Categories
 * @description React component to display each category in a card
 * @param category: Json with the attributes objectId and name
 * @returns Div component
 */
function Categories({ category }) {
    return ({ label: category.name, value: category.objectId });
}

Categories.propTypes = {
    category: PropTypes.shape({
        objectId: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }),
};

Categories.defaultProps = {
    category: 'category',
};

/**
 * Products
 * @description React component to display each model
 * @param product: Json with the attributes objectId and model
 * @returns Option component
 */
function Products({ product }) {
    return (
        <option value={product.objectId}>
            {product.model}
        </option>
    );
}
Products.propTypes = {
    product: PropTypes.string.isRequired,
};

function Quantity() {
    const params = useParams();
    const navigate = useNavigate();
    selectedModel = params.model;
    selectedCategory = params.category;

    const categoriesOption = [];
    const modelsOption = [];

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const [categoryName, setCategory] = useState(0);
    const [modelName, setModel] = useState(0);

    /**
   * categoriesList
   * @description Creates a json array with categories for the select component
   * @returns Array with label and value of categories
   */
    function categoriesList() {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < categories.length; i++) {
            categoriesOption[i] = { label: categories[i].name, value: categories[i].objectId };
        }
    }

    /**
   * productsList
   * @description Creates a json array with products for the select component
   * @returns Array with label and value of products
   */
    function productsList() {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < products.length; i++) {
            modelsOption[i] = { label: `${products[i].model} ${products[i].aluminium}`, value: products[i].objectId };
        }
    }

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
     * getModels
     * @description Fetches existing products from the database through the server
     */
    async function getModels() {
        const response = await fetch(`http://localhost:8888/entrega/modelos/get/${selectedCategory}`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const product = await response.json();
        setProducts(product.data);
    }

    /**
     * getCategory
     * @description Fetches category from the database through the server
     */
    async function getCategory() {
        const response = await fetch(`http://localhost:8888/entrega/categoria/get/${selectedCategory}`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const category = await response.json();
        setCategory(category.data);
    }

    /**
     * getModel
     * @description Fetches category from the database through the server
     */
    async function getModel() {
        if (selectedModel !== '-1') {
            const response = await fetch(`http://localhost:8888/entrega/modelo/get/${selectedModel}`);
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.customAlert(message);
                return;
            }
            const model = await response.json();
            setModel(model.data);
            productsList();
        }
    }

    useEffect(() => {
        getCategories();
        getModels();
        getCategory();
        getModel();
    }, []);

    categoriesList();
    productsList();

    const [form, setForm] = useState({
        category: selectedCategory,
        model: selectedModel,
        numberWithLid: 0,
        numberWithOutLid: 0,
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

    /**
   * onSubmit
   * @description Posts package product through a fetch to the server
   * @param e: Context
   */
    async function onSubmit(e) {
        e.preventDefault();

        const newPart = { ...form };

        await fetch('http://localhost:8888/producto/postInventory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPart),
        });

        setForm({
            category: selectedCategory,
            model: selectedModel,
            numberWithLid: 0,
            numberWithOutLid: 0,
        });

        navigate('/empacado/inventario');
    }

    /**
   * sum
   * @description Increment the number of pieces registered by the user
   * @param input: Where to increment the value. Completed pieces or second pieces.
   */
    function sum(input) {
        if (input === 'completed') {
            document.getElementById('numberWithLid').stepUp();
        } else {
            document.getElementById('numberWithOutLid').stepUp();
        }
    }

    /**
   * res
   * @description Substract the number of pieces registered by the user
   * @param input: Where to decrement the value. Completed pieces or second pieces.
   */
    function res(input) {
        if (input === 'completed') {
            document.getElementById('numberWithLid').stepDown();
        } else {
            document.getElementById('numberWithOutLid').stepDown();
        }
    }

    /**
   * onChangeCategory
   * @description Changes the saved value of the selected category
   * @param category: Id of the most resent selected category
   */
    function onChangeCategory(category) {
        navigate(`/empacado/registrar/${category.value}/${-1}`);
        window.location.reload();
    }

    /**
   * onChangeModel
   * @description Changes the saved value of the selected model
   * @param model: Id of the most resent selected model
   */
    function onChangeModel(model) {
        navigate(`/empacado/registrar/${selectedCategory}/${model.value}`);
        window.location.reload();
    }

    return (
        <div className="row d-flex justify-content-center">
            <Header processName="Empacado" />
            <div className="col-10">
                <div className="row">
                    <div className="col">
                        <form className="card-shadow bg-white" onSubmit={onSubmit}>
                            <div className="row">
                                <div className="col-9">
                                    <h5>Resumen</h5>
                                </div>
                                <div className="col-2 text-center">
                                    <button type="submit" className="btn cardNext buttonNext mt-2 mb-2" id="buttonNext">
                                        Confirmar
                                    </button>
                                </div>
                                <p>
                                    {categoryName.name}
                                    {' - '}
                                    {`${modelName.model} ${modelName.aluminium}`}
                                </p>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div>
                                        <h3 className="text-center">Cantidad de productos a entregar</h3>
                                        <ul className="nav nav-pills nav-fill mb-3 tab-select" id="pills-tab" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Con tapa</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Sin tapa</button>
                                            </li>
                                        </ul>
                                        <div className="tab-content" id="pills-tabContent">
                                            <div className="tab-pane fade show active form group" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                                <div className="row quantity-input">
                                                    <div className="col-3">
                                                        <button className="btn btnNumber w-100 ratio ratio-1x1 p-5" type="button" onClick={() => res('completed')}>
                                                            <ion-icon name="remove-outline" />
                                                        </button>
                                                    </div>
                                                    <div className="col-6">
                                                        <input className="w-100 h-100 form-control text-center" type="number" min="0" pattern="^[0-9]+" name="numberWithLid" id="numberWithLid" value={form.numberWithLid} onChange={(e) => updateForm({ numberWithLid: e.target.value })} required />
                                                    </div>
                                                    <div className="col-3">
                                                        <button className="btn btnNumber w-100 ratio ratio-1x1 p-5" type="button" onClick={() => sum('completed')}>
                                                            <ion-icon name="add-outline" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade form group" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                                <div className="row quantity-input">
                                                    <div className="col-3">
                                                        <button className="btn btnNumber w-100 ratio ratio-1x1 p-5" type="button" onClick={() => res('second')}>
                                                            <ion-icon name="remove-outline" />
                                                        </button>
                                                    </div>
                                                    <div className="col-6">
                                                        <input className="w-100 h-100 form-control text-center" type="number" min="0" pattern="^[0-9]+" name="numberWithOutLid" id="numberWithOutLid" value={form.numberWithOutLid} onChange={(e) => updateForm({ numberWithOutLid: e.target.value })} />
                                                    </div>
                                                    <div className="col-3">
                                                        <button className="btn btnNumber w-100 ratio ratio-1x1 p-5" type="button" onClick={() => sum('second')}>
                                                            <ion-icon name="add-outline" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row d-flex justify-content-center">
                    <div className="col-4 mt-3">
                        <Select value={{ label: categoryName.name, value: categoryName.objectId }} options={categoriesOption} className="form-control form-select-lg" id="id_category" name="id_category" onChange={(e) => onChangeCategory(e)} />
                    </div>
                    <div className="col-4 mt-3">
                        <Select value={{ label: `${modelName.model} ${modelName.aluminium}`, value: modelName.objectId }} options={modelsOption} className="form-control form-select-lg" id="id_model" name="id_model" onChange={(e) => onChangeModel(e)} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Quantity;
