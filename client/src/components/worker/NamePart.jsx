/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import ButtonNext from './ButtonNext';

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

/**
   * Parts
   * @description React component to display each part in a card
   * @param part: Json with the attributes objectId and name
   * @returns Div component
   */
function Parts({ part }) {
    return (
        <div value={part.objectId}>{CardName(part.name)}</div>
    );
}
Parts.propTypes = {
    part: PropTypes.string.isRequired,
};

/**
   * Workers
   * @description React component to display each worker in a card
   * @param part: Json with the attributes objectId and nick_name
   * @returns Div component
   */
function Workers({ worker }) {
    return (
        <div value={worker.objectId}>{CardName(worker.nick_name)}</div>
    );
}
Workers.propTypes = {
    worker: PropTypes.string.isRequired,
};

function NamePart() {
    const [parts, setParts] = useState([]);
    const [workers, setWorkers] = useState([]);

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

    /**
     * getWorkers
     * @description Fetches existing workers from the database through the server
     */
    async function getWorkers() {
        const response = await fetch('http://localhost:8888/entrega/trabajadores/get');
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }

        const worker = await response.json();
        setWorkers(worker.data);
    }

    useEffect(() => {
        getParts();
        getWorkers();
    }, []);

    /**
   * partsList
   * @description Maps all parts in the interface
   * @returns Component with name and id of the parts
   */
    function partsList() {
        return parts.map((part) => (
            <Parts part={part} key={part.objectId} />
        ));
    }

    /**
   * workerList
   * @description Maps all workers in the interface
   * @returns Component with name and id of the worker
   */
    function workersList() {
        return workers.map((worker) => (
            <Workers worker={worker} key={worker.objectId} />
        ));
    }

    const { process } = useParams();

    return (
        <div>
            <Header processName={process} />
            <div className="d-flex row h-100 w-100">
                <div className="col-6 bg-white px-5 justify-content-center d-flex flex-column">
                    {workersList()}

                </div>
                <div className="col-6 px-5 d-flex justify-content-center flex-column">
                    {partsList()}
                    <ButtonNext />
                </div>
            </div>
        </div>
    );
}
export default NamePart;
