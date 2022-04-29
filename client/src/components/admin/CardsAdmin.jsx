/* eslint-disable jsx-a11y/anchor-is-valid */
import 'bootstrap/dist/css/bootstrap.css';
import './styles/dashboard.css';

export function CardAdmin() {
    return (
        <div className="admin-card text-center">
            <div className="card-body text-center w-100 py-4">
                <h5>Proceso con mayor merma</h5>
                <a href="#">
                    <h2 className="processName">Rechazado</h2>
                </a>
            </div>
        </div>
    );
}

export function SideCards() {
    return (
        <div className="admin-card text-center p-3">
            <div className="card-body text-center w-100">
                <div className="row">
                    <div className="col">
                        <h5>Proceso con mayor merma</h5>
                        <h2>230</h2>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col">
                        <h5>Proceso con mayor merma</h5>
                        <h2>230</h2>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col">
                        <h5>Proceso con mayor merma</h5>
                        <h2>230</h2>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col">
                        <h5>Proceso con mayor merma</h5>
                        <h2>230</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
