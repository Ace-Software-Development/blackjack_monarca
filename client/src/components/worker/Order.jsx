// CU 14 Consultar pedido
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import '../admin/styles/dashboard.css';
import './styles/conteo.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Environment from '../Environment';
/**
 * Products
 * @param product: product to be desplayed
 * @description Shows the products of an order on the page
 * @returns HTML with fetched data
 */
function Products({ product }) {
    return (
        <tr>
            <th>
                <div>{`${product.id_product.id_category.name} ${product.id_product.model} ${product.id_product.aluminium}`}</div>
                <div className="sub-text2">Nombre</div>
            </th>
            <th>
                <div>{product.number}</div>
                <div className="sub-text1">piezas</div>
            </th>
        </tr>
    );
}
Products.propTypes = {
    product: PropTypes.string.isRequired,
};

/**
   * Order
   * @description Set of functions to display Order
   * @returns HTML with fetched data
   */
function Order() {
    const [products, setProducts] = useState([]);
    const { orderId } = useParams();
    const [order, setOrder] = useState('');
    const [buyerName, setBuyerName] = useState('');
    const [buyerCity, setBuyerCity] = useState('');

    async function getAllProducts() {
        const response = await fetch(`${Environment()}/productOrder/get/${orderId}`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.cutomAlert(message);
            return;
        }

        const data = await response.json();
        setProducts(data.data);
    }

    /**
   * getOrder
   * @description Fetches all info of selected order
   * @returns Component with name and id of the order
   */
    async function getOrder() {
        const response = await fetch(`${Environment()}/empacado/ordenes/getOne/${orderId}`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.cutomAlert(message);
            return;
        }

        const data = await response.json();
        setOrder(data.data.name);
        setBuyerName(data.data.id_buyer.name);
        setBuyerCity(data.data.id_buyer.city);
    }

    /**
   * productList
   * @description Maps all products in the interface
   * @returns Component with name and id of the product
   */
    function ProductList() {
        return products.map((product) => (
            <Products product={product} key={product.objectId} />
        ));
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
        getOrder();
        getAllProducts();
    }, []);

    if (!permission) {
        return ('No tienes permisos');
    }
    return (
        <div>
            <Header processName={order} />
            <div className="row d-flex justify-content-center">
                <div className="col-10 mt-4">
                    <div className="card conteo-card">
                        <div className="card-body">
                            <div>
                                <p>{`${buyerName} - ${buyerCity}`}</p>
                                <table className="w-100 mt-3" style={{ marginTop: 20 }}>
                                    <thead>
                                        <tr>
                                            <th>Producto</th>
                                            <th>Cantidad</th>
                                            <th> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ProductList()}
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

export default Order;
