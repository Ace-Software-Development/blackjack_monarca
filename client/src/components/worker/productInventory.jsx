import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import './styles/styles.css';
import PropTypes from 'prop-types';
import Header from './Header';
import Environment from '../Environment';

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
                <div className="sub-text1">Completo</div>
            </th>
            <th>
                <div>{product.withOut_lid}</div>
                <div className="sub-text1">Incompleto</div>
            </th>
            <th>
                <div>{product.withOut_lid + product.with_lid}</div>
                <div className="sub-text1">Total</div>
            </th>
            <th>
                <a href={href}>
                    <button type="button" className="btn">
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
    const navigate = useNavigate();
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
    const [products, setProducts] = useState([]);

    async function getAllProducts() {
        const response = await fetch(`${Environment()}/producto/get`);
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
            <Header processName="Inventario empacado" />
            <div className="row d-flex justify-content-center">
                <div className="col-10 mt-4">
                    <div className="card conteo-card">
                        <div className="card-body">
                            <div>
                                <div className="row justify-content-between">
                                    <button type="button" onClick={() => navigate(-1)} className="col-1 btnBack btn">
                                        <ion-icon size="large" name="arrow-back-outline" />
                                    </button>
                                    <div className="col-2" />
                                    <a href="/empacado/registrar" className="col-2">
                                        <button type="button" className="btn-nxt">
                                            Empacar producto
                                        </button>
                                    </a>
                                </div>
                                <table className="w-100 my-4" style={{ marginTop: 20 }}>
                                    <thead>
                                        <tr>
                                            <th>Categoría</th>
                                            <th>Modelo</th>
                                            <th>Aluminio</th>
                                            <th>Completo</th>
                                            <th>Incompleto</th>
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
