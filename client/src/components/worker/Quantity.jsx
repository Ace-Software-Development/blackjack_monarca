/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { NumKey } from './NumKey';
import QuantityInput from './QuantityInput';

/**
 * Categories
 * @description React component to display each category in a card
 * @param category: Json with the attributes objectId and name
 * @returns Div component
 */
function Categories({ category }) {
    return (
        <option value={category.objectId}>
            {category.name}
        </option>
    );
}
Categories.propTypes = {
    category: PropTypes.string.isRequired,
};
/**
   * Workers
   * @description React component to display each worker in a card
   * @param worker: Json with the attributes objectId and nick_name
   * @returns Div component
   */
function Workers({ worker }) {
    return (
        <option value={worker.objectId}>
            {worker.nick_name}
        </option>
    );
}
Workers.propTypes = {
    worker: PropTypes.string.isRequired,
};

function Quantity() {
    const [workers, setWorkers] = useState([]);
    const [categories, setCategories] = useState([]);

    /**
     * getWorkers
     * @description Fetches existing workers from the database through the server
     */
    async function getWorkers() {
        const response = await fetch('http://localhost:8888/entrega/trabajadores/get');
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }

        const worker = await response.json();
        setWorkers(worker.data);
    }

    /**
     * getCategories
     * @description Fetches existing categories from the database through the server
     */
    async function getCategories() {
        const response = await fetch('http://localhost:8888/entrega/categorias/get');
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }

        const category = await response.json();
        setCategories(category.data);
    }

    useEffect(() => {
        getWorkers();
        getCategories();
    });

    /**
   * workersList
   * @description Maps all workers in the interface
   * @returns Component with name and id of the worker
   */
    function workersList() {
        return workers.map((worker) => (
            <Workers worker={worker} key={worker.objectID} />
        ));
    }

    /**
   * categoriesList
   * @description Maps all categories in the interface
   * @returns Component with name and id of the category
   */
    function categoriesList() {
        return categories.map((category) => (
            <Categories category={category} key={category.objectID} />
        ));
    }

    return (
        <div className="row">
            <div className="col-7 p-4">
                <div className="row">
                    <div className="col">
                        <div className="card-shadow bg-white">
                            <div className="row">
                                <h5>Resumen</h5>
                                <p>Parka - Base - Vaporera 70</p>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div>
                                        <ul className="nav nav-pills nav-fill mb-3 tab-select" id="pills-tab" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Completados</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Segunda</button>
                                            </li>
                                        </ul>
                                        <div className="tab-content" id="pills-tabContent">
                                            <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                                {QuantityInput()}
                                            </div>
                                            <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                                {QuantityInput()}
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-monarca">Confirmar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 mt-3">
                        <select className="form-control form-select form-select-lg" id="id_worker" name="id_worker">
                            {workersList()}
                        </select>
                    </div>
                    <div className="col-6 mt-3">
                        <select className="form-control form-select form-select-lg" id="id_category" name="id_category">
                            {categoriesList()}
                        </select>
                    </div>
                </div>
            </div>
            {NumKey()}
        </div>
    );
}

export default Quantity;
