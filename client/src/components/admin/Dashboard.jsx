import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/dashboard.css';
import Sidebar from './Sidebar';
import { CardAdmin, SideCards } from './CardsAdmin';

function Dashboard() {
    const session = Cookies.get('sessionToken');
    const admin = Cookies.get('is_admin');
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
    }, [session, admin]);
    if (admin === 'false' || !permission) {
        return ('No tienes permisos');
    }
    return (
        <div className="container-fluid">
            <Sidebar />
            <div className="content d-flex px-4 pt-3 h-100">
                <div className="row">
                    <div className="col">
                        <h1 className="my-2">Dashboard</h1>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-4">
                        <CardAdmin />
                    </div>
                    <div className="col-4">
                        <CardAdmin />
                    </div>
                    <div className="col-4">
                        <CardAdmin />
                    </div>
                </div>
                <div className="row my-4">
                    <div className="col-8">
                        <div className="row">
                            <div className="col">
                                <div className="admin-card text-center">
                                    <div className="card-body text-center w-100 py-4">
                                        <h5>Grafica</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row my-4">
                            <div className="col">
                                <div className="admin-card text-center">
                                    <div className="card-body text-center w-100 py-4">
                                        <h5>Tabla</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <SideCards />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
