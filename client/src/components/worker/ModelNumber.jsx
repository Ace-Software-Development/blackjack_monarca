// CU 4 Registrar entrega de piezas a otro proceso
// CU 5 Registrar producto dañado
/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from './Header';
import Environment from '../Environment';

let selectedModel = '';
let selectedCategory = '';
let selectedWorker = '';
let selectedPart = '';
let nextProcess = '';
let url = '';
let process = '';

/**
     * setContext
     * @description Saves selected model in a variable
     * @param name: name of the model
     */
function setContext(id) {
    const button = document.getElementById('buttonNext');
    if (id) {
        selectedModel = id;
        url = `/cantidad/${process}/${nextProcess}/${selectedWorker}/${selectedPart}/${selectedCategory}/${selectedModel}`;
        button.hidden = false;
    } else {
        url = `/cantidad/${process}/${nextProcess}/${selectedWorker}/${selectedPart}/${selectedCategory}/${selectedModel}`;
        button.hidden = false;
    }
}

/**
 * CardModel
 * @description Component with the model and type of aluminium of a product
 * @param name: name of the model
 * @param id: id of the model
 * @param aluminium: kind of aluminium of the model
 */
export function CardModel(name, id, aluminium) {
    return (
        <a href="#">
            <button type="button" className="cardName btn text-center w-100 py-4 text-center my-4 card-shadow" onClick={() => setContext(id)}>
                <p>{name}</p>
                <p>{aluminium}</p>
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
        const response = await fetch(`${Environment()}/entrega/trabajadores/get/${process}`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
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
     * getCategory
     * @description Fetches category from the database through the server
     */
    async function getCategory() {
        const response = await fetch(`${Environment()}/entrega/categoria/get/${selectedCategory}`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
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
        const response = await fetch(`${Environment()}/entrega/trabajador/get/${selectedWorker}`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
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
        const response = await fetch(`${Environment()}/entrega/modelos/get/${selectedCategory}`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
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
    }, []);

    workersList();
    categoriesList();

    /**
   * onChangeWorker
   * @description Change the url with a new id worker
   * @param worker: the new worker
   */
    function onChangeWorker(worker) {
        setContext('');
        navigate(`/modelo/${process}/${nextProcess}/${worker.value}/${selectedPart}/${selectedCategory}`);
        window.location.reload();
    }

    /**
   * onChangeCategory
   * @description Change the url with a new id category
   * @param category: the new category
   */
    function onChangeCategory(category) {
        setContext('');
        navigate(`/modelo/${process}/${nextProcess}/${selectedWorker}/${selectedPart}/${category.value}`);
        window.location.reload();
    }

    const session = Cookies.get('sessionToken');
    const [permission, setPermission] = useState([]);
    /**
     * getPermission
     * @description Verifies that the user session token is valid
     */
    async function getPermission() {
        const response = await fetch(`${Environment()}/login/getPermission/${session}`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const perm = await response.json();
        setPermission(perm.data);
    }
    useEffect(() => {
        getPermission();
    }, []);

    if (!permission) {
        return ('No tienes permisos');
    }
    return (
        <div className="row d-flex justify-content-center">
            <Header processName={process} />
            <div className="card-shadow bg-white col-10 p-4">
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <div className="col-9">
                                <h5>Resumen</h5>
                            </div>
                            <a type="button" className="col-2 text-center buttonNext cardNext" id="buttonNext" href={url} hidden>
                                Siguiente
                            </a>
                        </div>
                        <p>
                            {workerName.nick_name}
                            {' - '}
                            {categoryName.name}
                        </p>
                    </div>
                </div>
                <div className="row d-flex justify-content-center">
                    <h3 className="text-center">Elige un modelo</h3>
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
        </div>
    );
}

export default ModelNumber;
