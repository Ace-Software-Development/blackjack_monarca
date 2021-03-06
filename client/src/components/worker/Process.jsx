// CU 1
// MT https://docs.google.com/spreadsheets/d/1geuVnd1ByaFLBXFXNAlN5PL-K0QVR2rq/edit?usp=sharing&ouid=103960253138118107632&rtpof=true&sd=true

import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Cookies from 'js-cookie';
import Card from './Card';
import Card2 from './Card2';
import Header from './Header';
import Environment from '../Environment';

/**
   * Process
   * @description Displays cards which redirect to check in and checkout features
   */
function Process() {
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
    const { process } = useParams();
    const { nextProcess } = useParams();
    const { prevProcess } = useParams();
    const hrefEntrega = `/parte/${process}/${nextProcess}`;
    const hrefConfirm = `/confirmar/${process}/${prevProcess}`;
    const hrefIncident = '/rechazado/incidente';
    const hrefTake = '/rechazado/conteo/Tomar';
    if (process === 'Rechazado') {
        return (
            <Container className="h-100 d-flex flex-column">
                <Header processName={process} />
                <Container className="flex-grow-1 d-flex flex-column">
                    <Row className="flex-grow-1">
                        <Col md={6}>
                            <a href={hrefTake}>
                                {Card('disc', 'Tomar discos')}
                            </a>
                        </Col>
                        <Col md={6}>
                            <a href={hrefEntrega}>
                                {Card('send', 'Entregar')}
                            </a>
                        </Col>
                        <Col>
                            <a href={hrefIncident}>
                                {Card('trash-bin', 'Incidentes')}
                            </a>
                        </Col>
                    </Row>
                </Container>
            </Container>
        );
    }
    return (
        <Container className="h-100 d-flex flex-column">
            <Header processName={process} />
            <Container className="flex-grow-1 d-flex flex-column">
                <Row className="mt-5 mb-5 flex-grow-1">
                    <Col md={6}>
                        <a href={hrefConfirm}>
                            {Card2('mail-unread', 'Recibir')}
                        </a>
                    </Col>
                    <Col md={6}>
                        <a href={hrefEntrega}>
                            {Card2('send', 'Entregar')}
                        </a>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default Process;
