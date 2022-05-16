import Card from './Card';
import 'bootstrap/dist/css/bootstrap.css';

function Rechazado() {
    return (
        <container>
            <div>
                <ion-icon name="home" />
                <h2 align="center">Rechazado</h2>
            </div>
            <div className="container position-absolute top-50 start-50 translate-middle">
                <div className="row">
                    <div className="col-4">{Card('checkbox', 'Por confirmar')}</div>
                    <div className="col-4">{Card('time', 'Pendientes')}</div>
                </div>
            </div>
        </container>
    );
}

export default Rechazado;
