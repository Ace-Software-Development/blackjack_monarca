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
                        <a href="/proceso/Conteo">
                            {Card('calculator', 'Conteo')}
                        </a>
                    </div>
                    <div id="Rechazado" className="col-4">
                        <a href="/proceso/Rechazado">
                            {Card('hammer', 'Rechazado')}
                        </a>
                    </div>
                    <div id="Esmerilado" className="col-4">
                        <a href="/proceso/Esmerilado">
                            {Card('brush', 'Esmerilado')}
                        </a>
                    </div>
                </div>
                <div className="row">
                    <div id="Pulido" className="col-4">
                        <a href="/proceso/Pulido">
                            {Card('water', 'Pulido')}
                        </a>
                    </div>
                    <div id="Remachado" className="col-4">
                        <a href="/proceso/Remachado">
                            {Card('color-fill', 'Remachado')}
                        </a>
                    </div>
                    <div id="Empaquetado" className="col-4">
                        <a href="/empacado">
                            {Card('cube', 'Empaquetado')}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Inicio;
