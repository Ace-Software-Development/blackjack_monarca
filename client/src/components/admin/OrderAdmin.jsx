// CU 14 Consultar pedido
import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import './styles/dashboard.css';
import '../worker/styles/conteo.css';
import '../worker/styles/styles.css';
import { Modal } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CreateProductOrder from './CreateProductOrder';
import ModifyProductInOrder from './ModifyProductInOrder';
import DeleteProductInOrder from './DeleteProductInOrder';
import Sidebar from './Sidebar';
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
    const [show, setShow] = useState(false);
    const handleCloseMod = () => setShow(false);
    const handleShowMod = () => setShow(true);

    const [showD, setShowD] = useState(false);
    const handleCloseDMod = () => setShowD(false);
    const handleShowDMod = () => setShowD(true);
    return (
        <>
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
                <th>
                    <button type="button" onClick={handleShowMod}>
                        <ion-icon size="large" name="create-outline" />
                    </button>
                </th>
                <th>
                    <button type="button" onClick={handleShowDMod}>
                        <ion-icon size="large" name="trash-outline" />
                    </button>
                </th>
            </tr>

            <Modal show={show} onHide={handleCloseMod}>
                <Modal.Header closeButton>
                    <Modal.Title>Modificar</Modal.Title>
                </Modal.Header>
                {ModifyProductInOrder(
                    product.objectId,
                    product.id_product.id_category.name,
                    product.id_product.model,
                    product.id_product.aluminium,
                    product.number,
                )}
            </Modal>

            <Modal show={showD} onHide={handleCloseDMod}>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar</Modal.Title>
                </Modal.Header>
                {DeleteProductInOrder(
                    product.objectId,
                    product.id_product.id_category.name,
                    product.id_product.model,
                    product.id_product.aluminium,
                    product.number,
                )}
            </Modal>
        </>

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
    const [products, setProducts] = useState([]);
    const { orderId } = useParams();
    const [order, setOrder] = useState('');
    const [buyerName, setBuyerName] = useState('');
    const [buyerCity, setBuyerCity] = useState('');

    const [show, setShow] = useState(false);

    const handleCloseCreate = () => setShow(false);
    const handleShowCreate = () => setShow(true);

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
    return (
        <div className="container-fluid">
            <Sidebar />
            <div className="content d-flex px-4 pt-3 h-100">
                <h1>{order}</h1>
                <div className="row">
                    <div className="col-10 mt-1 card conteo-card">
                        <div className="justify-content-between">
                            <div className="card-body">
                                <div className="row justify-content-between">
                                    <div className="col-3">
                                        <p>{`${buyerName} - ${buyerCity}`}</p>
                                    </div>
                                    <div className="col-3">
                                        <button type="button" variant="primary" className="btn-add" onClick={handleShowCreate}>
                                            Agregar
                                        </button>
                                    </div>
                                </div>
                                <table className="table table-striped" style={{ marginTop: 20 }}>
                                    <thead>
                                        <tr>
                                            <th>Producto</th>
                                            <th>Cantidad</th>
                                            <th>Inventario</th>
                                            <th>Faltantes</th>
                                            <th> </th>
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
            <Modal show={show} onHide={handleCloseCreate}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar producto</Modal.Title>
                </Modal.Header>
                <CreateProductOrder />
            </Modal>
        </div>
    );
}

export default OrderAdmin;
