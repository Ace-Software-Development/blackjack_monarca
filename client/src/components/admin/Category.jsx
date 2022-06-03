import 'bootstrap/dist/css/bootstrap.css';
import './styles/dashboard.css';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import CreateCategory from './CreateCategory';
import ModifyCategory from './ModifyCategory';
import DeleteCategory from './DeleteCategory';
import Sidebar from './Sidebar';

/**
 * Categories
 * @param {category} all categories
 * @description Shows the categories information on the page and buttons for
 * modals to create, modify and delete
 * @returns HTML with fetched data
 */
function Categories({ category }) {
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
                    <div>{category.name}</div>
                    <div className="sub-text2">Nombre de usuario</div>
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
                {ModifyCategory(category.objectId, category.name)}
            </Modal>

            <Modal show={showD} onHide={handleCloseDMod}>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar</Modal.Title>
                </Modal.Header>
                {DeleteCategory(category.objectId, category.name)}
            </Modal>
        </>

    );
}
Categories.propTypes = {
    category: PropTypes.string.isRequired,
};

/**
   * Category
   * @description Set of functions to display Categorias
   * @returns HTML with fetched data
   */
function Category() {
    const [categories, setCategories] = useState([]);
    const [show, setShow] = useState(false);

    const handleCloseCreate = () => setShow(false);
    const handleShowCreate = () => setShow(true);

    async function getCategories() {
        const response = await fetch('http://localhost:8888/entrega/categorias/get');
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const category = await response.json();
        setCategories(category.data);
    }

    useEffect(() => {
        getCategories();
    }, []);

    /**
   * categoriesList
   * @description Maps all categories in the interface
   * @returns Component with name and id of the category
   */
    function categoriesList() {
        return categories.slice(0).reverse().map((category) => (
            <Categories category={category} key={category.name} />
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
                                            Categorías
                                        </div>
                                        <button type="button" variant="primary" className="col-2 btn-add" onClick={handleShowCreate}>
                                            Agregar
                                        </button>
                                    </div>
                                    <table className="table table-striped" style={{ marginTop: 20 }}>
                                        <thead>
                                            <tr>
                                                <th>Nombre</th>
                                                <th> </th>
                                                <th> </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {categoriesList()}
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
                <CreateCategory />
            </Modal>
        </div>
    );
}

export default Category;
