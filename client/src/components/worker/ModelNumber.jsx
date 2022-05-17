/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { CardName } from './NamePart';
import { NumKey } from './NumKey';
import Search from './Search';

/**
 * Products
 * @description React component to display each model
 * @param product: Json with the attributes objectId and model
 * @returns Div component
 */
function Products({ product }) {
    return (
        <div className="col-4" value={product.objectId}>
            {CardName(product.model)}
        </div>
    );
}
Products.propTypes = {
    product: PropTypes.string.isRequired,
};

function ModelNumber() {
    const [products, setProducts] = useState([]);

    /**
     * getModels
     * @description Fetches existing products from the database through the server
     */
    async function getModels() {
        const response = await fetch('http://localhost:8888/entrega/modelos/get');
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
    });

    return (
        <div className="row">
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
        </div>
    );
}

export default ModelNumber;
