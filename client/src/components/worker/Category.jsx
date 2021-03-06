// CU 4 Registrar entrega de piezas a otro proceso
// CU 5 Registrar producto dañado
/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Container } from 'react-bootstrap';
import Header from './Header';
import Environment from '../Environment';

let selectedCategory = '';
let selectedWorker = '';
let selectedPart = '';
let nextProcess = '';
let url = '';
let process = '';

/**
   * setContext
   * @description Saves selected category in a variable
   * @param id: id of the category
   */
function setContext(id) {
    selectedCategory = id;

    url = `/modelo/${process}/${nextProcess}/${selectedWorker}/${selectedPart}/${selectedCategory}`;

    const button = document.getElementById('buttonNext');
    button.hidden = false;
}

export function CardCategory(name, id) {
    return (
        <div className="text-center my-2">
            <a href="#">
                <button type="button" className="cardName card-category btn text-center w-100 py-3" onClick={() => setContext(id)}>
                    {name}
                </button>
            </a>
        </div>
    );
}

/**
 * Categories
 * @description React component to display each category in a card
 * @param part: Json with the attributes objectId and name
 * @returns Div component
 */
function Categories({ category }) {
    return (
        <div className="col-4 px-3" value={category.objectId}>{CardCategory(category.name, category.objectId)}</div>
    );
}
Categories.propTypes = {
    category: PropTypes.string.isRequired,
};

function Category() {
    const navigate = useNavigate();
    const params = useParams();
    process = params.process;
    selectedWorker = params.worker;
    selectedPart = params.part;
    nextProcess = params.nextProcess;

    const [categories, setCategories] = useState([]);

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

    /**
     * getCategories
     * @description Fetches existing categories from the database through the server
     */
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
   * categoryList
   * @description Maps all categories in the interface
   * @returns Component with name and id of the category
   */
    function categoryList() {
        return categories.map((category) => (
            <Categories category={category} key={category.objectId} />
        ));
    }

    return (
        <Container className="container-fluid d-flex flex-column">
            <Row>
                <Header processName={process} />
            </Row>
            <h3 className="text-center">Elige una categoría</h3>
            <Row className="flex-grow-1 pt-2">
                <div className="d-flex flex-wrap">
                    {categoryList()}
                </div>
            </Row>
            <div className="d-flex justify-content-center mb-4">
                <button className="btn buttonNext cardNext w-25 card-shadow" id="buttonNext" type="button" onClick={() => navigate(url)} hidden>
                    Siguiente
                </button>
            </div>
        </Container>
    );
}
export default Category;
