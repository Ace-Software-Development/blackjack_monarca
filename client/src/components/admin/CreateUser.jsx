import 'bootstrap/dist/css/bootstrap.css';
import './styles/dashboard.css';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Environment from '../Environment';

/**
   * CreateUser
   * @description Set of functions to display modal of Create User
   * @returns HTML with fetched data
   */
function CreateUser() {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        is_admin: '',
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

    async function onSubmit(e) {
        e.preventDefault();

        console.log(form);

        const newUser = { ...form };

        await fetch(`${Environment()}/usuario/post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        });

        setForm({
            username: '',
            email: '',
            password: '',
            is_admin: '',
        });
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <Modal.Body>
                    <div className="row">
                        <h5>Usuario</h5>
                        <input type="text" id="username" name="username" className="h-75 w-100 ml-4 mb-3" placeholder="ej. Leonardo Alvarado" value={form.username} onChange={(e) => updateForm({ username: e.target.value })} required />
                    </div>
                    <div className="row">
                        <h5>Correo</h5>
                        <input type="email" id="email" name="email" className="h-75 w-100 ml-4 mb-3" placeholder="ejemplo@mail.com" value={form.email} onChange={(e) => updateForm({ email: e.target.value })} required />
                    </div>
                    <div className="row">
                        <h5>Contraseña</h5>
                        <input type="password" id="password" name="password" className="h-75 w-100 ml-4 mb-3" placeholder="Contraseña" value={form.password} onChange={(e) => updateForm({ password: e.target.value })} required />
                    </div>
                    <div className="row">
                        <h5>Elige el rol</h5>
                        <select type="text" id="is_admin" name="is_admin" className="col" placeholder="Rol" value={form.is_admin} onChange={(e) => updateForm({ is_admin: e.target.value })} required>
                            <option value="" disabled selected>Selecciona el rol</option>
                            <option value="true">Administrador</option>
                            <option value="false">Trabajador</option>
                        </select>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="submit" className="btn-add" onClick={() => window.location.reload()}>Crear</button>
                </Modal.Footer>
            </form>
        </div>
    );
}

export default CreateUser;
