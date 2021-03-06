import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import Card from './Card';
import 'bootstrap/dist/css/bootstrap.css';
import Environment from './Environment';

function Rechazado() {
    const session = Cookies.get('sessionToken');
    const [permission, setPermission] = useState([]);
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

    return (
        <container>
            <div>
                <ion-icon name="home" />
                <h2 align="center">Rechazado</h2>
            </div>
            <div className="container position-absolute top-50 start-50 translate-middle">
                <div className="row">
                    <div className="col-4">{Card('checkbox', 'Por confirmar')}</div>
                    <div className="col-4">{Card('time', 'Pendientes')}</div>
                </div>
            </div>
        </container>
    );
}

export default Rechazado;
