import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect, useState } from 'react';
import './styles/conteo.css';
import PropTypes from 'prop-types';

/**
 * IncomeDisk
 * @param {disk} show all Income Disk data
 * @description Shows the income disk information on the page
 * @returns HTML with fetched data
 */
function Products({ product }) {
    const href = `/empacado/modificar/${product.objectId}/${product.id_category.name}`;
    return (
        <tr>
            <th>
                <div>{product.id_category.name}</div>
                <div className="sub-text2">Categoría</div>
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
   * Conteo
   * @description Set of functions to display Conteo
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
   * disksList
   * @description Maps all disks in the interface
   * @returns Component with name and id of the disk
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
                                        <button type="button" variant="primary" className="btn-add">
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
