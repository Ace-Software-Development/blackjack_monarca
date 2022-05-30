import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Card from './Card';
import 'bootstrap/dist/css/bootstrap.css';

function Inicio() {
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
        <div>
            <div className="logo-monarca">
                <img src="./logo.svg" alt="logo monarca" />
            </div>
            <div className="container position-absolute top-50 start-50 translate-middle">
                <div className="row">
                    <div id="Conteo" className="col">
                        <a href="/conteo">
                            {Card('calculator', 'Conteo')}
                        </a>
                    </div>
                    <div id="Rechazado" className="col">
                        <a href="/proceso/Conteo/Rechazado/Esmerilado">
                            {Card('hammer', 'Rechazado')}
                        </a>
                    </div>
                    <div id="Esmerilado" className="col">
                        <a href="/proceso/Rechazado/Esmerilado/Pulido">
                            {Card('brush', 'Esmerilado')}
                        </a>
                    </div>
                </div>
                <div className="row">
                    <div id="Pulido" className="col">
                        <a href="/proceso/Esmerilado/Pulido/Remachado">
                            {Card('water', 'Pulido')}
                        </a>
                    </div>
                    <div id="Remachado" className="col">
                        <a href="/proceso/Pulido/Remachado/Empaquetado">
                            {Card('color-fill', 'Remachado')}
                        </a>
                    </div>
                    <div id="Empaquetado" className="col">
                        <a href="/empacado">
                            {Card('cube', 'Empaquetado')}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Inicio;
