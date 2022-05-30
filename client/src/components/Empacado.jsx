import Card from './Card';
import 'bootstrap/dist/css/bootstrap.css';

function Empacado() {
    return (
        <container>
            <div>
                <ion-icon name="home" />
                <h2 align="center">Rechazado</h2>
            </div>
            <div className="container position-absolute top-50 start-50 translate-middle">
                <div className="row">
                    <div id="Conteo" className="col">
                        <a href="/empacado/pedidos">
                            {Card('calculator', 'Pedidos')}
                        </a>
                    </div>
                    <div id="Conteo" className="col">
                        <a href="/empacado/confirmar">
                            {Card('calculator', 'Confirmar')}
                        </a>
                    </div>
                    <div id="Conteo" className="col">
                        <a href="/empacado/inventario">
                            {Card('calculator', 'Inventario')}
                        </a>
                    </div>
                </div>
            </div>
        </container>
    );
}

export default Empacado;
