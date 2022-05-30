import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import orderCard from './orderCard';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap';

function Empacado() {
    const session = Cookies.get('sessionToken');
    const [permission, setPermission] = useState([]);
    /**
     * getPermission
     * @description Verifies that the user session token is valid
     */
    async function getPermission() {
        const response = await fetch(`http://localhost:8888/login/getPermission/${session}`);
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
                <h2 align="center">Empacado</h2>
            </div>
            <div>
                {orderCard('75', 'Puebla')}
            </div>
        </container>
    );
}

export default Empacado;
