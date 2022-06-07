/* eslint-disable jsx-a11y/anchor-is-valid */
import 'bootstrap/dist/css/bootstrap.css';
import './styles/sidebar.css';

function TabSidebar(activeProperty, tabName, tabIcon) {
    if (tabName === 'Dashboard') {
        return (
            <li className="nav-item sidebar-tab p-1">
                <a className="nav-link sidebar-link" href="/dashboard">
                    <div className="nav-link-icon">
                        <ion-icon className="tab-icon" name={`${tabIcon}-outline`} />
                    </div>
                    {tabName}
                </a>
            </li>
        );
    }
    if (tabName === 'Categorías') {
        return (
            <li className="nav-item sidebar-tab p-1">
                <a className="nav-link" href="/dashboard/Categorias">
                    <div className="nav-link-icon">
                        <ion-icon className="tab-icon" name={`${tabIcon}-outline`} />
                    </div>
                    {tabName}
                </a>
            </li>
        );
    }
    if (tabName === 'Inventario Discos') {
        return (
            <li className="nav-item sidebar-tab p-1">
                <a className="nav-link" href="/dashboard/Inventario/Discos">
                    <div className="nav-link-icon">
                        <ion-icon className="tab-icon" name={`${tabIcon}-outline`} />
                    </div>
                    {tabName}
                </a>
            </li>
        );
    }
    return (
        <li className="nav-item sidebar-tab p-1">
            <a href={`/dashboard/${tabName}`} className="nav-link">
                <div className="nav-link-icon">
                    <ion-icon className="tab-icon" name={`${tabIcon}-outline`} />
                </div>
                {tabName}
            </a>
        </li>
    );
}

export default TabSidebar;
