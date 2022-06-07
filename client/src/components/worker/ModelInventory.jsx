/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useParams, useNavigate } from 'react-router-dom';
import ButtonNext from './ButtonNext';
import Header from './Header';
import Environment from '../Environment';

let selectedModel = '';
let selectedCategory = '';
let nextBtn = '';
let url = '';

/**
     * setContext
     * @description Saves selected model in a variable
     * @param name: name of the model
     */
function setContext(id) {
    const button = document.getElementById('buttonNext');
    if (id) {
        selectedModel = id;
        url = `/empacado/registrar/${selectedCategory}/${selectedModel}`;
        nextBtn = ButtonNext(url);
        button.hidden = false;
    } else {
        url = `/empacado/registrar/${selectedCategory}/${selectedModel}`;
        if (nextBtn) {
            button.href = url;
        }
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

function ModelInventory() {
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
    const params = useParams();
    const navigate = useNavigate();

    selectedCategory = params.category;

    const [products, setProducts] = useState([]);
    const categoriesOption = [];

    const [categories, setCategories] = useState([]);

    const [categoryName, setCategory] = useState(0);

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
        getCategory();
        getCategories();
        getModels();
    }, [nextBtn]);

    categoriesList();

    /**
   * onChangeCategory
   * @description Change the url with a new id category
   * @param category: the new category
   */
    function onChangeCategory(category) {
        setContext('');
        navigate(`/empacado/registrar/${category.value}`);
        window.location.reload();
    }

    return (
        <div className="row d-flex justify-content-center">
            <Header processName="Conteo" />
            <div className="card-shadow bg-white col-10 p-4">
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <div className="col-9">
                                <h5>Resumen</h5>
                            </div>
                            <div className="col-9">
                                {ButtonNext}
                            </div>
                            <p>
                                {categoryName.name}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row d-flex justify-content-center">
                    <h3 className="text-center">Elige un modelo</h3>
                    {productsList()}
                </div>
                <div className="row">
                    <div className="col-6">
                        <Select value={{ label: categoryName.name, value: categoryName.objectId }} options={categoriesOption} className="form-control form-select-lg" id="id_category" name="id_category" onChange={(e) => onChangeCategory(e)} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModelInventory;
