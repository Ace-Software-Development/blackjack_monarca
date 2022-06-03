import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Card from './Card';
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
    if (process === 'Rechazado') {
        return (
            <div>
                <Header processName={process} />
                <div className="d-flex flex-column align-items-center">
                    <div className="row mt-5 pt-5">
                        <div className="col">
                            <a href={hrefIncident}>
                                {Card('trash-bin', 'Incidentes')}
                            </a>
                        </div>
                        <div className="col">
                            <a href={hrefEntrega}>
                                {Card('send', 'Entregar')}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div>
            <Header processName={process} />
            <div className="d-flex flex-column align-items-center">
                <div className="row mt-5 pt-5">
                    <div className="col">
                        <a href={hrefConfirm}>
                            {Card('mail-unread', 'Recibir')}
                        </a>
                    </div>
                    <div className="col">
                        <a href={hrefEntrega}>
                            {Card('send', 'Entregar')}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Process;
