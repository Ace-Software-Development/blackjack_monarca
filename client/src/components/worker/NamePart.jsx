/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export function CardName(name) {
    return (
        <div className="text-center my-4">
            <a href="#">
                <button type="button" className="cardName btn text-center w-100 py-4 bg-white">
                    {name}
                </button>
            </a>
        </div>
    );
}

export function CardPart(name) {
    return (
        <div className="card text-center">
            <div className="card-body text-center w-100 py-4">
                <a href="#">
                    <h2 className="workerName">{name}</h2>
                </a>
            </div>
        </div>
    );
}

function Parts({ part }) {
    return (
        <div value={part.objectID}>{CardName(part.name)}</div>
    );
}
Parts.propTypes = {
    part: PropTypes.string.isRequired,
};

function NamePart() {
    const [parts, setParts] = useState([]);

    useEffect(() => {
        /**
         * getParts
         * @description Fetches existing parts from the database through the server
         */
        async function getParts() {
            const response = await fetch('http://localhost:8888/entrega/partes/get');
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const part = await response.json();
            setParts(part.data);
        }

        getParts();
    });

    function partsList() {
        return parts.map((part) => (
            <Parts part={part} key={part.objectID} />
        ));
    }

    return (
        <div className="d-flex row h-100 w-100">
            <div className="col-6 bg-white px-5 justify-content-center d-flex flex-column">
                {CardName('Chato')}
                {CardName('Parka')}
                {CardName('Conejo')}
                {CardName('Pelos')}
            </div>
            <div className="col-6 px-5 d-flex justify-content-center flex-column">
                {partsList()}
            </div>
        </div>
    );
}
export default NamePart;
