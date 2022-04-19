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
          <div className="col-4">
            {Card('calculator', 'Conteo')}
          </div>
          <div className="col-4">
            {Card('hammer', 'Rechazado')}
          </div>
          <div className="col-4">
            {Card('brush', 'Esmerilado')}
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            {Card('water', 'Pulido')}
          </div>
          <div className="col-4">
            {Card('color-fill', 'Remachado')}
          </div>
          <div className="col-4">
            {Card('cube', 'Empaquetado')}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inicio;
