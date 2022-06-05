import 'bootstrap/dist/css/bootstrap.css';
import './styles/dashboard.css';
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

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

        await fetch('http://localhost:8888/usuario/post', {
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
        window.location.reload();
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <Modal.Body>
                    <div className="row">
                        <div>Usuario</div>
                        <input type="text" id="username" name="username" className="col" placeholder="Usuario" value={form.username} onChange={(e) => updateForm({ username: e.target.value })} required />
                    </div>
                    <div className="row">
                        <div>Correo</div>
                        <input type="email" id="email" name="email" className="col" placeholder="ejemplo@mail.com" value={form.email} onChange={(e) => updateForm({ email: e.target.value })} required />
                    </div>
                    <div className="row">
                        <div>Contraseña</div>
                        <input type="password" id="password" name="password" className="col" placeholder="Contraseña" value={form.password} onChange={(e) => updateForm({ password: e.target.value })} required />
                    </div>
                    <div className="row">
                        <div>Elige el rol</div>
                        <select type="text" id="is_admin" name="is_admin" className="col" placeholder="Rol" value={form.is_admin} onChange={(e) => updateForm({ is_admin: e.target.value })} required>
                            <option value="" disabled selected>Selecciona el rol</option>
                            <option value="true">Administrador</option>
                            <option value="false">Trabajador</option>
                        </select>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => window.location.reload()}>
                        Cerrar
                    </Button>
                    <button type="submit" className="col" onClick={() => window.location.reload()}>Crear</button>
                </Modal.Footer>
            </form>
        </div>
    );
}

export default CreateUser;
