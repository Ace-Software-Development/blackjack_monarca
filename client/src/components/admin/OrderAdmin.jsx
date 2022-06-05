// CU 14 Consultar pedido
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import './styles/dashboard.css';
import '../worker/styles/conteo.css';
import '../worker/styles/styles.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import Sidebar from './Sidebar';
import Environment from '../Environment';

/**
 * Required
 * @description Consult how many are needed to complete the order
 * @param req parts required
 * @param inv parts in inventory
 */
function Required(req, inv) {
    const dif = req - inv;
    if (dif <= 0) {
        return (
            <th>
                <div className="green-text">0</div>
                <div className="sub-text1">piezas</div>
            </th>
        );
    }
    return (
        <th>
            <div className="red-text">{dif}</div>
            <div className="sub-text1">piezas</div>
        </th>
    );
}

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
            <th>
                <div>{`${product.id_product.with_lid}`}</div>
                <div className="sub-text1">piezas</div>
            </th>
            {Required(product.number, product.id_product.with_lid)}
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
function OrderAdmin() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const { orderId } = useParams();
    const [order, setOrder] = useState('');
    const [buyerName, setBuyerName] = useState('');
    const [buyerCity, setBuyerCity] = useState('');

    async function getAllProducts() {
        const response = await fetch(`http://localhost:8888/productOrder/get/${orderId}`);
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
        const response = await fetch(`http://localhost:8888/empacado/ordenes/getOne/${orderId}`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.cutomAlert(message);
            return;
        }

        const data = await response.json();
        setOrder(data.data);
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
        const response = await fetch(`http://localhost:8888/login/getPermission/${session}`);
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

    const [confirmForm, setConfirmForm] = useState({
        order: '',
        name: '',
        id_buyer: '',
        id_Delivered: '',

    });

    /**
   * ConfirmOrder
   * @description Modifies order in inventory through a fetch to the server
   * @param e: Context
   */
    async function ConfirmOrder(e) {
        e.preventDefault();

        const orderInfo = { ...confirmForm };

        await fetch(`${Environment()}/productOrder/confirmar/post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderInfo),
        });

        setConfirmForm({
            order: '',
            name: '',
            id_buyer: '',
            id_Delivered: '',
        });

        navigate('/dashboard/Administrador');
    }

    /**
   * updateForm
   * @description updates data of a form
   * @param value: new values of the form
   * @returns an updated form
   */
    function updateForm() {
        return setConfirmForm({
            order: order.objectId,
            name: order.name,
            id_buyer: order.id_buyer.objectId,
            is_Delivered: true,
        });
    }
    return (
        <div className="container-fluid">
            <Sidebar />
            <div className="content d-flex px-4 pt-3 h-100">
                <h1>{order.name}</h1>
                <div className="row">
                    <div className="col-10 mt-1 card conteo-card">
                        <div className="card-body">
                            <p>{`${buyerName} - ${buyerCity}`}</p>
                            <table className="table table-striped" style={{ marginTop: 20 }}>
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                        <th>Inventario</th>
                                        <th>Faltantes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ProductList()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <form onSubmit={ConfirmOrder} className="row mt-5">
                        <div className="col d-flex justify-content-center form group">
                            <button placeholder="Cantidad" className="btn-order" type="submit" onClick={() => updateForm()}>Completar pedido</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default OrderAdmin;
