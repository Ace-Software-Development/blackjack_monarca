import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Card from './Card';
import Header from './worker/Header';
import 'bootstrap/dist/css/bootstrap.css';
import Environment from './Environment';

function Empacado() {
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
                <Header processName="Empacado" />
            </div>
            <div className="container position-absolute top-50 start-50 translate-middle">
                <div className="row">
                    <div id="Conteo" className="col">
                        <a href="/empacado/pedidos">
                            {Card('notifications', 'Pedidos')}
                        </a>
                    </div>
                    <div id="Conteo" className="col">
                        <a href="/empacado/confirmar">
                            {Card('checkbox', 'Confirmar')}
                        </a>
                    </div>
                    <div id="Conteo" className="col">
                        <a href="/empacado/inventario">
                            {Card('bar-chart', 'Inventario')}
                        </a>
                    </div>
                </div>
            </div>
        </container>
    );
}

export default Empacado;
