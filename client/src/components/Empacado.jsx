import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Row, Col, Container } from 'react-bootstrap';
import Card from './Card';
import Header from './worker/Header';
import 'bootstrap/dist/css/bootstrap.css';

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
        <Container className="h-100 d-flex flex-column">
            <Header processName="Empacado" />
            <Container className="flex-grow-1 d-flex flex-column">
                <Row className="flex-grow-1">
                    <Col md={6}>
                        <a href="/empacado/pedidos">
                            {Card('notifications', 'Pedidos')}
                        </a>
                    </Col>
                    <Col md={6}>
                        <a href="/empacado/confirmar">
                            {Card('checkbox', 'Confirmar')}
                        </a>
                    </Col>
                    <Col>
                        <a href="/empacado/inventario">
                            {Card('bar-chart', 'Inventario')}
                        </a>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default Empacado;
