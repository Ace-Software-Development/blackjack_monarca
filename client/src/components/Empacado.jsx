import orderCard from './orderCard';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap';

function Empacado() {
    return (
        <container>
            <div>
                <h2 align="center">Empacado</h2>
            </div>
            <div>
                {orderCard('75', 'Pedido1', 'Puebla')}
            </div>
        </container>
    );
}

export default Empacado;
