/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useParams, useNavigate } from 'react-router-dom';
import ButtonNext from './ButtonNext';
import Header from './Header';

let selectedModel = '';
let selectedCategory = '';
let selectedWorker = '';
let selectedPart = '';
let nextProcess = '';
let nextBtn = '';
let url = '';
let process = '';

/**
     * setContext
     * @description Saves selected model in a variable
     * @param name: name of the model
     */
function setContext(id) {
    if (id) {
        selectedModel = id;
        url = `/cantidad/${process}/${nextProcess}/${selectedWorker}/${selectedPart}/${selectedCategory}/${selectedModel}`;
        nextBtn = ButtonNext(url);
    } else {
        url = `/cantidad/${process}/${nextProcess}/${selectedWorker}/${selectedPart}/${selectedCategory}/${selectedModel}`;
        if (nextBtn) {
            const button = document.getElementById('buttonNext');
            button.href = url;
        }
    }
}

export function CardModel(name, id, aluminium) {
    return (
        <a href="#">
            <button type="button" className="cardName btn text-center w-100 py-4 text-center my-4 card-shadow" onClick={() => setContext(id)}>
                <div>{name}</div>
                <h5>{aluminium}</h5>
            </button>
        </a>

    );
}

/**
 * Products
 * @description React component to display each model
 * @param product: Json with the attributes objectId and model
 * @returns Div component
 */
function Products({ product }) {
    return (
        <div className="col-4" value={product.objectId}>
            {CardModel(product.model, product.objectId, product.aluminium)}
        </div>
    );
}
Products.propTypes = {
    product: PropTypes.string.isRequired,
};

function ModelNumber() {
    const params = useParams();
    const navigate = useNavigate();

    process = params.process;
    selectedCategory = params.category;
    selectedWorker = params.worker;
    selectedPart = params.part;
    nextProcess = params.nextProcess;

    const [products, setProducts] = useState([]);
    const workersOption = [];
    const categoriesOption = [];

    const [workers, setWorkers] = useState([]);
    const [categories, setCategories] = useState([]);

    const [categoryName, setCategory] = useState(0);
    const [workerName, setWorker] = useState(0);

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
         * getWorkers
         * @description Fetches existing workers from the database through the server
         */
    async function getWorkers() {
        const response = await fetch(`http://localhost:8888/entrega/trabajadores/get/${process}`);
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
        setWorker(worker.data);
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
   * productsList
   * @description Maps all products in the interface
   * @returns Component with name and id of the product
   */
    function productsList() {
        return products.map((product) => (
            <Products product={product} key={product.objectId} />
        ));
    }

    useEffect(() => {
        getWorkers();
        getCategories();
        getModels();
        getWorker();
        getCategory();
    }, [nextBtn]);

    workersList();
    categoriesList();

    function onChangeWorker(worker) {
        setContext('');
        navigate(`/modelo/${process}/${nextProcess}/${worker.value}/${selectedPart}/${selectedCategory}`);
        window.location.reload();
    }

    function onChangeCategory(category) {
        setContext('');
        navigate(`/modelo/${process}/${nextProcess}/${selectedWorker}/${selectedPart}/${category.value}`);
        window.location.reload();
    }

    return (
        <div className="row d-flex justify-content-center">
            <Header processName={process} />
            <div className="card-shadow bg-white col-10 p-4">
                <div className="row">
                    <div className="col">
                        <h5>Resumen</h5>
                        <p>
                            {workerName.nick_name}
                            {' - '}
                            {categoryName.name}
                        </p>
                    </div>
                </div>
                <div className="row d-flex justify-content-center">
                    {productsList()}
                </div>
                <div className="row">
                    <div className="col-6">
                        <Select value={{ label: workerName.nick_name, value: workerName.objectId }} options={workersOption} className="form-control form-select-lg" id="id_worker" name="id_worker" onChange={(e) => onChangeWorker(e)} />
                    </div>
                    <div className="col-6">
                        <Select value={{ label: categoryName.name, value: categoryName.objectId }} options={categoriesOption} className="form-control form-select-lg" id="id_category" name="id_category" onChange={(e) => onChangeCategory(e)} />
                    </div>
                </div>
            </div>
            {nextBtn}
        </div>
    );
}

export default ModelNumber;
