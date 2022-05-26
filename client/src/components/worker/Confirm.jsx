/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import Header from './Header';

let selectedRegister = '';
let prevProcess = '';
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

export function CardPart(name, id, date) {
    return (
        <div className="text-center my-4">
            <a href="#">
                <button type="button" className="cardName btn text-center w-100 py-4 text-center my-4 card-shadow" onClick={() => setContext(id)}>
                    <div>
                        {name}
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
        <div className="col-3 px-5" value={part.objectId}>{CardPart(part.name, part.objectId, part.createdAt)}</div>
    );
}
Parts.propTypes = {
    part: PropTypes.string.isRequired,
};

function Confirm() {
    const params = useParams();
    process = params.process;
    prevProcess = params.prevProcess;

    const [parts, setParts] = useState([]);

    /**
     * getParts
     * @description Fetches existing parts from the database through the server
     */
    async function getParts() {
        const response = await fetch('http://localhost:8888/confirmar/get');
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
        <div className="row w-100 justify-content-center align-self-stretch">
            <Header processName={process} />
            <h3 className="text-center">{prevProcess}</h3>
            {partsList()}
        </div>
    );
}
export default Confirm;
