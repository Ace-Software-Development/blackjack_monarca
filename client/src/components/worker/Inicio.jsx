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
                    <div id="Conteo" className="col">
                        <a href="/proceso/Conteo/Rechazado">
                            {Card('calculator', 'Conteo')}
                        </a>
                    </div>
                    <div id="Rechazado" className="col">
                        <a href="/proceso/Rechazado/Esmerilado">
                            {Card('hammer', 'Rechazado')}
                        </a>
                    </div>
                    <div id="Esmerilado" className="col">
                        <a href="/proceso/Esmerilado/Pulido">
                            {Card('brush', 'Esmerilado')}
                        </a>
                    </div>
                </div>
                <div className="row">
                    <div id="Pulido" className="col">
                        <a href="/proceso/Pulido/Remachado">
                            {Card('water', 'Pulido')}
                        </a>
                    </div>
                    <div id="Remachado" className="col">
                        <a href="/proceso/Remachado/Empaquetado">
                            {Card('color-fill', 'Remachado')}
                        </a>
                    </div>
                    <div id="Empaquetado" className="col">
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
