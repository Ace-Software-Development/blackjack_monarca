/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: true}}] */
// CU 29 30 31 33
// MT https://docs.google.com/spreadsheets/d/1geuVnd1ByaFLBXFXNAlN5PL-K0QVR2rq/edit?usp=sharing&ouid=103960253138118107632&rtpof=true&sd=true

import 'bootstrap/dist/css/bootstrap.css';
import './styles/dashboard.css';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { useTable, ReactTable, useSortBy } from 'react-table';
import CreateWorker from './CreateWorker';
import ModifyWorker from './ModifyWorker';
import DeleteWorker from './DeleteWorker';
import Sidebar from './Sidebar';
import Environment from '../Environment';

let countHu = 0;
/**
 * Workers
 * @param {worker} show all Worker data
 * @description Shows the worker information on the page
 * @returns HTML with fetched data
 */
/*
function Workers({ worker }) {
    const session = Cookies.get('sessionToken');
    const admin = Cookies.get('is_admin');
    const [permission, setPermission] = useState([]);

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
    }, [session, admin]);
    if (admin === 'false' || !permission) {
        return ('No tienes permisos');
    }
    const [show, setShow] = useState(false);
    const handleCloseMod = () => setShow(false);
    const handleShowMod = () => setShow(true);

    const [showD, setShowD] = useState(false);
    const handleCloseDMod = () => setShowD(false);
    const handleShowDMod = () => setShowD(true);

    return (
        <>
            <tr>
                <th>
                    <h5>{worker.name}</h5>
                    <h6 className="sub-text2">Nombre de usuario</h6>
                </th>
                <th>
                    <h5>{worker.nick_name}</h5>
                    <h6 className="sub-text1">Apodo</h6>
                </th>
                <th>
                    <h5>{worker.id_process}</h5>
                    <h6 className="sub-text1">Proceso</h6>
                </th>
                <th>
                    <button type="button" className="btn" onClick={handleShowMod}>
                        <ion-icon size="large" name="create-outline" />
                    </button>
                </th>
                <th>
                    <button type="button" className="btn" onClick={handleShowDMod}>
                        <ion-icon size="large" name="trash-outline" />
                    </button>
                </th>
            </tr>

            <Modal show={show} onHide={handleCloseMod}>
                <Modal.Header closeButton>
                    <Modal.Title>Modificar</Modal.Title>
                </Modal.Header>
                {ModifyWorker(worker.objectId, worker.name, worker.nick_name, worker.id_process)}
            </Modal>

            <Modal show={showD} onHide={handleCloseDMod}>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar</Modal.Title>
                </Modal.Header>
                {DeleteWorker(worker.objectId, worker.name, worker.nick_name)}
            </Modal>
        </>

    );
}

Workers.propTypes = {
    worker: PropTypes.string.isRequired,
};
*/
/*
function workerDeleter(workerObj){
    const [showD, setShowD] = useState(false);
    const handleCloseDMod = () => setShowD(false);
    const handleShowDMod = () => setShowD(true);

    return (
        <th>
            <button type="button" className="btn" onClick={handleShowDMod}>
                <ion-icon size="large" name="trash-outline" />
            </button>

            <Modal show={showD} onHide={handleCloseDMod}>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar</Modal.Title>
                </Modal.Header>
                {DeleteWorker(
                    workerObj.objectId,
                    workerObj.name,
                    workerObj.nick_name,
                    )}
            </Modal>
        </th>
    );
}

function wokerModifior(workerObj){
    const [show, setShow] = useState(false);
    const handleCloseMod = () => setShow(false);
    const handleShowMod = () => setShow(true);

    return (
        <th>
            <button type="button" className="btn" onClick={handleShowMod}>
                <ion-icon size="large" name="create-outline" />
            </button>

            <Modal show={show} onHide={handleCloseMod}>
                <Modal.Header closeButton>
                    <Modal.Title>Modificar</Modal.Title>
                </Modal.Header>
                {ModifyWorker(
                    workerObj.objectId,
                    workerObj.name,
                    workerObj.nick_name,
                    workerObj.id_process,
                    )}
            </Modal>
        </th>
    );
}
*/

/*
let workerModifyDeleteObj = {
    name: 'Pablo',
    nick_name: 'Pabo',
    id_process: 'A',
};
*/

function workerSortingTable({ columns, data }) {
    const session = Cookies.get('sessionToken');
    const admin = Cookies.get('is_admin');
    const [permission, setPermission] = useState([]);

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
    }, [session, admin]);
    if (admin === 'false' || !permission) {
        return ('No tienes permisos');
    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data }, useSortBy);

    const [workerModifyDeleteObj, setWorkerModifyDeleteObj] = useState(false);
    const [show, setShow] = useState(false);
    const handleCloseMod = () => setShow(false);
    const handleShowMod = () => setShow(true);
    const handleShowModWrapper = (workerObj) => {
        setWorkerModifyDeleteObj(workerObj);
        /*
        console.log('Test Hu:' + JSON.stringify(workerObj));
        */
        handleShowMod();
    };

    const [showD, setShowD] = useState(false);
    const handleCloseDMod = () => setShowD(false);
    const handleShowDMod = () => setShowD(true);
    const handleShowDModWrapper = (workerObj) => {
        setWorkerModifyDeleteObj(workerObj);
        /*
        console.log('Test Hu:' + JSON.stringify(workerObj));
        */
        handleShowDMod();
    };

    /*
    We don't want to render all 2000 rows for this example, so cap
    it at 20 for this use case
    */
    const firstPageRows = rows.slice(0, 20);

    function drawSortDirection(isSorted, isSortedDesc) {
        let icon = '';
        if (isSorted) {
            if (isSortedDesc) {
                icon = ' -';
            } else {
                icon = ' +';
            }
        } else {
            icon = '';
        }

        return icon;
    }

    return (
        <>
            <table {...getTableProps()} className="w-100 mt-4" style={{ marginTop: 20 }}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th
                                  {...column.getHeaderProps(column.getSortByToggleProps())}
                                >
                                    {column.render('Header')}
                                    {/* Add a sort direction indicator */}
                                    {drawSortDirection(column.isSorted, column.isSortedDesc)}
                                </th>
                            ))}
                            <th> </th>
                            <th> </th>
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {firstPageRows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <th
                                      {...cell.getCellProps()}
                                      style={{
                                        padding: '10px',
                                        border: 'solid 1px gray',
                                        background: 'papayawhip',
                                    }}
                                    >
                                        {cell.render('Cell')}
                                    </th>
                                ))}
                                <th>
                                    <button type="button" className="btn" onClick={() => handleShowModWrapper(row.original)}>
                                        <ion-icon size="large" name="create-outline" />
                                    </button>
                                </th>
                                <th>
                                    <button type="button" className="btn" onClick={() => handleShowDModWrapper(row.original)}>
                                        <ion-icon size="large" name="trash-outline" />
                                    </button>
                                </th>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <Modal show={show} onHide={handleCloseMod}>
                <Modal.Header closeButton>
                    <Modal.Title>Modificar</Modal.Title>
                </Modal.Header>
                {ModifyWorker(
                    workerModifyDeleteObj.objectId,
                    workerModifyDeleteObj.name,
                    workerModifyDeleteObj.nick_name,
                    workerModifyDeleteObj.id_process,
                    )}
            </Modal>

            <Modal show={showD} onHide={handleCloseDMod}>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar</Modal.Title>
                </Modal.Header>
                {DeleteWorker(
                    workerModifyDeleteObj.objectId,
                    workerModifyDeleteObj.name,
                    workerModifyDeleteObj.nick_name,
                    )}
            </Modal>
        </>
    );
}

/**
   * Worker
   * @description Set of functions to display Trabajador
   * @returns HTML with fetched data
   */
function Worker() {
    const [workers, setWorkers] = useState([]);
    const [show, setShow] = useState(false);

    const handleCloseCreate = () => setShow(false);
    const handleShowCreate = () => setShow(true);

    async function getAllWorkers() {
        const response = await fetch(`${Environment()}/trabajador/get`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.cutomAlert(message);
            return;
        }

        const worker = await response.json();
        setWorkers(worker.data);
    }

    useEffect(() => {
        getAllWorkers();
    }, [workers]);

    /**
   * workersList
   * @description Maps all workers in the interface
   * @returns Component with name and id of the worker
   */
    /*
    function workersList() {
        return workers.slice(0).reverse().map((worker) => (
            <Workers worker={worker} key={worker.name} />
        ));
    }
    */

    /* Code for React Table */

    countHu += 1;

    const testData = React.useMemo(
        () => [
            {
                name: 'Pablo',
                nick_name: 'Pabo',
                id_process: 'A',
            },
            {
                name: 'Jose',
                nick_name: 'JJ',
                id_process: 'B',
            },
        ],
        [],
    );

    const tableColumn = React.useMemo(
        () => [
            {
                Header: 'Nombre de usuario',
                accessor: 'name',
            },
            {
                Header: 'Apodo',
                accessor: 'nick_name',
            },
            {
                Header: 'Proceso',
                accessor: 'id_process',
            },
        ],
        [],
    );

    console.log('Hu Start');
    console.log(testData);
    /*
    console.log(workerSortingTable(
        tableColumn,
        testData,
    ));
    */
    console.log(countHu);
    const tableObj = { columns: tableColumn, data: workers };

    function dummyFunction({ pColumn, pData }) {
        return (<p>nothing</p>);
    }

    return (
        <div className="container-fluid">
            <Sidebar />
            <div>
                <div className="content d-flex px-4 pt-3 h-100">
                    <div className="col-10 mt-4">
                        <div className="card conteo-card">
                            <div className="card-body">
                                <div>
                                    <div className="row justify-content-between">
                                        <h3 className="col-4">
                                            Trabajadores
                                        </h3>
                                        <button type="button" variant="primary" className="col-2 btn-add" onClick={handleShowCreate}>
                                            Agregar
                                        </button>
                                    </div>
                                    <div>
                                        {workerSortingTable(tableObj)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={show} onHide={handleCloseCreate}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear trabajador</Modal.Title>
                </Modal.Header>
                <CreateWorker />
            </Modal>
        </div>
    );
}

export default Worker;
