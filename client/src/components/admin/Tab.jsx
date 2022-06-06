/* eslint-disable jsx-a11y/anchor-is-valid */
import 'bootstrap/dist/css/bootstrap.css';
import './styles/sidebar.css';

function TabSidebar(activeProperty, tabName, tabIcon) {
    if (tabName === 'Dashboard') {
        return (
            <li className="nav-item sidebar-tab mt-2">
                <a className={`${activeProperty} nav-link`} href="/dash">
                    <div className="nav-link-icon">
                        <ion-icon className="tab-icon" name={`${tabIcon}-outline`} />
                    </div>
                    {tabName}
                </a>
            </li>
        );
    }
    return (
        <li className="nav-item sidebar-tab mt-2">
            <a className={`${activeProperty} nav-link`} href={`/dash/${tabName}`}>
                <div className="nav-link-icon">
                    <ion-icon className="tab-icon" name={`${tabIcon}-outline`} />
                </div>
                {tabName}
            </a>
        </li>
    );
}

export default TabSidebar;
