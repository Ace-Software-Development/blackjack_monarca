// CU 11 LogOut
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/sidebar.css';
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
                {TabSidebar(null, 'Clientes', 'wallet')}
                {TabSidebar(null, 'Trabajadores', 'person-add')}
                {TabSidebar(null, 'Productos', 'bag-add')}
                {TabSidebar(null, 'Categorías', 'cube')}
                {TabSidebar(null, 'Discos', 'disc')}
                {TabSidebar(null, 'Usuarios', 'people')}
            </ul>
            <div className="sidebar-footer">
                <button type="button" className="btn" onClick={() => logout()}>
                    <div className="nav-link-icon">
                        <ion-icon className="tab-icon" name="log-out-outline" />
                    </div>
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
