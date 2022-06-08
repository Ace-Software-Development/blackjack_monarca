// CU 7 Confirmar piezas recibidas en el proceso
/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { Col, Container, Row } from 'react-bootstrap';
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
        <Container className="text-center">
            <a href={`/confirmar/${id}`}>
                <button type="button" className="cardName btn text-center w-100 py-4 text-center my-3 card-shadow" onClick={() => setContext(id)}>
                    <h4>{`${category} ${model}`}</h4>
                    <h5>{`${part} ${aluminium}`}</h5>
                    <div className="orange-text">
                        {number}
                    </div>
                    <h5>{date.slice(0, 10)}</h5>
                </button>
            </a>
        </Container>
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
        <Col xs={12} s={12} m={6} lg={4} className="px-5" value={part.objectId}>{CardPart(part.id_part.name, part.id_product.id_category.name, part.id_product.model, part.id_product.aluminium, part.number, part.createdAt, part.objectId)}</Col>
    );
}
Parts.propTypes = {
    part: PropTypes.string.isRequired,
};

function Confirm() {
    const session = Cookies.get('sessionToken');
    const [permission, setPermission] = useState([]);
    let processName = process;

    if (process === 'Empaquetado') {
        processName = 'Empacado';
    }

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

    return (
        <Row className="w-100 justify-content-center align-self-stretch">
            <Header processName={processName} />
            {partsList()}
        </Row>
    );
}
export default Confirm;
