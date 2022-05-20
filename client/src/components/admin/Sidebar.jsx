import 'bootstrap/dist/css/bootstrap.css';
import './styles/sidebar.css';
import TabSidebar from './Tab';

function Sidebar() {
    return (
        <div className="sidebar d-flex flex-column flex-shrink-0 p-4">
            <img src="logo.svg" alt="Aluminios Monarca logo" />
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                {TabSidebar(null, 'Dashboard', 'apps')}
                {TabSidebar(null, 'Conteo', 'apps')}
                {TabSidebar(null, 'Rechazado', 'apps')}
                {TabSidebar(null, 'Esmerilado', 'apps')}
                {TabSidebar(null, 'Pulido', 'apps')}
                {TabSidebar(null, 'Remachado', 'apps')}
                {TabSidebar(null, 'Empaquetado', 'apps')}
                {TabSidebar(null, 'Administrador', 'apps')}
            </ul>
            <div className="sidebar-footer">
                <a
                  className="nav-link"
                  href="https://getbootstrap.com/docs/5.1/examples/sidebars/#"
                >
                    <div className="nav-link-icon">
                        <ion-icon className="tab-icon" name="book-outline" />
                    </div>
                    Manual
                </a>
                <a
                  className="nav-link"
                  href="https://getbootstrap.com/docs/5.1/examples/sidebars/#"
                >
                    <div className="nav-link-icon">
                        <ion-icon className="tab-icon" name="log-out-outline" />
                    </div>
                    Cerrar sesión
                </a>
            </div>
        </div>
    );
}

export default Sidebar;
