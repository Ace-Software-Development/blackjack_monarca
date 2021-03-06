// CU 11 LogOut
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/sidebar.css';
import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import TabSidebar from './Tab';

function logout() {
    Cookies.remove('sessionToken');
    Cookies.remove('is_admin');
    Cookies.remove('session.sig');
    Cookies.remove('session');
    localStorage.clear();
    window.location.href = '/';
}

function Sidebar() {
    const [open, setOpen] = useState(false);

    return (
        <div className="sidebar d-flex flex-column flex-shrink-0 p-4">
            <img src="../../logo.svg" alt="Aluminios Monarca logo" />
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                {TabSidebar(null, 'Dashboard', 'apps')}
                {TabSidebar(null, 'Trabajador', 'hammer')}
                {TabSidebar(null, 'Procesos', 'settings')}
                {TabSidebar(null, 'Pedidos', 'file-tray-full')}
                {TabSidebar(null, 'Inventario Discos', 'server')}
                <li className="nav-item sidebar-tab p-1">
                    <button type="button" className="btn btn-sidebar" onClick={() => setOpen(!open)} aria-expanded={open}>
                        Registros
                    </button>
                </li>
                <Collapse className="btn" in={open}>
                    <div id="example-collapse-text">
                        {TabSidebar(null, 'Clientes', 'wallet')}
                        {TabSidebar(null, 'Trabajadores', 'person-add')}
                        {TabSidebar(null, 'Productos', 'bag-add')}
                        {TabSidebar(null, 'Categorias', 'cube')}
                        {TabSidebar(null, 'Discos', 'disc')}
                        {TabSidebar(null, 'Usuarios', 'people')}
                    </div>
                </Collapse>
            </ul>
            <div className="sidebar-footer">
                <button type="button" className="btn" onClick={() => logout()}>
                    <div className="nav-link-icon">
                        <ion-icon className="tab-icon" name="log-out-outline" />
                    </div>
                    Cerrar sesi??n
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
