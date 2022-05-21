/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
// eslint-disable-next-line no-trailing-spaces
import {
    useEffect, useState, React,
} from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import ButtonNext from './ButtonNext';
import './styles/styles.css';

let selectedWorker = '';
let selectedPart = '';
let nextBtn;
let url = '';
let process = '';
let nextProcess = '';

/**
   * setContext
   * @description Saves selected worker and part in variables
   * @param id: id of the worker or part
   * @param type: specifies if the id is a worker or part
   */
function setContext(id, type) {
    if (type === 'p') {
        selectedPart = id;
    } else {
        selectedWorker = id;
    }

    url = `/categoria/${process}/${nextProcess}/${selectedWorker}/${selectedPart}`;

    if (selectedWorker && selectedPart) {
        nextBtn = ButtonNext(url);
    }
}

export function CardName(name, id, type) {
    return (
        <div className="text-center my-4">
            <a href="#">
                <button type="button" id={id} className="cardName btn text-center w-100 py-4" onClick={() => setContext(id, type)}>
                    {name}
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
        <div type="button" value={part.objectId}>
            {CardName(part.name, part.objectId, 'p')}
        </div>
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
        <div type="button" value={worker.objectId}>
            {CardName(worker.nick_name, worker.objectId, 'w')}
        </div>
    );
}
Workers.propTypes = {
    worker: PropTypes.string.isRequired,
};

function NamePart() {
    const params = useParams();
    process = params.process;
    nextProcess = params.nextProcess;
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
        const response = await fetch(`http://localhost:8888/entrega/trabajadores/get/${process}`);
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

    return (
        <div>
            <Header processName={process} />
            <div className="d-flex row h-100 w-100">
                <div className="col-6 px-5 justify-content-center d-flex flex-column">
                    {workersList()}

                </div>
                <div className="col-6 px-5 d-flex justify-content-center flex-column">
                    {partsList()}
                    {nextBtn}
                </div>
            </div>
        </div>
    );
}
export default NamePart;
