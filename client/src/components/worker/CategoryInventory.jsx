/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import ButtonNext from './ButtonNext';
import Header from './Header';

let selectedCategory = '';
let nextBtn = '';
let url = '';

/**
   * setContext
   * @description Saves selected category in a variable
   * @param id: id of the category
   */
function setContext(id) {
    console.log(id);
    selectedCategory = id;

    url = `/empacado/registrar/${selectedCategory}`;

    nextBtn = ButtonNext(url);

    console.log(nextBtn);
}

export function CardCategory(name, id) {
    return (
        <div className="text-center my-4">
            <a href="#">
                <button type="button" className="cardName btn text-center w-100 py-4" onClick={() => setContext(id)}>
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
    const [categories, setCategories] = useState([]);

    /**
     * getCategories
     * @description Fetches existing categories from the database through the server
     */
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
            <h3 className="text-center">Elige una categoría</h3>
            {categoryList()}
            {nextBtn}
        </div>
    );
}
export default CategoryInventory;
