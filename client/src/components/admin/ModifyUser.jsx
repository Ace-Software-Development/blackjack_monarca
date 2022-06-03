import 'bootstrap/dist/css/bootstrap.css';
import './styles/dashboard.css';
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

/**
   * ModifyUser
   * @description Set of functions to display modal of Modify User
   * @returns HTML with fetched data
   */
function ModifyUser(userId, userName, userRol) {
    const [form, setForm] = useState({
        objectId: userId,
        username: userName,
        is_admin: userRol,
    });

    /**
   * updateForm
   * @description updates data of a form
   * @param value: new values of the form
   * @returns an updated form
   */
    function updateForm(value) {
        return setForm((prev) => ({ ...prev, ...value }));
    }

    /**
   * onSubmit
   * @description Posts incoming disk through a fetch to the server
   * @param e: Context
   */
    async function onSubmit(e) {
        e.preventDefault();

        const newUser = { ...form };

        await fetch('http://localhost:8888/usuario/modify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        });

        setForm({
            objectId: '',
            username: '',
            is_admin: '',
        });
        window.location.reload();
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <Modal.Body>
                    <div className="row">
                        <div>Nombre de usuario</div>
                        <input type="text" id="username" name="username" className="col" placeholder="Usuario" value={form.username} onChange={(e) => updateForm({ username: e.target.value })} required />
                    </div>
                    <div className="row">
                        <div>Elige el rol</div>
                        <select type="text" id="is_admin" name="is_admin" className="col" placeholder="Rol" value={form.is_admin} onChange={(e) => updateForm({ is_admin: e.target.value })} required>
                            <option value="" disabled>Selecciona el rol</option>
                            <option value="true">Administrador</option>
                            <option value="false">Trabajador</option>
                        </select>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => window.location.reload()}>
                        Cerrar
                    </Button>
                    <button type="submit" className="col">Realizar modificación</button>
                </Modal.Footer>
            </form>
        </div>
    );
}

export default ModifyUser;
