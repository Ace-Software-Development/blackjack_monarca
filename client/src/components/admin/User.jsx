import 'bootstrap/dist/css/bootstrap.css';
import './styles/dashboard.css';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import CreateUser from './CreateUser';
import ModifyUser from './ModifyUser';
import Sidebar from './Sidebar';

//  import DeleteUser from './DeleteUser';

function isAdmin(role) {
    if (role) {
        return (
            <div>Admin</div>
        );
    }
    return (
        <div>Trabajador</div>
    );
}

function getRole(role) {
    if (role) {
        return (
            'true'
        );
    }
    return (
        'false'
    );
}

/**
 * IncomeDisk
 * @param {disk} show all Income Disk data
 * @description Shows the income disk information on the page
 * @returns HTML with fetched data
 */
function Users({ user }) {
    // const href = `/usuario/modificar/${user.objectId}`;
    const [show, setShow] = useState(false);
    const handleCloseMod = () => setShow(false);
    const handleShowMod = () => setShow(true);

    // const [showD, setShowD] = useState(false);
    // const handleCloseDMod = () => setShowD(false);
    // const handleShowDMod = () => setShowD(true);

    return (
        <>
            <tr>
                <th>
                    <div>{user.username}</div>
                    <div className="sub-text2">Nombre de usuario</div>
                </th>
                <th>
                    {isAdmin(user.is_admin)}
                    <div className="sub-text1">Rol</div>
                </th>
                <th>
                    <button type="button" onClick={handleShowMod}>
                        <ion-icon size="large" name="create-outline" />
                    </button>
                </th>
                {/* <th>
                    <button type="button" onClick={handleShowDMod}>
                        <ion-icon size="large" name="trash-outline" />
                    </button>
                </th> */}
            </tr>

            <Modal show={show} onHide={handleCloseMod}>
                <Modal.Header closeButton>
                    <Modal.Title>Modificar</Modal.Title>
                </Modal.Header>
                {ModifyUser(user.objectId, user.username, getRole(user.is_admin))}
            </Modal>

            {/* <Modal show={showD} onHide={handleCloseDMod}>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar</Modal.Title>
                </Modal.Header>
                {DeleteUser(user.objectId, user.username)}
            </Modal> */}
        </>

    );
}
Users.propTypes = {
    user: PropTypes.string.isRequired,
};

/**
   * Conteo
   * @description Set of functions to display Conteo
   * @returns HTML with fetched data
   */
function User() {
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);

    const handleCloseCreate = () => setShow(false);
    const handleShowCreate = () => setShow(true);

    async function getAllUsers() {
        const response = await fetch('http://localhost:8888/usuario/get');
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.cutomAlert(message);
            return;
        }

        const user = await response.json();
        setUsers(user.data);
    }

    useEffect(() => {
        getAllUsers();
    }, []);

    /**
   * disksList
   * @description Maps all disks in the interface
   * @returns Component with name and id of the disk
   */
    function usersList() {
        return users.slice(0).reverse().map((user) => (
            <Users user={user} key={user.username} />
        ));
    }

    return (
        <div className="container-fluid">
            <Sidebar />
            <div className="content d-flex px-4 pt-3 h-100">
                <div className="row d-flex justify-content-center">
                    <div className="col-10 mt-4">
                        <div className="card conteo-card">
                            <div className="card-body">
                                <div>
                                    <div className="row justify-content-between">
                                        <div className="col-2">
                                            Usuarios
                                        </div>
                                        <button type="button" variant="primary" className="col-2 btn-add" onClick={handleShowCreate}>
                                            Agregar usuario
                                        </button>
                                    </div>
                                    <table className="table table-striped" style={{ marginTop: 20 }}>
                                        <thead>
                                            <tr>
                                                <th>Usuario</th>
                                                <th>Rol</th>
                                                <th> </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {usersList()}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={show} onHide={handleCloseCreate}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear usuario</Modal.Title>
                </Modal.Header>
                <CreateUser />
            </Modal>
        </div>
    );
}

export default User;
