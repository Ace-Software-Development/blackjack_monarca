// CU 7 Confirmar piezas recibidas en el proceso
/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import Header from './Header';
import Environment from '../Environment';

let selectedRegister = '';
let process = '';

/**
   * setContext
   * @description Saves selected part in a variable
   * @param id: id of the part
   */
function setContext(id) {
    selectedRegister = id;
    const navigate = useNavigate();
    navigate(`/confirmar/${process}/${selectedRegister}`);
}

export function CardPart(part, category, model, aluminium, number, date, id) {
    return (
        <div className="text-center my-4">
            <a href={`/confirmar/${id}`}>
                <button type="button" className="cardName btn text-center w-100 py-4 text-center my-4 card-shadow" onClick={() => setContext(id)}>
                    <div>
                        <div>
                            <h4>{`${part} ${category}`}</h4>
                        </div>
                        <h4>{`${model} ${aluminium}`}</h4>
                    </div>
                    <div>
                        {number}
                    </div>
                    <h5>
                        {date.slice(0, 10)}
                    </h5>
                </button>
            </a>
        </div>
    );
}

/**
 * Parts
 * @description React component to display each part in a card
 * @param part: Json with the attributes objectId and name
 * @returns Div component
 */
function Parts({ part }) {
    return (
        <div className="col-3 px-5" value={part.objectId}>{CardPart(part.id_part.name, part.id_product.id_category.name, part.id_product.model, part.id_product.aluminium, part.number, part.createdAt, part.objectId)}</div>
    );
}
Parts.propTypes = {
    part: PropTypes.string.isRequired,
};

function Confirm() {
    const params = useParams();
    process = params.process;

    const [parts, setParts] = useState([]);

    /**
     * getParts
     * @description Fetches existing parts from the database through the server
     */
    async function getParts() {
        const response = await fetch(`${Environment()}/confirmar/get/${process}`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const part = await response.json();
        setParts(part.data);
    }
    useEffect(() => {
        getParts();
    }, []);

    /**
   * partsList
   * @description Maps all parts in the interface
   * @returns Component with name and id of the part
   */
    function partsList() {
        return parts.map((part) => (
            <Parts part={part} key={part.objectId} />
        ));
    }

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
    return (
        <div className="row w-100 justify-content-center align-self-stretch">
            <Header processName={process} />
            {partsList()}
        </div>
    );
}
export default Confirm;
