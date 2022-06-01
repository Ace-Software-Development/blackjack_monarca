// CU 11 LogOut
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/dashboard.css';
import Sidebar from './Sidebar';
import OrdersAmin from './OrdersAdmin';
// import { CardAdmin, SideCards } from './CardsAdmin';

let process = '';
function Dashboard() {
    const session = Cookies.get('sessionToken');
    const admin = Cookies.get('is_admin');
    const params = useParams();
    process = params.process;
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

    /**
    * @description Verifies if is the admin dashboard page
    */
    if (process === 'Administrador') {
        return (
            <div className="container-fluid">
                <Sidebar />
                <div className="content d-flex px-4 pt-3 h-100">
                    <div className="row">
                        <div className="col">
                            <h1 className="my-2">Dashboard</h1>
                            <h3 className="my-2">{process}</h3>
                        </div>
                    </div>
                    <div className="row">
                        <OrdersAmin />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid">
            <Sidebar />
            <div className="content d-flex px-4 pt-3 h-100">
                <div className="row">
                    <div className="col">
                        <h1 className="my-2">Dashboard</h1>
                        <h3 className="my-2">{process}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
