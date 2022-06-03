import 'bootstrap/dist/css/bootstrap.css';
import './styles/dashboard.css';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import CreateProduct from './CreateProduct';
import ModifyProduct from './ModifyProduct';
import DeleteProduct from './DeleteProduct';
import Sidebar from './Sidebar';

/**
 * Products
 * @param {product} show all Product data
 * @description Shows the product information on the page
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
                    <div>{product.key}</div>
                    <div className="sub-text1">key</div>
                </th>
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
                {ModifyProduct(
                    product.objectId,
                    product.id_category.objectId,
                    product.model,
                    product.aluminium,
                    product.key,
                )}
            </Modal>

            <Modal show={showD} onHide={handleCloseDMod}>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar</Modal.Title>
                </Modal.Header>
                {DeleteProduct(
                    product.objectId,
                    product.id_category.name,
                    product.model,
                    product.aluminium,
                )}
            </Modal>
        </>

    );
}
Products.propTypes = {
    product: PropTypes.string.isRequired,
};

/**
   * Product
   * @description Set of functions to display Product
   * @returns HTML with fetched data
   */
function Product() {
    const [show, setShow] = useState(false);

    const handleCloseCreate = () => setShow(false);
    const handleShowCreate = () => setShow(true);

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
        <div className="container-fluid">
            <Sidebar />
            <div>
                <div className="content d-flex px-4 pt-3 h-100">
                    <div className="col-10 mt-4">
                        <div className="card conteo-card">
                            <div className="card-body">
                                <div>
                                    <div className="row justify-content-between">
                                        <div className="col-3">
                                            Productos
                                        </div>
                                        <button type="button" variant="primary" className="col-2 btn-add" onClick={handleShowCreate}>
                                            Agregar
                                        </button>
                                    </div>
                                    <table className="table table-striped" style={{ marginTop: 20 }}>
                                        <thead>
                                            <tr>
                                                <th>Categoría</th>
                                                <th>Modelo</th>
                                                <th>Aluminio</th>
                                                <th>Key</th>
                                                <th> </th>
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

            <Modal show={show} onHide={handleCloseCreate}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear trabajador</Modal.Title>
                </Modal.Header>
                <CreateProduct />
            </Modal>
        </div>
    );
}

export default Product;
