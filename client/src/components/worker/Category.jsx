/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ButtonNext from './ButtonNext';
import Header from './Header';

let selectedCategory = '';
let selectedWorker = '';
let selectedPart = '';
let nextProcess = '';
let nextBtn;
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

    nextBtn = ButtonNext(url);
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

function Category() {
    const params = useParams();
    process = params.process;
    selectedWorker = params.worker;
    selectedPart = params.part;
    nextProcess = params.nextProcess;

    const [categories, setCategories] = useState([]);

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
            <Header processName={process} />
            {categoryList()}
            {nextBtn}
        </div>
    );
}
export default Category;
