import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect, useState } from 'react';
import './styles/styles.css';
import PropTypes from 'prop-types';

/**
 * Products
 * @param {product} show all product data
 * @description Shows the product information on the page
 * @returns HTML with fetched data
 */
function Products({ product }) {
    const href = `/empacado/modificar/${product.objectId}`;
    return (
        <tr>
            <th>
                <div>{product.id_category.name}</div>
                <div className="sub-text1">Categoría</div>
            </th>
            <th>
                <div>{product.model}</div>
                <div className="sub-text1">Modelo</div>
            </th>
            <th>
                <div>{product.aluminium}</div>
                <div className="sub-text1">Aluminio</div>
            </th>
            <th>
                <div>{product.with_lid}</div>
                <div className="sub-text1">Con tapa</div>
            </th>
            <th>
                <div>{product.withOut_lid}</div>
                <div className="sub-text1">Sin tapa</div>
            </th>
            <th>
                <div>{product.withOut_lid + product.with_lid}</div>
                <div className="sub-text1">Total</div>
            </th>
            <th>
                <a href={href}>
                    <button type="button">
                        <ion-icon size="large" name="create-outline" />
                    </button>
                </a>
            </th>
        </tr>

    );
}
Products.propTypes = {
    product: PropTypes.string.isRequired,
};

/**
   * productInventory
   * @description Set of functions to display Inventario de productos
   * @returns HTML with fetched data
   */
function productInventory() {
    const [products, setProducts] = useState([]);

    async function getAllProducts() {
        const response = await fetch('http://localhost:8888/producto/get');
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.cutomAlert(message);
            return;
        }

        const product = await response.json();
        setProducts(product.data);
    }

    useEffect(() => {
        getAllProducts();
    }, []);

    /**
   * productsList
   * @description Maps all products in the interface
   * @returns Component with name and id of the product
   */
    function productsList() {
        return products.slice(0).reverse().map((product) => (
            <Products product={product} key={product.objectId} />
        ));
    }

    return (
        <div>
            <div className="row d-flex justify-content-center">
                <div className="col-10 mt-4">
                    <div className="card conteo-card">
                        <div className="card-body">
                            <div>
                                <div className="row justify-content-between">
                                    <div className="col-2">
                                        Empacados
                                    </div>
                                    <a href="/empacado/registrar" className="col-2">
                                        <button type="button" className="btn-nxt">
                                            Registrar empacado
                                        </button>
                                    </a>
                                </div>
                                <table className="table table-striped" style={{ marginTop: 20 }}>
                                    <thead>
                                        <tr>
                                            <th>Categoría</th>
                                            <th>Modelo</th>
                                            <th>Aluminio</th>
                                            <th>Con tapa</th>
                                            <th>Sin tapa</th>
                                            <th>Total</th>
                                            <th> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {productsList()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default productInventory;
