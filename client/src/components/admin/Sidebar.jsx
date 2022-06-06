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
                {TabSidebar('active', 'Dashboard', 'apps')}
                {TabSidebar(null, 'Trabajador', 'apps')}
                {TabSidebar(null, 'Procesos', 'apps')}
                {TabSidebar(null, 'Pedidos', 'apps')}
                {TabSidebar(null, 'Clientes', 'apps')}
                {TabSidebar(null, 'Trabajadores', 'apps')}
                {TabSidebar(null, 'Productos', 'apps')}
                {TabSidebar(null, 'Categorías', 'apps')}
                {TabSidebar(null, 'Discos', 'apps')}
                {TabSidebar(null, 'Usuarios', 'apps')}
            </ul>
            <div className="sidebar-footer">
                <a className="nav-link" href="https://getbootstrap.com/docs/5.1/examples/sidebars/#">
                    <div className="nav-link-icon">
                        <ion-icon className="tab-icon" name="book-outline" />
                    </div>
                    Manual
                </a>
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
