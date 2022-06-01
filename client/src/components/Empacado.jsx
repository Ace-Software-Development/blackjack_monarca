import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Card from './Card';
import Header from './worker/Header';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './worker/Header';

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
                <Header processName="Empacado" />
            </div>
            <div className="container position-absolute top-50 start-50 translate-middle">
                <div className="row">
                    <div id="Conteo" className="col">
                        <a href="/empacado/pedidos">
                            {Card('calculator', 'Pedidos')}
                        </a>
                    </div>
                    <div id="Conteo" className="col">
                        <a href="/empacado/confirmar">
                            {Card('calculator', 'Confirmar')}
                        </a>
                    </div>
                    <div id="Conteo" className="col">
                        <a href="/empacado/inventario">
                            {Card('calculator', 'Inventario')}
                        </a>
                    </div>
                </div>
            </div>
        </container>
    );
}

export default Empacado;
