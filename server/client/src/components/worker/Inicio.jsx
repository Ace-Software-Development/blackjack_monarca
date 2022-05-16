import Card from './Card';
import 'bootstrap/dist/css/bootstrap.css';

function Inicio() {
    return (
        <div>
            <div className="logo-monarca">
                <img src="./logo.svg" alt="logo monarca" />
            </div>
            <div className="container position-absolute top-50 start-50 translate-middle">
                <div className="row">
                    <div id="Conteo" className="col-4">
                        <a href="/conteo">
                            {Card('calculator', 'Conteo')}
                        </a>
                    </div>
                    <div id="Rechazado" className="col-4">
                        <a href="/empacado">
                            {Card('hammer', 'Rechazado')}
                        </a>
                    </div>
                    <div id="Esmerilado" className="col-4">
                        <a href="/empacado">
                            {Card('brush', 'Esmerilado')}
                        </a>
                    </div>
                </div>
                <div className="row">
                    <div id="Pulido" className="col-4">
                        <a href="/empacado">
                            {Card('water', 'Pulido')}
                        </a>
                    </div>
                    <div id="Remachado" className="col-4">
                        <a href="/empacado">
                            {Card('color-fill', 'Remachado')}
                        </a>
                    </div>
                    <div id="Empaquetado" className="col-4">
                        <a href="/login">
                            {Card('cube', 'Empaquetado')}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Inicio;
