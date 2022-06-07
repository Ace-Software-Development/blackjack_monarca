// CU 1 Ingresar a proceso
// CU 11 LogOut
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Card from './Card';
import 'bootstrap/dist/css/bootstrap.css';
import Environment from '../Environment';

/**
 * logout
 * @descriptions destroy session and redirects to the login
 */
function logout() {
    Cookies.remove('sessionToken');
    Cookies.remove('is_admin');
    Cookies.remove('session.sig');
    Cookies.remove('session');
    localStorage.clear();
    window.location.href = '/';
}

function Inicio() {
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
        <Container className="h-100 d-flex flex-column">
            <Row className="mt-2">
                <Col xs={7} className="d-flex">
                    <img className="align-self-center" src="./logo.svg" alt="logo monarca" />
                </Col>
                <Col xs={5} className="text-end">
                    <button className="text-align-right btn text-right align-items-end" type="button" onClick={() => logout()}>
                        <div className="d-flex">
                            <ion-icon Classname="mr-auto p-2" name="exit-outline" size="large" />
                            <h5 className="ml-auto p-2 mb-0">Cerrar sesión</h5>
                        </div>
                    </button>
                </Col>
            </Row>
            <Row className="text-center justify-content-center flex-grow-1">
                <Col xs={12} s={12} md={6} lg={4} className="text-center justify-content-center">
                    <a href="/conteo/Contar">
                        {Card('calculator', 'Conteo')}
                    </a>
                </Col>
                <Col xs={12} s={12} md={6} lg={4}>
                    <a href="/proceso/Conteo/Rechazado/Esmerilado">
                        {Card('hammer', 'Rechazado')}
                    </a>
                </Col>
                <Col xs={12} s={12} md={6} lg={4}>
                    <a href="/proceso/Rechazado/Esmerilado/Pulido">
                        {Card('brush', 'Esmerilado')}
                    </a>
                </Col>
                <Col xs={12} s={12} md={6} lg={4}>
                    <a href="/proceso/Esmerilado/Pulido/Remachado">
                        {Card('water', 'Pulido')}
                    </a>
                </Col>
                <Col xs={12} s={12} md={6} lg={4}>
                    <a href="/proceso/Pulido/Remachado/Empaquetado">
                        {Card('color-fill', 'Remachado')}
                    </a>
                </Col>
                <Col xs={12} s={12} md={6} lg={4}>
                    <a href="/empacado">
                        {Card('cube', 'Empaquetado')}
                    </a>
                </Col>
            </Row>
        </Container>
    );
}

export default Inicio;
