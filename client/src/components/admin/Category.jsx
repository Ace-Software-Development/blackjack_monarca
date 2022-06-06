import 'bootstrap/dist/css/bootstrap.css';
import './styles/dashboard.css';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import CreateCategory from './CreateCategory';
import ModifyCategory from './ModifyCategory';
import DeleteCategory from './DeleteCategory';
import Sidebar from './Sidebar';
import Environment from '../Environment';

/**
 * Categories
 * @param {category} all categories
 * @description Shows the categories information on the page and buttons for
 * modals to create, modify and delete
 * @returns HTML with fetched data
 */
function Categories({ category }) {
    const session = Cookies.get('sessionToken');
    const admin = Cookies.get('is_admin');
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
    }, [session, admin]);
    if (admin === 'false' || !permission) {
        return ('No tienes permisos');
    }
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
                    <h5>{category.name}</h5>
                    <h6 className="sub-text2">Nombre de categoría</h6>
                </th>
                <th>
                    <button type="button" className="btn" onClick={handleShowMod}>
                        <ion-icon size="large" name="create-outline" />
                    </button>
                </th>
                <th>
                    <button type="button" className="btn" onClick={handleShowDMod}>
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
        const response = await fetch(`${Environment()}/entrega/categorias/get`);
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
                                        <h3 className="col-3">
                                            Categorías
                                        </h3>
                                        <button type="button" variant="primary" className="mr-2 btn-add" onClick={handleShowCreate}>
                                            Agregar
                                        </button>
                                    </div>
                                    <table className="w-100 mt-4" style={{ marginTop: 20 }}>
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
