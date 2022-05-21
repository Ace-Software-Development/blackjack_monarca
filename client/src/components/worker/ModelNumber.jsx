/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NumKey } from './NumKey';
import { CardName } from './NamePart';
import Search from './Search';
import ButtonNext from './ButtonNext';
import Header from './Header';

let selectedModel = '';
let selectedCategory = '';
let selectedWorker = '';
let selectedPart = '';
let nextProcess = '';
let nextBtn;
let url = '';
let process = '';

/**
   * setContext
   * @description Saves selected model in a variable
   * @param name: name of the model
   */
function setContext(id) {
    selectedModel = id;

    url = `/cantidad/${process}/${nextProcess}/${selectedWorker}/${selectedPart}/${selectedCategory}/${selectedModel}`;

    nextBtn = ButtonNext(url);
}

export function CardModel(name, id) {
    return (
        <div className="text-center my-4">
            <a href="#">
                <button type="button" className="cardName btn text-center w-100 py-4" onClick={() => setContext(id)}>
                    {name}
                </button>
            </a>
        </div>
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
            {CardModel(product.model, product.objectId)}
        </div>
    );
}
Products.propTypes = {
    product: PropTypes.string.isRequired,
};

function ModelNumber() {
    const params = useParams();
    process = params.process;
    selectedCategory = params.category;
    selectedWorker = params.worker;
    selectedPart = params.part;
    nextProcess = params.nextProcess;

    const [products, setProducts] = useState([]);

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
        getModels();
    }, []);

    return (
        <div className="row">
            <Header processName={process} />
            <div className="col-7 p-4">
                <div className="row">
                    {Search()}
                </div>
                <div className="row">
                    {productsList()}
                </div>
                <div className="row">
                    <div className="col-6">
                        {CardName('Parka')}
                    </div>
                    <div className="col-6">
                        {CardName('Vaporera')}
                    </div>
                </div>
            </div>
            {NumKey()}
            {nextBtn}
        </div>
    );
}

export default ModelNumber;
