// CU 54
// MT https://docs.google.com/spreadsheets/d/1geuVnd1ByaFLBXFXNAlN5PL-K0QVR2rq/edit?usp=sharing&ouid=103960253138118107632&rtpof=true&sd=true

import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import Environment from '../Environment';
import Sidebar from './Sidebar';

function Mains({ m }) {
    return (
        <tr>
            <th>
                <h5>{m.name}</h5>
                <h6 className="sub-text1">Nombre</h6>
            </th>
            <th>
                <h5>{m.y}</h5>
                <h6 className="sub-text1">Cantidad</h6>
            </th>
        </tr>
    );
}
Mains.propTypes = {
    m: PropTypes.string.isRequired,
};

function InvDiscos() {
    const session = Cookies.get('sessionToken');
    const admin = Cookies.get('is_admin');
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
    }, [session, admin]);
    if (admin === 'false' || !permission) {
        return ('No tienes permisos');
    }

    const [disks, setDisks] = useState([]);
    /**
     * getAllDisks
     * @description Get all history of disks
     * */
    async function getAllDisks() {
        const response = await fetch('http://localhost:8888/procesos/allDisks/get');
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.customAlert(message);
            return;
        }

        const diskList = await response.json();
        setDisks(diskList.data);
    }

    useEffect(() => {
        getAllDisks();
    }, []);

    const [listaDisks, setListaDisks] = useState([]);

    useEffect(() => {
        setListaDisks(_.groupBy(disks, (item) => item.name));
    }, [disks]);

    const main = [];
    const [main2, setMain2] = useState([]);

    /**
     * iterateListaDiscos
     * @description Set the data table
     * */
    function iterateListaDiscos() {
        Object.keys(listaDisks).forEach((key1) => {
            let cantidadDiscos = 0;
            for (let i = 0; i < listaDisks[key1].length; i += 1) {
                cantidadDiscos += listaDisks[key1][i].number;
            }
            main.push({
                name: key1,
                y: cantidadDiscos,
            });
        });
        setMain2(main);
    }

    useEffect(() => {
        iterateListaDiscos();
    }, [listaDisks]);

    /**
   * diskList
   * @description Maps all disks in the interface
   * @returns Component with name and number
   */
    function diskList2() {
        return main2.slice(0).reverse().map((m) => (
            <Mains m={m} key={m.objectId} />
        ));
    }

    return (
        <div className="container-fluid">
            <Sidebar />
            <div>
                <div className="content d-flex px-4 pt-3 h-100">
                    <div className="col-10 mt-4">
                        <div className="card conteo-card">
                            <div className="card-body">
                                <div>
                                    <div className="row justify-content-between">
                                        <h3 className="col-9">
                                            Inventario de Discos
                                        </h3>
                                    </div>
                                    <table className="w-100 mt-4" style={{ marginTop: 20 }}>
                                        <thead>
                                            <tr>
                                                <th>Disco</th>
                                                <th>Cantidad</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {diskList2()}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InvDiscos;
