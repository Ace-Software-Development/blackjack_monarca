// CU 4
// MT https://docs.google.com/spreadsheets/d/1geuVnd1ByaFLBXFXNAlN5PL-K0QVR2rq/edit?usp=sharing&ouid=103960253138118107632&rtpof=true&sd=true

/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Header from './Header';
import Environment from '../Environment';

export function CardCategory(name, id) {
    const url = `/empacado/registrar/${id}`;
    return (
        <div className="text-center my-4">
            <a href={url}>
                <button type="button" className="cardName btn text-center w-100 py-4">
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
        <div className="col-4 px-5" value={category.objectId}>{CardCategory(category.name, category.objectId)}</div>
    );
}
Categories.propTypes = {
    category: PropTypes.string.isRequired,
};

function CategoryInventory() {
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
    const [categories, setCategories] = useState([]);

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
        <div className="row w-100 justify-content-center align-self-stretch">
            <Header processName="Empacado" />
            <h3 className="text-center">Elige una categor??a</h3>
            {categoryList()}
        </div>
    );
}
export default CategoryInventory;
