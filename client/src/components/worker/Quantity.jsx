/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import Header from './Header';

let selectedModel = '';
let selectedCategory = '';
let selectedWorker = '';
let selectedPart = '';
let selectedProcess = '';
let nextProcess = '';

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
   * Workers
   * @description React component to display each worker in a card
   * @param worker: Json with the attributes objectId and nick_name
   * @returns Div component
   */
function Workers({ worker }) {
    return (
        <option value={worker.objectId}>
            {worker.nick_name}
        </option>
    );
}
Workers.propTypes = {
    worker: PropTypes.string.isRequired,
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
    selectedProcess = params.process;
    if (params.model !== '-1') {
        selectedModel = params.model;
    } else {
        selectedModel = '-1';
    }
    selectedCategory = params.category;
    selectedWorker = params.worker;
    selectedPart = params.part;
    nextProcess = params.nextProcess;

    const workersOption = [];
    const categoriesOption = [];
    const modelsOption = [];

    const [workers, setWorkers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const [categoryName, setCategory] = useState(0);
    const [workerName, setWorker] = useState(0);
    const [modelName, setModel] = useState(0);

    /**
   * workersList
   * @description Creates a json array with workers for the select component
   * @returns Array with label and value of workers
   */
    function workersList() {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < workers.length; i++) {
            workersOption[i] = { label: workers[i].nick_name, value: workers[i].objectId };
        }
    }

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
            modelsOption[i] = { label: products[i].model, value: products[i].objectId };
        }
    }

    /**
     * getWorkers
     * @description Fetches existing workers from the database through the server
     */
    async function getWorkers() {
        const response = await fetch(`http://localhost:8888/entrega/trabajadores/get/${selectedProcess}`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }

        const worker = await response.json();
        setWorkers(worker.data);
    }

    /**
     * getCategories
     * @description Fetches existing categories from the database through the server
     */
    async function getCategories() {
        const response = await fetch('http://localhost:8888/entrega/categorias/get');
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
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
            window.alert(message);
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
            window.alert(message);
            return;
        }

        const category = await response.json();
        setCategory(category.data);
    }

    /**
     * getWorker
     * @description Fetches category from the database through the server
     */
    async function getWorker() {
        const response = await fetch(`http://localhost:8888/entrega/trabajador/get/${selectedWorker}`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }

        const worker = await response.json();
        setWorker({ objectId: worker.data.objectId, nick_name: worker.data.nick_name });
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
                window.alert(message);
                return;
            }
            const model = await response.json();
            setModel(model.data);
            productsList();
        }
    }

    useEffect(() => {
        getWorkers();
        getCategories();
        getModels();
        getCategory();
        getWorker();
        getModel();
    }, []);

    workersList();
    categoriesList();
    productsList();

    const [form, setForm] = useState({
        process: nextProcess,
        worker: selectedWorker,
        part: selectedPart,
        category: selectedCategory,
        model: selectedModel,
        numberCompleted: '',
        numberSecond: '',
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
   * @description Posts incoming disk through a fetch to the server
   * @param e: Context
   */
    async function onSubmit(e) {
        e.preventDefault();

        const newPart = { ...form };

        await fetch('http://localhost:8888/entrega/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPart),
        })
            .then(() => {
                console.log('new disk added');
            })
            .catch((error) => {
                window.alert(error);
            });

        setForm({
            process: nextProcess,
            worker: selectedWorker,
            part: selectedPart,
            category: selectedCategory,
            model: selectedModel,
            numberCompleted: '',
            numberSecond: '',
        });

        navigate('/inicio');
    }

    function sum(input) {
        if (input === 'completed') {
            document.getElementById('numberCompleted').stepUp();
        } else {
            document.getElementById('numberSecond').stepUp();
        }
    }
    function res(input) {
        if (input === 'completed') {
            document.getElementById('numberCompleted').stepDown();
        } else {
            document.getElementById('numberSecond').stepDown();
        }
    }

    function onChangeWorker(worker) {
        navigate(`/cantidad/${selectedProcess}/${nextProcess}/${worker.value}/${selectedPart}/${selectedCategory}/${selectedModel}`);
        window.location.reload();
    }

    function onChangeCategory(category) {
        navigate(`/cantidad/${selectedProcess}/${nextProcess}/${selectedWorker}/${selectedPart}/${category.value}/${-1}`);
        window.location.reload();
    }

    function onChangeModel(model) {
        navigate(`/cantidad/${selectedProcess}/${nextProcess}/${selectedWorker}/${selectedPart}/${selectedCategory}/${model.value}`);
        window.location.reload();
    }

    return (
        <div className="row d-flex justify-content-center">
            <Header processName={selectedProcess} />
            <div className="col-10">
                <div className="row">
                    <div className="col">
                        <div className="card-shadow bg-white">
                            <div className="row">
                                <h5>Resumen</h5>
                                <p>
                                    {workerName.nick_name}
                                    {' - '}
                                    {categoryName.name}
                                    {' - '}
                                    {modelName.model}
                                </p>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div>
                                        <ul className="nav nav-pills nav-fill mb-3 tab-select" id="pills-tab" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Completados</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Segunda</button>
                                            </li>
                                        </ul>
                                        <form className="tab-content" id="pills-tabContent" onSubmit={onSubmit}>
                                            <div className="tab-pane fade show active form group" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                                <div className="row quantity-input">
                                                    <div className="col-3">
                                                        <button className="btn btnNumber w-100 ratio ratio-1x1 p-5" type="button" onClick={() => res('completed')}>
                                                            <ion-icon name="remove-outline" />
                                                        </button>
                                                    </div>
                                                    <div className="col-6">
                                                        <input className="w-100 h-100 form-control" type="number" min="0" pattern="^[0-9]+" name="numberCompleted" id="numberCompleted" value={form.numberCompleted} onChange={(e) => updateForm({ numberCompleted: e.target.value })} required />
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
                                                        <input className="w-100 h-100 form-control" type="number" min="0" pattern="^[0-9]+" name="numberSecond" id="numberSecond" value={form.numberSecond} onChange={(e) => updateForm({ numberSecond: e.target.value })} required />
                                                    </div>
                                                    <div className="col-3">
                                                        <button className="btn btnNumber w-100 ratio ratio-1x1 p-5" type="button" onClick={() => sum('second')}>
                                                            <ion-icon name="add-outline" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-monarca">Confirmar</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4 mt-3">
                        <Select value={{ label: workerName.nick_name, value: workerName.objectId }} options={workersOption} className="form-control form-select-lg" id="id_worker" name="id_worker" onChange={(e) => onChangeWorker(e)} />
                    </div>
                    <div className="col-4 mt-3">
                        <Select value={{ label: categoryName.name, value: categoryName.objectId }} options={categoriesOption} className="form-control form-select-lg" id="id_category" name="id_category" onChange={(e) => onChangeCategory(e)} />
                    </div>
                    <div className="col-4 mt-3">
                        <Select value={{ label: modelName.model, value: modelName.objectId }} options={modelsOption} className="form-control form-select-lg" id="id_model" name="id_model" onChange={(e) => onChangeModel(e)} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Quantity;
